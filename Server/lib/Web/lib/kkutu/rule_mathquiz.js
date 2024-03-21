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

$lib.MathQuiz.roundReady = function(data){
	var tv = L['selectLevel'] + ": " + L['level_' + data.theme];
	$stage.game.wrong.html("오답입니다!");
	clearBoard();
	$data._roundTime = $data.room.time * 1000;
	$data._fastTime = 10000;
	$stage.game.display.html(tv);
	$stage.game.items.hide();
	$stage.game.hints.show();
	$(".jjo-turn-time .graph-bar")
		.width("760px")
		.html("")
		.css('font-size', "")
		.css('text-align', "center");

	$(".jjo-turn-time").css('width', "760px");
	$(".jjoDisplayBar").css('width', "760px");
	drawRound(data.round);
	playSound('success');
	clearInterval($data._tTime);
};
$lib.MathQuiz.turnStart = function(data){
	$(".game-user-current").removeClass("game-user-current");
	$(".game-user-bomb").removeClass("game-user-bomb");
	if($data.room.game.seq.indexOf($data.id) >= 0) $stage.game.hereText.show();
	$stage.game.display.html($data._char = data.char).css('width', "756px").css('font-size', "20px");
	clearInterval($data._tTime);
	$data._tTime = addInterval(turnGoing, TICK);
	playBGM('jaqwi');
};
$lib.MathQuiz.turnGoing = function(){
	var $rtb = $stage.game.roundBar;
	var bRate;
	var tt;
	
	if(!$data.room) clearInterval($data._tTime);
	$data._roundTime -= TICK;
	
	tt = $data._spectate ? L['stat_spectate'] : ($data._roundTime*0.001).toFixed(1) + L['SECOND'];
	$rtb
		.width($data._roundTime/$data.room.time*0.1 + "%")
		.html(tt);
		
	if(!$rtb.hasClass("round-extreme")) if($data._roundTime <= $data._fastTime){
		bRate = $data.bgm.currentTime / $data.bgm.duration;
		if($data.bgm.paused) stopBGM();
		else playBGM('jaqwiF');
		$data.bgm.currentTime = $data.bgm.duration * bRate;
		$rtb.addClass("round-extreme");
	}
};
$lib.MathQuiz.turnHint = function(data){
	playSound('mission');
	pushHint(data.hint);
};
$lib.MathQuiz.turnEnd = function(id, data){
	var $sc = $("<div>").addClass("deltaScore").html("+" + data.score);
	var $uc = $("#game-user-" + id);
	$stage.game.wrong.hide();
	$stage.game.wrong.html("오답입니다!");
	if(data.giveup){
		$uc.addClass("game-user-bomb");
	}else if(data.answer){
		$stage.game.hereText.hide();
		if (!$stage.game.other.is(":visible")){ $stage.game.correct.show();
}
		$stage.game.display.html($("<label>").css('color', "#FFFF44").css('font-size', "").html(data.answer));
		stopBGM();
		playSound('horr');
	}else{
		// if(data.mean) turnHint(data);
		if(id == $data.id) $stage.game.hereText.hide();
		if (!$stage.game.other.is(":visible")){ $stage.game.wrong.show();
			$stage.game.wrong.html("서두르세요! 다른 사람이 이미 문제를 맞췄어요!");
			}
		addScore(id, data.score);
		if($data._roundTime > 10000) $data._roundTime = 10000;
		drawObtainedScore($uc, $sc);
		updateScore(id, getScore(id)).addClass("game-user-current");
		playSound('success');
	}
};