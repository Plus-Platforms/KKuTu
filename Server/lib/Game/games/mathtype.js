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

var LIST_LENGTH = 200;
var DOUBLE_VOWELS = [ 9, 10, 11, 14, 15, 16, 19 ];
var DOUBLE_TAILS = [ 3, 5, 6, 9, 10, 11, 12, 13, 14, 15, 18 ];

function traverse(func){
	var my = this;
	var i, o;
	
	for(i in my.game.seq){
		if(!(o = DIC[my.game.seq[i]])) continue;
		if(!o.game) continue;
		func(o);
	}
}
exports.init = function(_DB, _DIC){
	DB = _DB;
	DIC = _DIC;
};
exports.getTitle = function(){
    var R = new Lizard.Tail();
    var my = this;
    var i, j;

    // 덧셈/뺄셈/곱셈식을 생성하는 함수
    function generateMathExpressions(count) {
        var operations = ['+', '-', '*'];
        var expressions = [];

        for (i = 0; i < count; i++) {
            var num1 = Math.floor(Math.random() * 10); // 0부터 99까지의 숫자 중 하나를 랜덤으로 선택
            var num2 = Math.floor(Math.random() * 10); // 0부터 99까지의 숫자 중 하나를 랜덤으로 선택
            var operation = operations[Math.floor(Math.random() * operations.length)]; // 연산자 랜덤 선택

            expressions.push(`${num1}${operation}${num2}`);
        }

        return expressions;
    }

    function pick(list){
        var data = [];
        var len = list.length;
        var arr;
        
        for(i=0; i<my.round; i++){
            arr = [];
            for(j=0; j<LIST_LENGTH; j++){
                arr.push(list[Math.floor(Math.random() * len)]);
            }
            data.push(arr);
        }
        my.game.lists = data;
        R.go("①②③④⑤⑥⑦⑧⑨⑩");
    }

    // 416개의 덧셈/뺄셈/곱셈식을 생성
    var mathExpressions = generateMathExpressions(416);
    // 생성된 식을 게임 리스트로 사용
    pick(mathExpressions);

    traverse.call(my, function(o){
        o.game.spl = 0;
    });
    return R;
};

exports.roundReady = function(){
	var my = this;
	var scores = {};
	
	if(!my.game.lists) return;
	
	my.game.round++;
	my.game.roundTime = my.time * 1000;
	if(my.game.round <= my.round){
		my.game.clist = my.game.lists.shift();
		my.byMaster('roundReady', {
			round: my.game.round,
			list: my.game.clist
		}, true);
		setTimeout(my.turnStart, 2400);
	}else{
		traverse.call(my, function(o){
			scores[o.id] = Math.round(o.game.spl / my.round);
		});
		my.roundEnd({ scores: scores });
	}
};
exports.turnStart = function(){
	var my = this;
	
	my.game.late = false;
	traverse.call(my, function(o){
		o.game.miss = 0;
		o.game.index = 0;
		o.game.semi = 0;
	});
	my.game.qTimer = setTimeout(my.turnEnd, my.game.roundTime);
	my.byMaster('turnStart', { roundTime: my.game.roundTime }, true);
};
exports.turnEnd = function(){
	var my = this;
	
	my.game.late = true;
	my.byMaster('turnEnd', {
		ok: false,
		speed: 0
	});
	my.game._rrt = setTimeout(my.roundReady, (my.game.round == my.round) ? 3000 : 10000);
};
exports.submit = function(client, text){
    var my = this;
    var score;

    if(!client.game) return;

    try {
        var result = text;

		//calculate my.game.clist[client.game.index] in form of 8*0, 9+3
		var correctResult = eval(my.game.clist[client.game.index]);
        
        // 계산된 결과와 정답 비교
        if(Number(result) === correctResult){
            score = my.getScore(text);
            
            client.game.semi += score;
            client.game.score += score;
            client.publish('turnEnd', {
                target: client.id,
                ok: true,
                value: text,
                score: score
            }, true);
        }else{
            client.game.miss++;
            client.send('turnEnd', { error: true });
        }
    } catch (e) {
        // 계산 중 오류 발생 시(예: 잘못된 식), 오류 메시지 전송
        client.send('turnEnd', { error: true, message: 'Invalid expression.' });
    }

    // 다음 문제로 인덱스 이동
    if(!my.game.clist[++client.game.index]) client.game.index = 0;
};

exports.getScore = function(text){
	var my = this;
	var i, len = text.length;
	var r = 0, s, t;
	
	return len;
};