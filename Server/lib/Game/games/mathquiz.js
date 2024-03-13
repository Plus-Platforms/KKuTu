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

var ROBOT_CATCH_RATE = [ 0.1, 0.3, 0.5, 0.7, 0.99 ];
var ROBOT_TYPE_COEF = [ 2000, 1200, 800, 300, 0 ];
var robotTimers = {};
var mathQuiz = false;

exports.init = function(_DB, _DIC){
	DB = _DB;
	DIC = _DIC;
};
exports.getTitle = function(){
	var R = new Lizard.Tail();
	var my = this;
	
	my.game.done = [];
	setTimeout(function(){
		R.go("①②③④⑤⑥⑦⑧⑨⑩");
	}, 500);

	switch(Const.GAME_TYPE[my.mode]){
		case 'CSQ':
			mathQuiz = false;
			break;
		case 'KMQ':
			mathQuiz = true;
			break;
	}

	return R;
};
exports.roundReady = function(){
	var my = this;
	var ijl = my.opts.injpick.length;
	
	clearTimeout(my.game.qTimer);
	clearTimeout(my.game.hintTimer);
	clearTimeout(my.game.hintTimer2);
	my.game.themeBonus = 0.3 * Math.log(0.6 * ijl + 1);
	my.game.winner = [];
	my.game.giveup = [];
	my.game.round++;
	my.game.roundTime = my.time * 1000;
	if(my.game.round <= my.round){
			if(!my.game.done) return;

			my.game.levelSelector = [];
			if(my.opts.ele){my.game.levelSelector.push("ELE");}
			if(my.opts.mid){my.game.levelSelector.push("MID");}
			if(my.opts.high){my.game.levelSelector.push("HIGH");}

			if(!my.opts.ele && !my.opts.mid && !my.opts.high){my.game.levelSelector.push("ELE");}

			my.game.theme = my.game.levelSelector[Math.floor(Math.random() * my.game.levelSelector.length)];
			my.game.questionType = 0;

			if(my.game.theme == "ELE"){
				my.game.questionType = Math.floor(Math.random() * 7);
				
				if (my.game.questionType == 0){
					//사칙연산
					var num1 = Math.floor(Math.random() * 100);
					var num2 = Math.floor(Math.random() * 100);
					var operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
					
					my.game.mathQuestion = num1 + " " + operator + " " + num2;
					my.game.mathAnswer = eval(my.game.mathQuestion);
				}
				else if (my.game.questionType == 1){
					//넓이 구하기 문제
					var num1 = parseFloat((Math.random() * 10).toFixed(1));
					var num2 = Math.floor(Math.random() * 10);
					var calclogic = ['cm', 'm', 'km'][Math.floor(Math.random() * 3)];
					var element = "";
					if (calclogic == "cm"){
						var element = "모레미"				
					}
					else if (calclogic = "m"){
						var element = "자동차"
					}
					else if (calclogic = "km"){
						var element = "운동장"
					}

					my.game.mathAnswer = num1*num2;
					my.game.mathQuestion = "가로 " + num1 + calclogic + ", 세로 " + num2 + calclogic + "인 직사각형 " + element + "의 넓이는? (숫자)";
				}
				else if (my.game.questionType == 2){
					var num1 = Math.floor(Math.random() * 10) + 1; // 1부터 100까지의 정수
					var num2 = Math.floor(Math.random() * 10) + 1; // 1부터 100까지의 정수
					
					var gcd = function(a, b) {
						return b ? gcd(b, a % b) : a;
					};
					
					var divisor = gcd(num1, num2);
					var numerator = num1 / divisor;
					var denominator = num2 / divisor;
					
					my.game.mathQuestion = "분수 " + num2 + "분의 " + num1 + "를 약분하세요. ( 2분의 1 형식으로 작성 )";
					my.game.mathAnswer = denominator + "분의 " + numerator ;
				}else if (my.game.questionType == 3) {
					// 최대공약수 문제
					var num1 = Math.floor(Math.random() * 10) + 1; // 1부터 100까지의 정수
					var num2 = Math.floor(Math.random() * 10) + 1; // 1부터 100까지의 정수
					
					var gcd = function(a, b) {
						return b ? gcd(b, a % b) : a;
					};
					
					var answer = gcd(num1, num2);
					
					my.game.mathQuestion = num1 + "와 " + num2 + "의 최대공약수를 구하세요. (서로소는 1)";
					my.game.mathAnswer = answer;
				} else if (my.game.questionType == 4) {
					// 최소공배수 문제
					var num1 = Math.floor(Math.random() * 10) + 1; // 1부터 100까지의 정수
					var num2 = Math.floor(Math.random() * 10) + 1; // 1부터 100까지의 정수
					
					var gcd = function(a, b) {
						return b ? gcd(b, a % b) : a;
					};
					
					var lcm = function(a, b) {
						return (a * b) / gcd(a, b);
					};
					
					var answer = lcm(num1, num2);
					
					my.game.mathQuestion = num1 + "와 " + num2 + "의 최소공배수를 구하세요.";
					my.game.mathAnswer = answer;
				} else if (my.game.questionType == 5) {
					        // 조의 자리 읽기 문제
							var num = Math.floor(Math.random() * 9000000000000) + 1000000000000; // 1조부터 1조 미만의 정수
        
							my.game.mathQuestion = formatNumber(num) + "을(를) 한글로 읽어보세요.";
							my.game.mathAnswer = readNumber(num);
				} else if (my.game.questionType == 6) {
					
							// 숫자 읽기 문제
							var num = Math.floor(Math.random() * 9000000000000000) + 1000000000000000; // 1경부터 1경 미만의 정수
							
							my.game.mathQuestion = formatNumber(num) + "을(를) 한글로 읽어보세요.";
							my.game.mathAnswer = readNumber(num);
				}

				
				function readNumber(num) {
					var numStr = num.toString();
					var length = numStr.length;
					var units = ["", "만", "억", "조", "경"];
					var result = "";
					
					for (var i = 0; i < length; i += 4) {
						var chunk = numStr.substring(length - i - 4, length - i);
						if (chunk !== "0000") {
							var unit = units[i / 4];
							result = chunk + unit + " " + result;
						}
					}
					
					return result.trim();
				}
				
				function formatNumber(num) {
					if (num >= 1e16) {
						return num.toLocaleString(); // 큰 숫자일 경우 지수 표기법 대신 일반 숫자 형태로 변환
					}
					return num;
				}

			}
			else if (my.game.theme == "MID"){
				my.game.questionType = Math.floor(Math.random() * 2);

				if (my.game.questionType == 0) {
					// 미지수 문제
					var unknown = ["x", "y", "z"];
					var variable = unknown[Math.floor(Math.random() * unknown.length)];
					
					var coefficient = Math.floor(Math.random() * 10) + 1; // 1부터 10까지의 계수
					var constant = Math.floor(Math.random() * 10) + 1; // 1부터 10까지의 상수
					
					my.game.mathQuestion = coefficient + variable + " + " + constant + " = 0에서 " + variable + "의 값을 구하시오. ("+variable+" = 3 형식)";
					var answer = -constant / coefficient;
					if (Number.isInteger(answer)) {
						my.game.mathAnswer = answer;
					} else {
						my.game.mathAnswer = Math.floor(answer);
					}
				}
				else if (my.game.questionType == 1){
					// 일차방정식 문제
					var coefficient = Math.floor(Math.random() * 10) + 1; // 1부터 10까지의 계수
					var constant = Math.floor(Math.random() * 10) + 1; // 1부터 10까지의 상수
					var variable = ["x", "y", "z"][Math.floor(Math.random() * 3)];
					
					my.game.mathQuestion = coefficient + variable + " + " + constant + " = 0에서 " + variable + "의 값을 구하시오. ("+variable+" = 3 형식)";
					
					var answer = -constant / coefficient;
					if (Number.isInteger(answer)) {
						my.game.mathAnswer = answer;
					} else {
						my.game.mathAnswer = Math.floor(answer);
					}
				}
			}
			else{
				//삼차방정식 문제
				//복소수 문제
				//곱셈공식 문제
			}
			// $ans가 null이면 골치아프다...
			my.game.late = false;
			my.game.answer = {_id: my.game.mathAnswer, mean: "테스트"} || {};
			my.game.done.push("테스트");
			my.game.hint = "";
			my.byMaster('roundReady', {
				round: my.game.round,
				theme: my.game.theme
			}, true);
			setTimeout(my.turnStart, 2400);
	}else{
		my.roundEnd();
	}
};
exports.turnStart = function(){
	var my = this;
	var i;
	
	if(!my.game.answer) return;
	
	my.game.conso = my.game.mathQuestion;
	my.game.roundAt = (new Date()).getTime();
	my.game.meaned = 0;
	my.game.primary = 0;
	my.game.qTimer = setTimeout(my.turnEnd, my.game.roundTime);
	my.game.hintTimer = setTimeout(function(){ turnHint.call(my); }, my.game.roundTime * 0.333);
	my.game.hintTimer2 = setTimeout(function(){ turnHint.call(my); }, my.game.roundTime * 0.667);
	my.byMaster('turnStart', {
		char: my.game.conso,
		roundTime: my.game.roundTime
	}, true);
	
	for(i in my.game.robots){
		my.readyRobot(my.game.robots[i]);
	}
};
function turnHint(){
	if (!mathQuiz){
		var my = this;
	
		my.byMaster('turnHint', {
			hint: my.game.hint[my.game.meaned++]
		}, true);
	}
}
exports.turnEnd = function(){
	var my = this;

	if(my.game.answer){
		my.game.late = true;
		my.byMaster('turnEnd', {
			answer: my.game.answer ? my.game.answer._id : ""
		});
	}
	my.game._rrt = setTimeout(my.roundReady, 2500);
};
exports.submit = function(client, text){
	var my = this;
	var score, t, i;
	var $ans = my.game.answer;
	var now = (new Date()).getTime();
	var play = (my.game.seq ? my.game.seq.includes(client.id) : false) || client.robot;
	var gu = my.game.giveup ? my.game.giveup.includes(client.id) : true;
	
	if(!my.game.winner) return;
	if(my.game.winner.indexOf(client.id) == -1
		&& text == $ans._id
		&& play && !gu
	){
		t = now - my.game.roundAt;
		if(my.game.primary == 0) if(my.game.roundTime - t > 10000){ // 가장 먼저 맞힌 시점에서 10초 이내에 맞히면 점수 약간 획득
			clearTimeout(my.game.qTimer);
			my.game.qTimer = setTimeout(my.turnEnd, 10000);
			for(i in my.game.robots){
				if(my.game.roundTime > my.game.robots[i]._delay){
					clearTimeout(my.game.robots[i]._timer);
					if(client != my.game.robots[i]) if(Math.random() < ROBOT_CATCH_RATE[my.game.robots[i].level])
						my.game.robots[i]._timer = setTimeout(my.turnRobot, ROBOT_TYPE_COEF[my.game.robots[i].level], my.game.robots[i], text);
				}
			}
		}
		clearTimeout(my.game.hintTimer);
		score = my.getScore(text, t);
		my.game.primary++;
		my.game.winner.push(client.id);
		client.game.score += score;
		client.publish('turnEnd', {
			target: client.id,
			ok: true,
			value: text,
			score: score,
			bonus: 0
		}, true);
		client.invokeWordPiece(text, 0.9);
		while(my.game.meaned < my.game.hint.length){
			turnHint.call(my);
		}
	}else if(play && !gu && (text == "gg" || text == "ㅈㅈ")){
		my.game.giveup.push(client.id);
		client.publish('turnEnd', {
			target: client.id,
			giveup: true
		}, true);
	}else{
		client.chat(text);
	}
	if(play) if(my.game.primary + my.game.giveup.length >= my.game.seq.length){
		clearTimeout(my.game.hintTimer);
		clearTimeout(my.game.hintTimer2);
		clearTimeout(my.game.qTimer);
		my.turnEnd();
	}
};
exports.getScore = function(text, delay){
	var my = this;
	var rank = my.game.hum - my.game.primary + 3;
	var tr = 1 - delay / my.game.roundTime;
	var score = 6 * Math.pow(rank, 1.4) * ( 0.5 + 0.5 * tr );

	return Math.round(score);
};
exports.readyRobot = function(robot){
	var my = this;
	var level = robot.level;
	var delay, text;
	var i;
	
	if(!my.game.answer) return;
	clearTimeout(robot._timer);
	robot._delay = 99999999;
	for(i=0; i<2; i++){
		if(Math.random() < ROBOT_CATCH_RATE[level]){
			text = my.game.answer._id;
			delay = my.game.roundTime / 3 * i + text.length * ROBOT_TYPE_COEF[level];
			robot._timer = setTimeout(my.turnRobot, delay, robot, text);
			robot._delay = delay;
			break;
		}else continue;
	}
};
function getConsonants(word, lucky){
	var R = "";
	var i, len = word.length;
	var c;
	var rv = [];
	
	lucky = lucky || 0;
	while(lucky > 0){
		c = Math.floor(Math.random() * len);
		if(rv.includes(c)) continue;
		rv.push(c);
		lucky--;
	}
	for(i=0; i<len; i++){
		c = word.charCodeAt(i) - 44032;
		
		if(c < 0 || rv.includes(i)){
			R += word.charAt(i);
			continue;
		}else c = Math.floor(c / 588);
		R += Const.INIT_SOUNDS[c];
	}
	return R;
}
function getHint($ans){
	var R = [];
	var h1 = $ans.mean.replace(new RegExp($ans._id, "g"), "★");
	var h2;
	
	R.push(h1);
	do{
		h2 = getConsonants($ans._id, Math.ceil($ans._id.length / 2));
	}while(h1 == h2);
	R.push(h2);
	
	return R;
}
function getAnswer(theme, nomean){
	var my = this;
	var R = new Lizard.Tail();

	var args = [ [ '_id', { $nin: my.game.done } ] ];
	
	args.push([ 'theme', new RegExp("(,|^)(" + theme + ")(,|$)") ]);
	args.push([ 'type', Const.KOR_GROUP ]);
	args.push([ 'flag', { $lte: 7 } ]);
	DB.kkutu['ko'].find.apply(my, args).on(function($res){
		if(!$res) return R.go(null);
		var pick;
		var len = $res.length;
		
		if(!len) return R.go(null);
		do{
			pick = Math.floor(Math.random() * len);
			if($res[pick]._id.length >= 2) if($res[pick].type == "INJEONG" || $res[pick].mean.length >= 0){
				return R.go($res[pick]);
			}
			$res.splice(pick, 1);
			len--;
		}while(len > 0);
		R.go(null);
	});
	return R;
}