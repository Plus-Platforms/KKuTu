/**
 * Rule the words! KKuTu Online
 * Copyright (C) 2017 JJoriping(op@jjo.kr)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * 볕뉘 수정사항:
 * Login 을 Passport 로 수행하기 위한 수정
 */

var WS		 = require("ws");
var Express	 = require("express");
var Exession = require("express-session");
var Redission= require("connect-redis")(Exession);
var Redis	 = require("redis");

var DDDoS	 = require("dddos");
var Server	 = Express();
var DB		 = require("./db");
//볕뉘 수정 구문삭제 (28)
var PLLog	 = require("../sub/jjlog");
var WebInit	 = require("../sub/webinit");
var GLOBAL	 = require("../sub/global.json");
var Secure = require('../sub/secure');
//볕뉘 수정
var passport = require('passport');
//볕뉘 수정 끝
var Const	 = require("../const");
var https	 = require('https');
var fs		 = require('fs');

var Language = {
	'ko_KR': require("./lang/ko_KR.json"),
	'en_US': require("./lang/en_US.json")
};
//볕뉘 수정
var ROUTES = [
	"major", "consume", "admin", "login"
];
//볕뉘 수정 끝
var page = WebInit.page;
var gameServers = [];

WebInit.MOBILE_AVAILABLE = [
	"portal", "main", "kkutu"
];

require("../sub/checkpub");

PLLog.info("<< KKuTu Web >>");
Server.set("trust proxy", true);
Server.set('views', __dirname + "/views");
Server.set('view engine', "pug");
Server.use(Express.json({ limit: "8mb" }));
Server.use(Express.static(__dirname + "/public"));
Server.use(Express.urlencoded({ extended: true, limit: "8mb" }));
Server.use(Exession({
	store: new Redission({
		client: Redis.createClient(DB.REDIS),
		ttl: 3600 * 24 * 7
	}),
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 3600 * 24 * 1000 * 7 },
	rolling: true
}));
//볕뉘 수정
Server.use(passport.initialize());
Server.use(passport.session());
Server.use((req, res, next) => {
	if(req.session.passport) {
		delete req.session.passport;
	}
	
	res.set("X-Powered-By", "Morem.ME");
	next();
});
Server.use((req, res, next) => {
	if(Const.IS_SECURED) {
		if(req.protocol == 'http') {
			let url = 'https://'+req.get('host')+req.path;
			res.status(302).redirect(url);
		} else {
			next();
		}
	} else {
		next();
	}
});
//볕뉘 수정 끝
/* use this if you want;*/

DDDoS = new DDDoS({
	maxWeight: 6,
	checkInterval: 10000,
	rules: [{
		regexp: "^/(cf|dict|gwalli)",
		maxWeight: 20,
		errorData: "429 Too Many Requests"
	}, {
		regexp: ".*",
		errorData: "429 Too Many Requests"
	}]
});
DDDoS.rules[0].logFunction = DDDoS.rules[1].logFunction = function(ip, path){
	PLLog.warn(`DoS from IP ${ip} on ${path}`);
};
Server.use(DDDoS.express());

WebInit.init(Server, true);
DB.ready = function(){
	setInterval(function(){
		var q = [ 'createdAt', { $lte: Date.now() - 3600000 * 12 } ];

		DB.session.remove(q).on();
	}, 600000);
	setInterval(function(){
		gameServers.forEach(function(v){
			if(v.socket) v.socket.send(`{"type":"seek"}`);
			else v.seek = undefined;
		});
	}, 4000);
	PLLog.success("DB is ready.");

	DB.kkutu_shop_desc.find().on(function($docs){
		var i, j;

		for(i in Language) flush(i);
		function flush(lang){
			var db;

			Language[lang].SHOP = db = {};
			for(j in $docs){
				db[$docs[j]._id] = [ $docs[j][`name_${lang}`], $docs[j][`desc_${lang}`] ];
			}
		}
	});
	if(Const.IS_SECURED) {
		const options = Secure();
		https.createServer(options, Server).listen(10291);
	}
	else{
		Server.listen(10291);
	}
};
Const.MAIN_PORTS.forEach(function(v, i){
	var KEY = process.env['WS_KEY'];
	var protocol;
	if(Const.IS_SECURED) {
		protocol = 'wss';
	} else {
		protocol = 'ws';
	}
	gameServers[i] = new GameClient(KEY, `${protocol}://${GLOBAL.GAME_SERVER_HOST}:${v}/${KEY}`);
});
function GameClient(id, url){
	var my = this;

	my.id = id;
	my.socket = new WS(url, { perMessageDeflate: false, rejectUnauthorized: false});
	
	my.send = function(type, data){
		if(!data) data = {};
		data.type = type;

		my.socket.send(JSON.stringify(data));
	};
	my.socket.on('open', function(){
		PLLog.info(`Game server #${my.id} connected`);
	});
	my.socket.on('error', function(err){
		PLLog.warn(`Game server #${my.id} has an error: ${err.toString()}`);
	});
	my.socket.on('close', function(code){
		PLLog.error(`Game server #${my.id} closed: ${code}`);
		my.socket.removeAllListeners();
		delete my.socket;
	});
	my.socket.on('message', function(data){
		var _data = data;
		var i;

		data = JSON.parse(data);

		switch(data.type){
			case "seek":
				my.seek = data.value;
				break;
			case "narrate-friend":
				for(i in data.list){
					gameServers[i].send('narrate-friend', { id: data.id, s: data.s, stat: data.stat, list: data.list[i] });
				}
				break;
			case "notice":
				for(i in gameServers) gameServers[i].send('notice', { value: data.value });
				break;
			case "friendTalk":
				for(i in gameServers) gameServers[i].send('friendTalk', { value: data.value, friends: data.friends, profile: data.profile, user: data.user, id: data.id });
				break;
			case "postSent":
				for(i in gameServers) gameServers[i].send('postSent', { target: data.target });
				break;
			case "all":
				for(i in gameServers) gameServers[i].send('all', { data: data.data, _type: data._type });
				break;
			case "init12":
				for(i in gameServers) gameServers[i].send('init12');
				break;
			default:
		}
	});
}
ROUTES.forEach(function(v){
	require(`./routes/${v}`).run(Server, WebInit.page);
});
Server.get("/game", function(req, res){
	var server = req.query.server;
	
	//볕뉘 수정 구문삭제(220~229, 240)
	DB.session.findOne([ '_id', req.session.id ]).on(function($ses){
		// var sid = (($ses || {}).profile || {}).sid || "NULL";
		if(global.isPublic){
			onFinish($ses);
			// DB.jjo_session.findOne([ '_id', sid ]).limit([ 'profile', true ]).on(onFinish);
		}else{
			if($ses) $ses.profile.sid = $ses._id;
			onFinish($ses);
		}
	});
	function onFinish($doc){
		var id = req.session.id;

		if($doc){
			req.session.profile = $doc.profile;
			id = $doc.profile.sid;
		}else{
			delete req.session.profile;
		}
		page(req, res, Const.MAIN_PORTS[server] ? "kkutu" : "portal", {
			'_page': "kkutu",
			'_id': id,
			'PORT': Const.MAIN_PORTS[server],
			'HOST': req.hostname,
			'PROTOCOL': Const.IS_SECURED ? 'wss' : 'ws',
			'TEST': req.query.test,
			'MOREMI_PART': Const.MOREMI_PART,
			'AVAIL_EQUIP': Const.AVAIL_EQUIP,
			'CATEGORIES': Const.CATEGORIES,
			'GROUPS': Const.GROUPS,
			'MODE': Const.GAME_TYPE,
			'RULE': Const.RULE,
			'OPTIONS': Const.OPTIONS,
			'KO_INJEONG': Const.KO_INJEONG,
			'EN_INJEONG': Const.EN_INJEONG,
			'KO_THEME': Const.KO_THEME,
			'EN_THEME': Const.EN_THEME,
			'IJP_EXCEPT': Const.IJP_EXCEPT,
			'ogImage': "https://kkutu.cc/img/kkutu/og.png",
			'ogURL': "https://kkutu.cc/",
			'ogTitle': "플러스끄투",
			'ogDescription': "글자로 박진감 넘치는 게임을 즐겨보세요!"
		});
	}
});


Server.get("/servers", function(req, res){
	var list = [];

	gameServers.forEach(function(v, i){
		list[i] = v.seek;
	});
	res.send({ list: list, max: Const.KKUTU_MAX });
});


Server.get("/membercount", function(req, res){
	var list = [], v;
	
	for(var i=0; i<1; i++){
		v = gameServers[i];
		if(!v) break;
		
		list[i] = v.seek;
	}
	
	res.send({ list: list, max: Const.KKUTU_MAX.slice(0, 1) });
});


//볕뉘 수정 구문 삭제(274~353)

Server.get("/legal/:page", function(req, res){
	page(req, res, "legal/"+req.params.page);
});