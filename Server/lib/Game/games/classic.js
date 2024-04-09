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

var Const = require('../../const');
var Lizard = require('../../sub/lizard');
var DB;
var DIC;
var freeAble = false;

const ROBOT_START_DELAY = [ 1200, 800, 400, 200, 0 ];
const ROBOT_TYPE_COEF = [ 1250, 750, 500, 250, 0 ];
const ROBOT_THINK_COEF = [ 4, 2, 1, 0, 0 ];
const ROBOT_HIT_LIMIT = [ 8, 4, 2, 1, 0 ];
const ROBOT_LENGTH_LIMIT = [ 3, 4, 9, 99, 100 ];
const RIEUL_TO_NIEUN = [4449, 4450, 4457, 4460, 4462, 4467];
const RIEUL_TO_IEUNG = [4451, 4455, 4456, 4461, 4466, 4469];
const NIEUN_TO_IEUNG = [4455, 4461, 4466, 4469];

exports.init = function(_DB, _DIC){
	DB = _DB;
	DIC = _DIC;
};
exports.getTitle = function(){
	var R = new Lizard.Tail();
	var my = this;
	var l = my.rule;
	var EXAMPLE;
	var eng, ja;
	
	if(!l){
		R.go("undefinedd");
		return R;
	}
	if(!l.lang){
		R.go("undefinedd");
		return R;
	}
	EXAMPLE = Const.EXAMPLE_TITLE[l.lang];
	my.game.dic = {};
	
	switch(Const.GAME_TYPE[my.mode]){
		case 'EKT':
			freeAble = false;
		case 'ESH':
			freeAble = false;
			eng = "^" + String.fromCharCode(97 + Math.floor(Math.random() * 26));
			break;
		case 'KJH':
			freeAble = true;
			ja = 44032 + 588 * Math.floor(Math.random() * 18);
			eng = "^[\\u" + ja.toString(16) + "-\\u" + (ja + 587).toString(16) + "]";
			break;
		case 'KKT':
			freeAble = false;
			my.game.wordLength = 3;
		case 'KSH':
			freeAble = false;
			ja = 44032 + 588 * Math.floor(Math.random() * 18);
			eng = "^[\\u" + ja.toString(16) + "-\\u" + (ja + 587).toString(16) + "]";
			break;
		case 'KAP':
			freeAble = false;
			ja = 44032 + 588 * Math.floor(Math.random() * 18);
			eng = "[\\u" + ja.toString(16) + "-\\u" + (ja + 587).toString(16) + "]$";
			break;
	}
	function tryTitle(h){
		if(h > 50){
			R.go(EXAMPLE);
			return;
		}

		DB.kkutu[l.lang].find(
			[ '_id', new RegExp(eng + ".{" + Math.max(1, my.round - 1) + "}$") ],
			// [ 'hit', { '$lte': h } ],
			(l.lang == "ko") ? [ 'type', Const.KOR_GROUP ] : [ '_id', Const.ENG_ID ]
			// '$where', eng+"this._id.length == " + Math.max(2, my.round) + " && this.hit <= " + h
		).limit(20).on(function($md){
			var list;
			
			if($md.length){
				list = shuffle($md);
				checkTitle(list.shift()._id).then(onChecked);
			
				function onChecked(v){
					if(v) R.go(v);
					else if(list.length) checkTitle(list.shift()._id).then(onChecked);
					else R.go(EXAMPLE);
				}
			}else{
				tryTitle(h + 10);
			}
		});
	}
	function checkTitle(title){
		var R = new Lizard.Tail();
		var i, list = [];
		var len;
		
		/* ���ϰ� �ʹ� �ɸ��ٸ� �ּ��� Ǯ��.
		R.go(true);
		return R;
		*/
		if(title == null){
			R.go(EXAMPLE);
		}else{
			len = title.length;
			for(i=0; i<len; i++) list.push(getAuto.call(my, title[i], getSubChar.call(my, title[i]), 1));
			
			Lizard.all(list).then(function(res){
				for(i in res) if(!res[i]) return R.go(EXAMPLE);
				
				return R.go(title);
			});
		}
		return R;
	}
	tryTitle(10);
	
	return R;
};
exports.roundReady = function(){
	var my = this;
	if(!my.game.title) return;
	
	clearTimeout(my.game.turnTimer);
	my.game.round++;
	my.game.roundTime = my.time * 1000;
	if(my.game.round <= my.round){
        let isFirstRound = my.game.round == 1;
		my.game.char = my.game.title[my.game.round - 1];
		my.game.subChar = getSubChar.call(my, my.game.char);
		my.game.chain = [];
		if(my.opts.mission) my.game.mission = getMission(my.rule.lang);
		if(my.opts.sami) my.game.wordLength = 2;
		if (my.opts.item) {
            if (isFirstRound) {
                my.game.item = {};
                my.game.used = {};
                my.game.rev = false;
                my.game.ilock = false;
            }
            for (o of my.game.seq) {
                let t = o.robot ? o.id : o;
                my.game.item[t] = [0, 0, 0, 0, 0];
                my.game.used[t] = 0;
                my.game.ilock = false;
            }
        }
		
		my.byMaster('roundReady', {
			round: my.game.round,
			char: my.game.char,
			subChar: my.game.subChar,
			mission: my.game.mission
		}, true);
		my.game.turnTimer = setTimeout(my.turnStart, 2400);
	}else{
		my.roundEnd();
	}
};
exports.turnStart = function(force){
	var my = this;
	var speed;
	var si;
	
	if(!my.game.chain) return;
	my.game.roundTime = Math.min(my.game.roundTime, Math.max(10000, 150000 - my.game.chain.length * 1500));
	speed = my.getTurnSpeed(my.game.roundTime);
	clearTimeout(my.game.turnTimer);
	clearTimeout(my.game.robotTimer);
	my.game.late = false;
	my.game.turnTime = 15000 - 1400 * speed;
	my.game.turnAt = (new Date()).getTime();
	if(my.opts.sami) my.game.wordLength = (my.game.wordLength == 3) ? 2 : 3;
	
	my.byMaster('turnStart', {
		turn: my.game.turn,
		char: my.game.char,
		subChar: my.game.subChar,
		speed: speed,
		roundTime: my.game.roundTime,
		turnTime: my.game.turnTime,
		mission: my.game.mission,
		wordLength: my.game.wordLength,
		seq: force ? my.game.seq : undefined
	}, true);
	my.game.turnTimer = setTimeout(my.turnEnd, Math.min(my.game.roundTime, my.game.turnTime + 100));
	if(si = my.game.seq[my.game.turn]) if(si.robot){
		si._done = [];
		my.readyRobot(si);
	}
};
exports.turnEnd = function(){
	var my = this;
	var target;
	var score;
	
	if(!my.game.seq) return;
	target = DIC[my.game.seq[my.game.turn]] || my.game.seq[my.game.turn];
	
	if(my.game.loading){
		my.game.turnTimer = setTimeout(my.turnEnd, 100);
		return;
	}
	my.game.late = true;
	if(target) if(target.game){
		score = Const.getPenalty(my.game.chain, target.game.score);
		target.game.score += score;
	}
	getAuto.call(my, my.game.char, my.game.subChar, 0).then(function(w){
		my.byMaster('turnEnd', {
			ok: false,
			target: target ? target.id : null,
			score: score,
			hint: w
		}, true);
		my.game._rrt = setTimeout(my.roundReady, 3000);
	});
	clearTimeout(my.game.robotTimer);
};
exports.submit = function(client, text){
	var score, l, t;
	var my = this;
	var tv = (new Date()).getTime();
	var mgt = my.game.seq[my.game.turn];
	var returnNuff = false;

	if(!mgt) return;
	if(!mgt.robot) if(mgt != client.id) return;
	if(!my.game.char) return;
	
	if(!isChainable(text, my.mode, my.game.char, my.game.subChar)) return client.chat(text);
	if(my.game.chain.indexOf(text) != -1 && !my.opts.reuse) return client.publish('turnError', { code: 409, value: text }, true);
	if(my.game.chain.indexOf(text) != -1 && my.opts.reuse) returnNuff = true;

	l = my.rule.lang;
	my.game.loading = true;
	function onDB($doc){
		if(!my.game.chain) return;
		var preChar = getChar.call(my, text);
		var preSubChar = getSubChar.call(my, preChar);
		var firstMove = my.game.chain.length < 1;
		
		function preApproved(){
			function approved(){
				if(my.game.late) return;
				if(!my.game.chain) return;
				if(!my.game.dic) return;
				
				my.game.loading = false;
				my.game.late = true;
				clearTimeout(my.game.turnTimer);
				t = tv - my.game.turnAt;
				score = (returnNuff) ? 0 : my.getScore(text, t, false, returnNuff);
				my.game.dic[text] = (my.game.dic[text] || 0) + 1;
				my.game.chain.push(text);
				my.game.roundTime -= t;
				my.game.char = preChar;
				my.game.subChar = preSubChar;
				client.game.score += score;
				if(!freeAble){
				client.publish('turnEnd', {
					ok: true,
					value: text,
					mean: $doc.mean,
					theme: $doc.theme,
					wc: $doc.type,
					score: score,
					bonus: (my.game.mission === true) ? score - my.getScore(text, t, true, returnNuff) : 0,
					baby: $doc.baby
				}, true);
			}
			else{
				client.publish('turnEnd', {
					ok: true,
					value: text,
					mean: "",
					theme: "",
					wc: "",
					score: score,
					bonus: (my.game.mission === true) ? score - my.getScore(text, t, true, returnNuff) : 0,
					baby: ""
				}, true);
			}
				if(my.game.mission === true){
					my.game.mission = getMission(my.rule.lang);
				}
				setTimeout(my.turnNext, my.game.turnTime / 6);
				if(!client.robot && !freeAble){
					client.invokeWordPiece(text, 1);
					DB.kkutu[l].update([ '_id', text ]).set([ 'hit', $doc.hit + 1 ]).on();
				}
			}
			if(firstMove || my.opts.manner) getAuto.call(my, preChar, preSubChar, 1).then(function(w){
				if(w) approved();
				else{
					my.game.loading = false;
					client.publish('turnError', { code: firstMove ? 402 : 403, value: text }, true);
					if(client.robot){
						my.readyRobot(client);
					}
				}
			});
			else approved();
		}
		function denied(code){
			my.game.loading = false;
			client.publish('turnError', { code: code || 404, value: text }, true);
		}
		
		if(freeAble){
			var kkutuAble = /^[0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/;
			if(kkutuAble.test(text)){
				preApproved();
			}
			else{
				denied(408);
			}
		}
		else if($doc){
			if(!my.opts.injeong && ($doc.flag & Const.KOR_FLAG.INJEONG)) denied();
			else if(my.opts.strict && (!$doc.type.match(Const.KOR_STRICT) || $doc.flag >= 4)) denied(406);
			else if(my.opts.loanword && ($doc.flag & Const.KOR_FLAG.LOANWORD)) denied(405);
			else preApproved();
		}else{
			denied();
		}
	}
	function isChainable(){
		var type = Const.GAME_TYPE[my.mode];
		var char = my.game.char, subChar = my.game.subChar;
		var l = char.length;
		
		if(!text) return false;
		if(text.length <= l) return false;
		if(my.game.wordLength && text.length != my.game.wordLength) return false;
		if(type == "KAP") return (text.slice(-1) == char) || (text.slice(-1) == subChar);
		switch(l){
			case 1: return (text[0] == char) || (text[0] == subChar);
			case 2: return (text.substr(0, 2) == char);
			case 3: return (text.substr(0, 3) == char) || (text.substr(0, 2) == char.slice(1));
			default: return false;
		}
	}
	DB.kkutu[l].findOne([ '_id', text ],
		(l == "ko") ? [ 'type', Const.KOR_GROUP ] : [ '_id', Const.ENG_ID ]
	).on(onDB);
};

exports.useItem = function(client, id){
    let my = this;
    if (id < 0 || id > 5) return; // 없는 아이템
    if (my.game.late) return;
    let mgt = my.game.seq[my.game.turn];
    let uid = mgt.robot ? mgt.id : mgt;
    let firstMove = my.game.chain.length < 1;
    let isTurnEnd = true;
    let denied = false;

    if (!mgt) return;
    if (uid != client.id) return;
    if (my.game.ilock) return client.publish('turnError', {code: 420}, true); // 아이템 연속사용
    if (firstMove) return client.publish('turnError', {code: 421}, true); // 첫 턴
    if (my.game.used[uid] >= 5 || my.game.item[uid][id] >= 2) return client.publish('turnError', {code: 429}, true); // 횟수 초과

    switch (id) {
        case 0: // 넘기기 - 다음 사람으로 턴으로 넘김
            break;
        case 1: // 건너뛰기 - 다음 사람의 턴을 넘김
            my.game.queue = 1;
            break;
        case 2: // 뒤로 - 턴 순서를 반대로 만듦
            my.game.rev = !my.game.rev;
            break;
        case 3: // 제시어 변경 - 랜덤 제시어로 변경 (단, 쿵쿵따는 가운데 글자로 바꿈)
            isTurnEnd = true;
            let newChar;
            if (GAME_TYPE[my.mode] == 'KKT') {
                // 쿵쿵따 전용처리
                let chainlen = my.game.chain.length;
                if (!chainlen) {
                    denied = true;
                    break;
                }
                let lastword = my.game.chain[chainlen - 1];
                newChar = lastword.charAt(lastword.length - 2); // 3글자면 2번째, 2글자면 1번째 글자로 제시어 변경

                let count = getWordList.call(my, newChar, getSubChar.call(my, newChar), true).length;
                if (count < 5) denied = true;
            } else {
                newChar = getRandomChar.call(this);
            }
            if (!newChar) denied = true;

            if (!denied) {
                my.game.char = newChar;
                my.game.subChar = getSubChar.call(my, newChar)
                my.game.queue = -1;
            }
            break;
        case 4: // 한번 더 - 단어를 한번 더 입력함
            isTurnEnd = false;
            my.game.queue = -1;
            break;
        case 5: // 무작위 - 무작위 글자를 넘겨줍니다. 쿵쿵따에서는 가운데 글자로 넘겨줍니다.
            isTurnEnd = false;
            my.game.random = true;
    }
    if (denied) {
        return client.publish('turnError', {code: 420}, true);
    }
    my.game.used[uid]++;
    my.game.item[uid][id]++;
    my.game.ilock = true;
    client.publish('useItem', {
        item: id,
        isEnd: isTurnEnd
    }, true);
    // 아이템 사용으로 턴이 종료됨 or 턴을 다시 시작해야함
    if (isTurnEnd) {
        my.game.late = true;
        setTimeout(runAs, my.game.turnTime / 6, my, my.turnNext);
    }
};

exports.getScore = function(text, delay, ignoreMission, returnNuff){
	var my = this;
	var tr = 1 - delay / my.game.turnTime;
	var score, arr;
	
	if(!text || !my.game.chain || !my.game.dic) return 0;
	score = Const.getPreScore(text, my.game.chain, tr);
	
	if(my.game.dic[text]) score *= 15 / (my.game.dic[text] + 15);
	if(!ignoreMission) if(arr = text.match(new RegExp(my.game.mission, "g"))){
		score += score * 0.5 * arr.length;
		my.game.mission = true;
	}

	if(returnNuff) score = 0;
	return Math.round(score);
};
exports.readyRobot = function(robot){
	var my = this;
	var level = robot.level;
	var delay = ROBOT_START_DELAY[level];
	var ended = {};
	var w, text, i;
	var lmax;
	var isRev = Const.GAME_TYPE[my.mode] == "KAP";
	
	getAuto.call(my, my.game.char, my.game.subChar, 2).then(function(list){
		if(list.length){
			list.sort(function(a, b){ return b.hit - a.hit; });
			if(ROBOT_HIT_LIMIT[level] > list[0].hit) denied();
			else{
				if(level >= 3 && !robot._done.length){
					if(Math.random() < 0.5) list.sort(function(a, b){ return b._id.length - a._id.length; });
					if(list[0]._id.length < 8 && my.game.turnTime >= 2300){
						for(i in list){
							w = list[i]._id.charAt(isRev ? 0 : (list[i]._id.length - 1));
							if(!ended.hasOwnProperty(w)) ended[w] = [];
							ended[w].push(list[i]);
						}
						getWishList(Object.keys(ended)).then(function(key){
							var v = ended[key];
							
							if(!v) denied();
							else pickList(v);
						});
					}else{
						pickList(list);
					}
				}else pickList(list);
			}
		}else denied();
	});
	function denied() {
		// 랜덤 단어 목록
		const randomWords = ["ㅁㄴ엄ㄴ어ㅑㅇㅁㄴㅇㅂ", "ㅂㅂㅂ베ㅔㅂ레ㅏ", "ㅓㅜㄴ춘ㅊ", "벼ㅓㅑ뱝뎌", "?", "ㅑㅂ댑댜ㅐ", " 아잉", "??", "?어이업내", "한방어이없음", "단", "산", "퇴", "을", "남", "곡", "지", "천", "주", "해", "율", "서", "곰", "병", "신", "행", "크", "씨", "발", "오", "최", "건", "희", "지", "랄", "관", "둬", "김", "대", "운"];
		const failWords = ["하 님 매너좀", "한방단어를 써버리내 ㅋㅋㅋ", "헋", "아잉", "에라이", "에휴", "gk", "하", "얼탱x", "어이없네", "선넘지 마세요", "선 넘지 마세요", "님 진짜 머하세요", "ㅜㅜ", "ㅠㅠ", "...", ";;", "."]
		// 랜덤 단어 선택을 위한 함수
		function getRandomWord(type) {
			if (type == 0){
				const randomIndex = Math.floor(Math.random() * randomWords.length);
				return randomWords[randomIndex];
			}
			else if (type == 1){
				const randomIndex = Math.floor(Math.random() * failWords.length);
				return failWords[randomIndex];
			}
		}
	
		// T.T 대신 랜덤 단어로 대체하여 표시
		text = isRev ? `${getRandomWord(0)}${my.game.char}` : `${my.game.char}${getRandomWord(0)}`;
		after();

		setTimeout(function(){text = getRandomWord(1); after();}, 3000);
	}
	function pickList(list){
		if(list) do{
			if(!(w = list.shift())) break;
		}while(w._id.length > ROBOT_LENGTH_LIMIT[level] || robot._done.includes(w._id));
		if(w){
			text = w._id;
			delay += 500 * ROBOT_THINK_COEF[level] * Math.random() / Math.log(1.1 + w.hit);
			after();
		}else denied();
	}
	function after(){
		delay += text.length * ROBOT_TYPE_COEF[level];
		robot._done.push(text);
		setTimeout(my.turnRobot, delay, robot, text);
	}
	function getWishList(list){
		var R = new Lizard.Tail();
		var wz = [];
		var res;
		
		for(i in list) wz.push(getWish(list[i]));
		Lizard.all(wz).then(function($res){
			if(!my.game.chain) return;
			$res.sort(function(a, b){ return a.length - b.length; });
			
			if(my.opts.manner || !my.game.chain.length){
				while(res = $res.shift()) if(res.length) break;
			}else res = $res.shift();
			R.go(res ? res.char : null);
		});
		return R;
	}
	function getWish(char){
		var R = new Lizard.Tail();
		
		DB.kkutu[my.rule.lang].find([ '_id', new RegExp(isRev ? `.${char}$` : `^${char}.`) ]).limit(10).on(function($res){
			R.go({ char: char, length: $res.length });
		});
		return R;
	}
};
function getMission(l){
	var arr = (l == "ko") ? Const.MISSION_ko : Const.MISSION_en;
	
	if(!arr) return "-";
	return arr[Math.floor(Math.random() * arr.length)];
}
function getAuto(char, subc, type){
	/* type
		0 ������ �ܾ� �ϳ�
		1 ���� ����
		2 �ܾ� ���
	*/
	var my = this;
	var R = new Lizard.Tail();
	var gameType = Const.GAME_TYPE[my.mode];
	var adv, adc;
	var key = gameType + "_" + keyByOptions(my.opts);
	var MAN = DB.kkutu_manner[my.rule.lang];
	var bool = type == 1;
	
	adc = char + (subc ? ("|"+subc) : "");
	switch(gameType){
		case 'EKT':
			adv = `^(${adc})..`;
			break;
		case 'KSH':
			adv = `^(${adc}).`;
			break;
		case 'KJH':
			adv = `.*`;
			break;
		case 'ESH':
			adv = `^(${adc})...`;
			break;
		case 'KKT':
			adv = `^(${adc}).{${my.game.wordLength-1}}$`;
			break;
		case 'KAP':
			adv = `.(${adc})$`;
			break;
	}
	if(!char){
		console.log(`Undefined char detected! key=${key} type=${type} adc=${adc}`);
	}
	MAN.findOne([ '_id', char || "★" ]).on(function($mn){
		if($mn && bool){
			if($mn[key] === null) produce();
			else R.go($mn[key]);
		}else{
			produce();
		}
	});
	function produce(){
		var aft;
		var lst;
		
		var aqs = [[ '_id', new RegExp(adv) ]];
		if(!my.opts.injeong) aqs.push([ 'flag', { '$nand': Const.KOR_FLAG.INJEONG } ]);
		if(my.rule.lang == "ko"){
			if(my.opts.loanword) aqs.push([ 'flag', { '$nand': Const.KOR_FLAG.LOANWORD } ]);
			if(my.opts.strict) aqs.push([ 'type', Const.KOR_STRICT ], [ 'flag', { $lte: 3 } ]);
			else aqs.push([ 'type', Const.KOR_GROUP ]);
		}else{
			aqs.push([ '_id', Const.ENG_ID ]);
		}

		switch(type){
			case 0:
			default:
				aft = function($md){
					R.go($md[Math.floor(Math.random() * $md.length)]);
				};
				break;
			case 1:
				aft = function($md){
					R.go($md.length ? true : false);
				};
				break;
			case 2:
				aft = function($md){
					R.go($md);
				};
				break;
		}
		DB.kkutu[my.rule.lang].find.apply(this, aqs).limit(bool ? 1 : 123).on(function($md){
			forManner($md);
			if(my.game.chain) aft($md.filter(function(item){ return !my.game.chain.includes(item); }));
			else aft($md);
		});
		function forManner(list){
			lst = list;
			MAN.upsert([ '_id', char ]).set([ key, lst.length ? true : false ]).on(null, null, onFail);
		}
		function onFail(){
			MAN.createColumn(key, "boolean").on(function(){
				forManner(lst);
			});
		}
	}
	return R;
}
function keyByOptions(opts){
	var arr = [];
	
	if(opts.injeong) arr.push('X');
	if(opts.loanword) arr.push('L');
	if(opts.strict) arr.push('S');
	return arr.join('');
}
function shuffle(arr){
	var i, r = [];
	
	for(i in arr) r.push(arr[i]);
	r.sort(function(a, b){ return Math.random() - 0.5; });
	
	return r;
}
function getChar(text){
	var my = this;
	
	switch(Const.GAME_TYPE[my.mode]){
		case 'EKT': return text.slice(text.length - 3);
		case 'ESH':
		case 'KKT':
		case 'KSH': return text.slice(-1);
		case 'KJH': return text.slice(-1);
		case 'KAP': return text.charAt(0);
	}
};
function getSubChar(char){
	var my = this;
	var r;
	var c = char.charCodeAt();
	var k;
	var ca, cb, cc;
	
	switch(Const.GAME_TYPE[my.mode]){
		case "EKT":
			if(char.length > 2) r = char.slice(1);
			break;
		case "KKT": case "KSH": case "KAP": case "KJH":
			k = c - 0xAC00;
			if(k < 0 || k > 11171) break;
			ca = [ Math.floor(k/28/21), Math.floor(k/28)%21, k%28 ];
			cb = [ ca[0] + 0x1100, ca[1] + 0x1161, ca[2] + 0x11A7 ];
			cc = false;
			if(cb[0] == 4357){ // ������ ��, ��
				cc = true;
				if(RIEUL_TO_NIEUN.includes(cb[1])) cb[0] = 4354;
				else if(RIEUL_TO_IEUNG.includes(cb[1])) cb[0] = 4363;
				else cc = false;
			}else if(cb[0] == 4354){ // ������ ��
				if(NIEUN_TO_IEUNG.indexOf(cb[1]) != -1){
					cb[0] = 4363;
					cc = true;
				}
			}
			if(cc){
				cb[0] -= 0x1100; cb[1] -= 0x1161; cb[2] -= 0x11A7;
				r = String.fromCharCode(((cb[0] * 21) + cb[1]) * 28 + cb[2] + 0xAC00);
			}
			break;
		case "ESH": default:
			break;
	}
	return r;
}