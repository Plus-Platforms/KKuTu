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

$(document).ready(function(){
	window.differ = new diff_match_patch()

	var i;
	
	$data.PUBLIC = $("#PUBLIC").html() == "true";
	$data.URL = $("#URL").html();
	$data.version = $("#version").html();
	$data.server = location.href.match(/\?.*server=(\d+)/)[1];
	$data.shop = {};
	$data._okg = 0;
	$data._playTime = 0;
	$data._kd = "";
	$data._timers = [];
	$data._obtain = [];
	$data._wblock = {};
	$data._shut = {};
	$data.usersR = {};
	EXP.push(getRequiredScore(1));
	for(i=2; i<MAX_LEVEL; i++){
		EXP.push(EXP[i-2] + getRequiredScore(i));
	}
	EXP[MAX_LEVEL - 1] = Infinity;
	EXP.push(Infinity);
	$stage = {
		loading: $("#Loading"),
		lobby: {
			userListTitle: $(".UserListBox .product-title"),
			userList: $(".UserListBox .product-body"),
			connList: $("#connList"),
			roomListTitle: $(".RoomListBox .product-title"),
			roomList: $(".RoomListBox .product-body"),
			createBanner: $("<div>").addClass("rooms-item rooms-create").append($("<div>").html("<i class='fa-solid fa-plus'></i>방 만들기")),
			singleBanner: $("<div>").addClass("rooms-item rooms-single").append($("<div>").html("<i class='fa-solid fa-user'></i>혼자서 놀기"))
		},
		chat: $("#Chat"),
		chatLog: $("#chat-log-board"),
		talk: $("#Talk"),
		chatBtn: $("#ChatBtn"),
		menu: {
			help: $("#HelpBtn"),
			coupon: $("#CouponBtn"),
			setting: $("#SettingBtn"),
			community: $("#CommunityBtn"),
			community2: $("#Community2Btn"),
			credit: $("#CreditBtn"),
			closeCredit: $("#creditpopup-close"),
			sideMenu: $("#SideMenuBtn"),
			sideMenuClose: $("#SideMenuCloseBtn"),
			newRoom: $("#NewRoomBtn"),
			setRoom: $("#SetRoomBtn"),
			quickRoom: $("#QuickRoomBtn"),
			spectate: $("#SpectateBtn"),
			shop: $("#ShopBtn"),
			dict: $("#DictionaryBtn"),
			event: $("#LvEventBtn"),
			donate: $("#DonationBtn"),
			dictIngame: $("#DictionaryBtnIngame"),
			wordPlus: $("#WordPlusBtn"),
			invite: $("#InviteBtn"),
			practice: $("#PracticeBtn"),
			ready: $("#ReadyBtn"),
			start: $("#StartBtn"),
			exit: $("#ExitBtn"),
			notice: $("#NoticeBtn"),
			replay: $("#ReplayBtn"),
			leaderboard: $("#LeaderboardBtn"),
			teamSelect: $("#TeamSelectBtn")
		},
		dialog: {
			setting: $("#SettingDiag"),
				settingServer: $("#setting-server"),
				settingOK: $("#setting-ok"),
			community: $("#CommunityDiag"),
				commFriends: $("#comm-friends"),
				commFriendAdd: $("#comm-friend-add"),
			credit: $("#CreditDiag"),
			event: $("#LvEventDiag"),
			donate: $("#DonateDiag"),
			room: $("#RoomDiag"),
				roomOK: $("#room-ok"),
			quick: $("#QuickDiag"),
				quickOK: $("#quick-ok"),
			result: $("#ResultDiag"),
				resultOK: $("#result-ok"),
				resultSave: $("#result-save"),
			practice: $("#PracticeDiag"),
				practiceOK: $("#practice-ok"),
			dict: $("#DictionaryDiag"),
				dictInjeong: $("#dict-injeong"),
				dictSearch: $("#dict-search"),
			wordPlus: $("#WordPlusDiag"),
				wordPlusOK: $("#wp-ok"),
			invite: $("#InviteDiag"),
				inviteList: $(".invite-board"),
				inviteRobot: $("#invite-robot"),
				inviteLink: $("#invite-link"),
			roomInfo: $("#RoomInfoDiag"),
				roomInfoJoin: $("#room-info-join"),
			profile: $("#ProfileDiag"),
				profileShut: $("#profile-shut"),
				profileHandover: $("#profile-handover"),
				profileKick: $("#profile-kick"),
				profileLevel: $("#profile-level"),
				profileDress: $("#profile-dress"),
				profileWhisper: $("#profile-whisper"),
			kickVote: $("#KickVoteDiag"),
				kickVoteY: $("#kick-vote-yes"),
				kickVoteN: $("#kick-vote-no"),
			purchase: $("#PurchaseDiag"),
				purchaseOK: $("#purchase-ok"),
				purchaseNO: $("#purchase-no"),
			replay: $("#ReplayDiag"),
				replayView: $("#replay-view"),
			leaderboard: $("#LeaderboardDiag"),
				lbTable: $("#ranking tbody"),
				lbPage: $("#lb-page"),
				lbNext: $("#lb-next"),
				lbMe: $("#lb-me"),
				lbPrev: $("#lb-prev"),
			dress: $("#DressDiag"),
			dressitem: $("#DressItemDiag"),
				dressOK: $("#dress-ok"),
			charFactory: $("#CharFactoryDiag"),
				cfCompose: $("#cf-compose"),
				cfReset: $("#cf-reset"),
			injPick: $("#InjPickDiag"),
				injPickAll: $("#injpick-all"),
				injPickNo: $("#injpick-no"),
				injPickOK: $("#injpick-ok"),
			chatLog: $("#ChatLogDiag"),
			obtain: $("#ObtainDiag"),
				obtainOK: $("#obtain-ok"),
			newbie: $("#NewbieDiag"),
				newbieOK: $("#setNickname"),
			help: $("#HelpDiag"),
			coupon: $("#CouponRegisterDiag"),
			pingShop: $("#PingShopDiag"),
			community2: $("#Community2Diag"),
			license: $("#LicenseDiag"),
			alert: $("#NotificationDiag"),
				alertOK: $("#alert-ok"),
			confirm: $("#ConfirmDiag"),
				confirmOK: $("#confirm-ok"),
				confirmCancel: $("#confirm-cancel"),
			teamSelect: $("#TeamSelectDiag"),
		},
		box: {
			chat: $(".ChatBox"),
			userList: $(".UserListBox"),
			roominfoList: $(".RoominfoListBox"),
			roomList: $(".RoomListBox"),
			shop: $(".ShopBox"),
			room: $(".RoomBox"),
			game: $(".GameBox"),
			me: $(".MeBox")
		},
		game: {
			display: $(".jjo-display"),
			hints: $(".GameBox .hints"),
			tools: $('.GameBox .tools'),
			drawingTitle: $('#drawing-title'),
			themeisTitle: $('#themeis-title'),
			cwcmd: $(".GameBox .cwcmd"),
			bb: $(".GameBox .bb"),
			items: $(".GameBox .items"),
			chain: $(".GameBox .chain"),
			round: $(".rounds"),
			here: $(".game-input"),
			hereText: $("#game-input"),
			correct: $("#game-correct"),
			wrong: $("#game-wrong"),
			other: $("#other-enter"),
			wrongText: $("#wrong-text"),
			correctText: $("#correct-text"),
			otherText: $("#other-text"),
			history: $(".history"),
			roundBar: $(".jjo-round-time .graph-bar"),
			turnBar: $(".jjo-turn-time .graph-bar")
		},
		yell: $("#Yell").hide(),
		balloons: $("#Balloons")
	};
	if(_WebSocket == undefined){
		loading(L['websocketUnsupport']);
		alert(L['websocketUnsupport']);
		return;
	}

	$data._soundList = [
		{ key: "k", value: "/media/kkutu/k.mp3" },
		{ key: "lobby", value: "/media/kkutu/LobbyBGMS2.mp3" },
		{ key: "dialog", value: "/media/kkutu/dialog.mp3" },
		{ key: "legacylobby", value: "/media/kkutu/LobbyBGM.mp3" },
		{ key: "ingame", value: "/media/kkutu/LobbyBGMS2.mp3" },
		{ key: "shop", value: "/media/kkutu/LobbySeolBGM.mp3" },
		{ key: "credit", value: "/media/kkutu/kkutuEnding.mp3" },
		{ key: "jaqwi", value: "/media/kkutu/JaqwiBGM.mp3" },
		{ key: "jaqwiF", value: "/media/kkutu/JaqwiFastBGM.mp3" },
		{ key: "game_start", value: "/media/kkutu/game_start.mp3" },
		{ key: "round_start", value: "/media/kkutu/round_start.mp3" },
		{ key: "fail", value: "/media/kkutu/fail.mp3" },
		{ key: "timeout", value: "/media/kkutu/timeout.mp3" },
		{ key: "lvup", value: "/media/kkutu/lvup.mp3" },
		{ key: "Al", value: "/media/kkutu/Al.mp3" },
		{ key: "success", value: "/media/kkutu/success.mp3" },
		{ key: "question", value: "/media/kkutu/question.mp3" },
		{ key: "missing", value: "/media/kkutu/missing.mp3" },
		{ key: "mission", value: "/media/kkutu/mission.mp3" },
		{ key: "kung", value: "/media/kkutu/kung.mp3" },
		{ key: "horr", value: "/media/kkutu/horr.mp3" },
	];
	for(i=0; i<=10; i++) $data._soundList.push(
		{ key: "T"+i, value: "/media/kkutu/T"+i+".mp3" },
		{ key: "K"+i, value: "/media/kkutu/K"+i+".mp3" },
		{ key: "As"+i, value: "/media/kkutu/As"+i+".mp3" }
	);

	const options = $.cookie('kks');
	if(options){
		var opts = JSON.parse(options);
		if (opts.bo && opts.bo != "" && opts.bo != "undefined") {
			$data._soundList[1].value = "/audioProxy?link="+encodeURI(opts.bo);
		}
		if (opts.io && opts.io != "" && opts.io != "undefined") {
			$('#Intro').css('background-image', 'url("' + opts.io + '")');
		}
	}

	

	loadSounds($data._soundList, function(){
		processShop(connect);
	});
	delete $data._soundList;
	
	MOREMI_PART = $("#MOREMI_PART").html().split(',');
	AVAIL_EQUIP = $("#AVAIL_EQUIP").html().split(',');
	RULE = JSON.parse($("#RULE").html());
	OPTIONS = JSON.parse($("#OPTIONS").html());
	MODE = Object.keys(RULE);
	mobile = $("#mobile").html() == "true";
	if(mobile) TICK = 200;
	$data._timePercent = false ? function(){
		return $data._turnTime / $data.turnTime * 100 + "%";
	} : function(){
		var pos = $data._turnSound.audio ? $data._turnSound.audio.currentTime : (audioContext.currentTime - $data._turnSound.startedAt);
		
		return (100 - pos/$data.turnTime*100000) + "%";
	};
	$data.setRoom = function(id, data){
		var isLobby = getOnly() == "for-lobby";
		
		if(data == null){
			delete $data.rooms[id];
			if(isLobby) $("#room-" + id).remove();
		}else{
			// $data.rooms[id] = data;
			if(isLobby && !$data.rooms[id]) $stage.lobby.roomList.append($("<div>").attr('id', "room-" + id));
			$data.rooms[id] = data;
			if(isLobby) $("#room-" + id).replaceWith(roomListBar(data));
		}
		// updateRoomList();
	};
	$data.setUser = function(id, data){
		var only = getOnly();
		var needed = only == "for-lobby" || only == "for-master";
		var $obj;
		
		if($data._replay){
			$rec.users[id] = data;
			return;
		}
		if(data == null){
			delete $data.users[id];
			if(needed) $("#users-item-" + id + ",#invite-item-" + id).remove();
		}else{
			if(needed && !$data.users[id]){
				$obj = userListBar(data, only == "for-master");
				
				if(only == "for-master") $stage.dialog.inviteList.append($obj);
				else $stage.lobby.connList.append($obj);
			}
			$data.users[id] = data;
			if(needed){
				if($obj) $("#" + $obj.attr('id')).replaceWith($obj);
				else $("#" + ((only == "for-lobby") ? "users-item-" : "invite-item") + id).replaceWith(userListBar(data, only == "for-master"));
			}
		}
	};

// 객체 설정
	/*addTimeout(function(){
		$("#intro-start").hide();
		$("#intro").show();
	}, 1400);*/

	$(document).on('paste', function(e){
		if($data.room) if($data.room.gaming){
			e.preventDefault();
			return false;
		}
	});
	$stage.talk.on('drop', function(e){
		if($data.room) if($data.room.gaming){
			e.preventDefault();
			return false;
		}
	});
	if(options){
		var opts = JSON.parse(options);
		$("#bgm-volume").val(opts.bv);
		$("#effect-volume").val(opts.ev);
		applyOptions(opts);
	}
	else{
		applyOptions({
			bv: $("#bgm-volume").val(),
			ev: $("#effect-volume").val(),
			bo: encodeURI($("#bgm-override").val()).replace(";", ''),
			io: encodeURI($("#img-override").val()).replace(";", ''),
			di: $("#deny-invite").is(":checked"),
			dw: $("#deny-whisper").is(":checked"),
			df: $("#deny-friend").is(":checked"),
			ar: $("#auto-ready").is(":checked"),
			su: $("#sort-user").is(":checked"),
			ow: $("#only-waiting").is(":checked"),
			ou: $("#only-unlock").is(":checked"),
			cp: $("#copyright-hide").is(":checked"),
			vp: $("#lower-vibration").is(":checked")
		});
	
	
		$.cookie('kks', JSON.stringify($data.opts));
	}

		$('.dialog-head, .dialog-title').mousedown(function(e) {
		  var $dialog = $(this).closest('.dialog');
		  var offsetX = e.clientX - $dialog.offset().left;
		  var offsetY = e.clientY - $dialog.offset().top;
		  $(".dialog-front").removeClass("dialog-front");
		  $dialog.addClass("dialog-front");
		  $(document).mousemove(function(e) {
			var x = e.clientX - offsetX;
			var y = e.clientY - offsetY;
	  
			$dialog.css({ 'left': x, 'top': y });
		  });
	  
		  $(document).mouseup(function() {
			$(document).off('mousemove');
			$(document).off('mouseup');
		  });
		});
	// addInterval(checkInput, 1);
	$stage.chatBtn.on('click', function(e){
		checkInput();
		
		var value = (mobile && $stage.game.hereText.is(':visible'))
			? $stage.game.hereText.val()
			: $stage.talk.val();
		if(!value) return;
		var o = { value: value.trim() };
		if(o.value[0] == "/"){
			o.cmd = o.value.split(" ");
			runCommand(o.cmd);
		}else{
			if($stage.game.hereText.is(":visible") || $data._relay){
				o.relay = true;
			}
			send('talk', o);
		}
		if($data._whisper){
			$stage.talk.val("/e " + $data._whisper + " ");
			delete $data._whisper;
		}else{
			$stage.talk.val("");
		}
		$stage.game.hereText.val("");
	}).hotkey($stage.talk, 13).hotkey($stage.game.hereText, 13);


	$(document).keydown(function(e) {
		// 만약 눌린 키가 Ctrl 키인 경우
		if(e.keyCode == 13){
		if(!$("#Talk").is(":focus")) {
			$("#Talk").focus();
        }
		}
		else if (e.keyCode === 27) {
			$("#Talk").blur();
		}
	});
	
	$("#cw-q-input").on('keydown', function(e){
		if(e.keyCode == 13){
			var $target = $(e.currentTarget);
			var value = $target.val();
			var o = { relay: true, data: $data._sel, value: value };
			
			if(!value) return;
			send('talk', o);
			$target.val("");
		}
	}).on('focusout', function(e){
		$(".cw-q-body").empty();
		$stage.game.cwcmd.css('opacity', 0);
	});
	$("#room-limit").on('change', function(e){
		var $target = $(e.currentTarget);
		var value = $target.val();
		
		if(value < 2 || value > 25){
			$target.css('color', "#FF4444");
		}else{
			$target.css('color', "");
		}
	});
	$("#room-round").on('change', function(e){
		var $target = $(e.currentTarget);
		var value = $target.val();
		
		if(value < 1 || value > 25){
			$target.css('color', "#FF4444");
		}else{
			$target.css('color', "");
		}
	});
	$stage.game.hereText.on('click', function(e){
		mobile || $stage.talk.focus();
	});
	$stage.talk.on('keyup', function(e){
		$stage.game.hereText.val($stage.talk.val());
	});
	$(window).on('beforeunload', function(e){
		if($data.room) return L['sureExit'];
	});

	function startDrag($diag, sx, sy){
		var pos = $diag.position();
		$(window).on('mousemove', function(e){
			var dx = e.pageX - sx, dy = e.pageY - sy;
			
			$diag.css('left', pos.left + dx);
			$diag.css('top', pos.top + dy);
		}).one('mouseup', function(){
			$(window).off('mousemove');
		});
	}
	
	$(".result-me-gauge .graph-bar").addClass("result-me-before-bar");
	$(".result-me-gauge")
		.append($("<div>").addClass("graph-bar result-me-current-bar"))
		.append($("<div>").addClass("graph-bar result-me-bonus-bar"));
	
	// 메뉴 버튼
	for (i in $stage.dialog) {
		if ($stage.dialog[i].children(".dialog-head").hasClass("no-close")) continue;
	
		$stage.dialog[i].children(".dialog-head").append($("<div>").addClass("closeBtn").on('click', function (e) {
			var $dialog = $(e.currentTarget).parent().parent();
			$('#dimmer').fadeOut();
			// Add the opposite effect class
			$dialog.addClass("closing-effect");
			// Set a timeout to hide the dialog after the animation completes
			setTimeout(function () {
				$dialog.hide().removeClass("closing-effect");
			}, 200); // Adjust the time based on your animation duration
		}).hotkey(false, 27));
	}
	




	var tostMessage = document.getElementById('tost_message');

	function tostOn(){
		tostMessage.classList.remove('hidden');
		tostMessage.classList.add('active');
		setTimeout(function(){
			tostMessage.classList.remove('active');
			setTimeout(function(){tostMessage.classList.add('hidden');}, 500);
		}, 3000);
	}

   
	window.alert = function (message1) {
			tostOn();
			console.log(message1);
			$('#tost_message').text(message1);
	};
	
	checkResolution();

	//window.addEventListener('resize', checkResolution);
	
	function checkResolution() {
			var screenWidth = window.innerWidth;
			var screenHeight = window.innerHeight;
			var thresholdWidth = 1600;
			var thresholdHeight = 900;
	
			if (screenWidth < thresholdWidth || screenHeight < thresholdHeight) {
				try{
					document.getElementById('dimmer').style.display = 'none';
					document.getElementById('Community2Diag').style.display = 'none';
					document.getElementById('Community2Btn').style.display = 'none';
				}
				catch(err){
				}
				alert('화면 해상도가 1600x900 미만입니다.\n정상적인 게임 플레이가 어려울 수 있으므로 외부 디스플레이를 연결하거나 전체화면 (F11)으로 게임을 플레이해주세요.');
			}
	}
 

 

	$stage.menu.help.on('click', function(e){
		$('#sideMenuDiag').fadeOut();
		$("#help-board").attr('src', "https://pcor.me/kkutu/help");
		showDialog($stage.dialog.help);
	});
	$stage.menu.coupon.on('click', function(e){
		$('#sideMenuDiag').fadeOut();
		$("#coupon-board").attr('src', "https://pcor.me/kkutu/coupon");
		showDialog($stage.dialog.coupon);
	});
	$stage.menu.community2.on('click', function(e){
		$('#sideMenuDiag').fadeOut();
		$("#community2").attr('src', "https://pcor.me/plKkkutuCafe");
		$('#dimmer').fadeIn();
		showDialog($stage.dialog.community2);
	});
	$stage.menu.sideMenu.on('click', function(e){
		$('#dimmer').fadeIn();
		$('#sideMenuDiag').fadeIn().css('left', '100%').animate({
			'left': $(window).width() - 740 // Adjust 740 as per your requirement
		}, 200);
	});
	
	$stage.menu.credit.on('click', function(e){
		$('#sideMenuDiag').fadeOut();
		$('#dimmer').fadeOut();
		$('#creditpopup').fadeIn(3000);
		stopBGM();
		playBGM("credit");
		$('#creditpopup-content').addClass('animating-credit');
	});
	$stage.menu.closeCredit.on('click', function(e){
		$('#creditpopup').fadeOut(3000);
		stopBGM();
		playBGM("lobby");
	});

	$stage.menu.donate.on('click', function(e){
		showDialog($stage.dialog.donate);
	});
	$stage.menu.teamSelect.on('click', function(e){
		showDialog($stage.dialog.teamSelect);
	});
	$stage.menu.sideMenuClose.on('click', function(e){
		$('#dimmer').fadeOut();
		$('#sideMenuDiag').fadeOut();
	});
	$stage.menu.setting.on('click', function(e){
		$('#sideMenuDiag').fadeOut();
		showDialog($stage.dialog.setting);
	});
	$stage.menu.community.on('click', function(e){
		if($data.guest) return fail(451);
		showDialog($stage.dialog.community);
	});
	$stage.dialog.commFriendAdd.on('click', function(e){
		var id = prompt(L['friendAddNotice']);
		
		if(!id) return;
		if(!$data.users[id]) return fail(450);
		
		send('friendAdd', { target: id }, true);
	});
	$stage.menu.newRoom.on('click', function(e){
		var $d;
	
		$stage.dialog.quick.hide();
	
		// 무작위 방 제목을 선택하기 위한 배열
		var roomTitles = [
			'기체크로마토질량분석법',
			'즐거운 끝말잇기~!',
			'PLUS KKUTU',
			'레디 누르세요!!!',
			'들어오세요~ 즐겜해요~',
			'매칭 그만돌려라',
			'키보드 부서질라 고만 눌러라',
			'신나는 플러스끄투!',
			'오늘도 플끄 내일도 플끄',
			'오끄감 채우는 방'
		];
	
		// 무작위 방 제목 선택
		var randomTitle = roomTitles[Math.floor(Math.random() * roomTitles.length)];
	
		//$("#room-title").val(randomTitle);
		$data.typeRoom = 'enter';
		showDialog($d = $stage.dialog.room);
		$d.find(".dialog-title").html(L['newRoom']);
	});
	
	$stage.menu.setRoom.on('click', function(e){
		var $d;
		var rule = RULE[MODE[$data.room.mode]];
		var i, k;
		
		$data.typeRoom = 'setRoom';
		$("#room-title").val($data.room.title);
		$("#room-limit").val($data.room.limit);
		$("#room-mode").val($data.room.mode).trigger('change');
		$("#room-round").val($data.room.round);
		$("#room-time").val($data.room.time / rule.time);
		for(i in OPTIONS){
			k = OPTIONS[i].name.toLowerCase();
			$("#room-" + k).attr('checked', $data.room.opts[k]);
		}
		$data._injpick = $data.room.opts.injpick;
		showDialog($d = $stage.dialog.room);
		$d.find(".dialog-title").html("방 설정하기");
	});
	function updateGameOptions(opts, prefix){
		var i, k;
		
		for(i in OPTIONS){
			k = OPTIONS[i].name.toLowerCase();
			if(opts.indexOf(i) == -1) $("#" + prefix + "-" + k + "-panel").hide();
			else $("#" + prefix + "-" + k + "-panel").show();
		}
	}
	function getGameOptions(prefix){
		var i, name, opts = {};
		
		for(i in OPTIONS){
			name = OPTIONS[i].name.toLowerCase();
			
			if($("#" + prefix + "-" + name).is(':checked')) opts[name] = true;
		}
		return opts;
	}
	function isRoomMatched(room, mode, opts, all){
		var i;
		
		if(!all){
			if(room.gaming) return false;
			if(room.password) return false;
			if(room.players.length >= room.limit) return false;
		}
		if(room.mode != mode) return false;
		for(i in opts) if(!room.opts[i]) return false;
		return true;
	}
	$("#quick-mode, #QuickDiag .game-option").on('change', function(e){
		var val = $("#quick-mode").val();
		var ct = 0;
		var i, opts;
		
		if(e.currentTarget.id == "quick-mode"){
			$("#QuickDiag .game-option").prop('checked', false);
		}
		opts = getGameOptions('quick');
		updateGameOptions(RULE[MODE[val]].opts, 'quick');
		for(i in $data.rooms){
			if(isRoomMatched($data.rooms[i], val, opts, true)) ct++;
		}
		$("#quick-status").html(L['quickStatus'] + " " + ct);
	});
	$stage.menu.quickRoom.on('click', function(e){
		$stage.dialog.room.hide();
		showDialog($stage.dialog.quick);
		if($stage.dialog.quick.is(':visible')){
			$("#QuickDiag>.dialog-body").find("*").prop('disabled', false);
			$("#quick-mode").trigger('change');
			$("#quick-queue").html("");
			$stage.dialog.quickOK.removeClass("searching").html(L['OK']);
		}
	});
	$stage.dialog.quickOK.on('click', function(e){
		var mode = $("#quick-mode").val();
		var opts = getGameOptions('quick');
		
		if(getOnly() != "for-lobby") return;
		if($stage.dialog.quickOK.hasClass("searching")){
			$stage.dialog.quick.hide();
			quickTick();
			$stage.menu.quickRoom.trigger('click');
			return;
		}
		$("#QuickDiag>.dialog-body").find("*").prop('disabled', true);
		$stage.dialog.quickOK.addClass("searching").html("<i class='fa fa-spinner fa-spin'></i> " + L['NO']).prop('disabled', false);
		$data._quickn = 0;
		$data._quickT = addInterval(quickTick, 1000);
		function quickTick(){
			var i, arr = [];
			
			if(!$stage.dialog.quick.is(':visible')){
				clearTimeout($data._quickT);
				return;
			}
			$("#quick-queue").html(L['quickQueue'] + " " + prettyTime($data._quickn++ * 1000));
			for(i in $data.rooms){
				if(isRoomMatched($data.rooms[i], mode, opts)) arr.push(i);
			}
			if(arr.length){
				i = arr[Math.floor(Math.random() * arr.length)];
				$data._preQuick = true;
				$("#room-" + i).trigger('click');
			}
		}
	});
	$("#room-mode").on('change', function(e){
		var v = $("#room-mode").val();
		var rule = RULE[MODE[v]];
		$("#game-mode-expl").html(L['modex' + v]);

		updateGameOptions(rule.opts, 'room');
		
		$data._injpick = [];
		if(rule.opts.indexOf("ijp") != -1) $("#room-injpick-panel").show();
		else $("#room-injpick-panel").hide();
		if(rule.rule == "Typing") $("#room-round").val(3);
		$("#room-time").children("option").each(function(i, o){
			$(o).html(Number($(o).val()) * rule.time + L['SECOND']);
		});
	}).trigger('change');
	$stage.menu.spectate.on('click', function(e){
		var mode = $stage.menu.spectate.hasClass("toggled");
		
		if(mode){
			send('form', { mode: "J" });
			$stage.menu.spectate.removeClass("toggled");
		}else{
			send('form', { mode: "S" });
			$stage.menu.spectate.addClass("toggled");
		}
	});
	$stage.menu.shop.on('click', function(e){
		if($data._shop = !$data._shop){
			loadShop();
			$stage.menu.shop.addClass("toggled");
		}else{
			$stage.menu.shop.removeClass("toggled");
		}
		updateUI();
	});
	$(".shop-type").on('click', function(e){
		var $target = $(e.currentTarget);
		var type = $target.attr('id').slice(10);
		
		$(".shop-type.selected").removeClass("selected");
		$target.addClass("selected");
		
		filterShop(type == 'all' || $target.attr('value'));
	});
	$stage.menu.dict.on('click', function(e){
		showDialog($stage.dialog.dict);
	});
	$stage.menu.event.on('click', function(e){
		showDialog($stage.dialog.event);
	});
	$stage.menu.dictIngame.on('click', function(e){
		showDialog($stage.dialog.dict);
	});
	$stage.menu.wordPlus.on('click', function(e){
		showDialog($stage.dialog.wordPlus);
	});
	$stage.menu.invite.on('click', function(e){
		showDialog($stage.dialog.invite);
		updateUserList(true);
	});
	$stage.menu.practice.on('click', function(e){
		if(RULE[MODE[$data.room.mode]].ai){
			$("#PracticeDiag .dialog-title").html(L['stat_practice']);
			$("#ai-team").val(0).prop('disabled', true);
			showDialog($stage.dialog.practice);
		}else{
			send('practice', { level: -1 });
		}
	});
	$stage.menu.ready.on('click', function(e){
		send('ready');
	});
	$stage.menu.start.on('click', function(e){
		send('start');
	});
	$stage.menu.exit.on('click', function(e){
		if($data.room.gaming){
			if(!confirm(L['sureExit'])) return;
			clearGame();
		}
		send('leave');
	});
	$stage.menu.replay.on('click', function(e){
		if($data._replay){
			replayStop();
		}
		showDialog($stage.dialog.replay);
		initReplayDialog();
		if($stage.dialog.replay.is(':visible')){
			$("#replay-file").trigger('change');
		}
	});
	$stage.menu.leaderboard.on('click', function(e){
		$data._lbpage = 0;
		if($stage.dialog.leaderboard.is(":visible")){
			$stage.dialog.leaderboard.hide();
		}else $.get("/ranking", function(res){
			drawLeaderboard(res);
			showDialog($stage.dialog.leaderboard);
		});
	});
	$stage.dialog.lbPrev.on('click', function(e){
		$(e.currentTarget).attr('disabled', true);
		$.get("/ranking?p=" + ($data._lbpage - 1), function(res){
			drawLeaderboard(res);
		});
	});
	$stage.dialog.lbMe.on('click', function(e){
		$(e.currentTarget).attr('disabled', true);
		$.get("/ranking?id=" + $data.id, function(res){
			drawLeaderboard(res);
		});
	});
	$stage.dialog.lbNext.on('click', function(e){
		$(e.currentTarget).attr('disabled', true);
		$.get("/ranking?p=" + ($data._lbpage + 1), function(res){
			drawLeaderboard(res);
		});
	});
	$stage.dialog.settingServer.on('click', function(e){
		location.href = "/";
	});
	$stage.dialog.settingOK.on('click', function(e){
		applyOptions({
			bv: $("#bgm-volume").val(),
			ev: $("#effect-volume").val(),
			bo: encodeURI($("#bgm-override").val()).replace(";", ''),
			io: encodeURI($("#img-override").val()).replace(";", ''),
			di: $("#deny-invite").is(":checked"),
			dw: $("#deny-whisper").is(":checked"),
			df: $("#deny-friend").is(":checked"),
			ar: $("#auto-ready").is(":checked"),
			su: $("#sort-user").is(":checked"),
			ow: $("#only-waiting").is(":checked"),
			ou: $("#only-unlock").is(":checked"),
			cp: $("#copyright-hide").is(":checked"),
			vp: $("#lower-vibration").is(":checked")
		});
	
	
		// $.cookie() 함수에 expires 옵션을 추가하여 쿠키의 저장 기한을 1년으로 설정
		$.cookie('kks', JSON.stringify($data.opts));
	
		$stage.dialog.setting.hide();
		$('#dimmer').fadeOut();
	});
	
	$stage.dialog.profileLevel.on('click', function(e){
		$("#PracticeDiag .dialog-title").html(L['robot']);
		$("#ai-team").prop('disabled', false);
		showDialog($stage.dialog.practice);
	});
	$stage.dialog.practiceOK.on('click', function(e){
		var level = $("#practice-level").val();
		var team = $("#ai-team").val();
		
		$stage.dialog.practice.hide();
		$('#dimmer').fadeOut();

		if($("#PracticeDiag .dialog-title").html() == L['robot']){
			send('setAI', { target: $data._profiled, level: level, team: team });
		}else{
			send('practice', { level: level });
		}
	});
	$stage.dialog.roomOK.on('click', function(e){
		var i, k, opts = {
			injpick: $data._injpick
		};
		for(i in OPTIONS){
			k = OPTIONS[i].name.toLowerCase();
			opts[k] = $("#room-" + k).is(':checked');
		}
		send($data.typeRoom, {
			title: $("#room-title").val().trim() || $("#room-title").attr('placeholder').trim(),
			password: $("#room-pw").val(),
			limit: $("#room-limit").val(),
			mode: $("#room-mode").val(),
			round: $("#room-round").val(),
			time: $("#room-time").val(),
			opts: opts,
		});
		$stage.dialog.room.hide();
	});
	$stage.dialog.resultOK.on('click', function(e){
		if($data._resultPage == 1 && $data._resultRank){
			drawRanking($data._resultRank[$data.id]);
			return;
		}
		if($data.practicing){
			$data.room.gaming = true;
			send('leave');
		}
		$data.resulting = false;
		$stage.dialog.result.hide();
		delete $data._replay;
		delete $data._resultRank;
		$stage.box.room.height(680);
		playBGM('lobby');
		forkChat();
		updateUI();
	});
	$stage.dialog.resultSave.on('click', function(e){
		var date = new Date($rec.time);
		var jsonData = JSON.stringify($rec);
	
		var encryptedData = CryptoJS.AES.encrypt(jsonData, '3GDRwHFgxUvcSvZ49RMXN3GUXsp5amPH').toString();
	
		var blob = new Blob([ encryptedData ], { type: "text/plain" });
		var url = URL.createObjectURL(blob);
		var fileName = "PlusKKuTu_" + (
			date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate() + "_"
			+ date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds()
		) + ".replay";
		var $a = $("<a>").attr({
			'download': fileName,
			'href': url
		}).on('click', function(e){
			$a.remove();
		});
		$("#Jungle").append($a);
		$a[0].click();
	});
	
	/*
	$stage.dialog.dictInjeong.on('click', function(e){
		var $target = $(e.currentTarget);
		
		if($target.is(':disabled')) return;
		if(!$("#dict-theme").val()) return;
		$target.prop('disabled', true);
		$("#dict-output").html(L['searching']);
		$.get("/injeong/" + $("#dict-input").val() + "?theme=" + $("#dict-theme").val(), function(res){
			addTimeout(function(){
				$target.prop('disabled', false);
			}, 2000);
			if(res.error) return $("#dict-output").html(res.error + ": " + L['wpFail_' + res.error]);
			
			$("#dict-output").html(L['wpSuccess'] + "(" + res.message + ")");
		});
	});*/
	$stage.dialog.dictSearch.on('click', function(e){
		var $target = $(e.currentTarget);
		
		if($target.is(':disabled')) return;
		$target.prop('disabled', true);
		$("#dict-output").html(L['searching']);
		tryDict($("#dict-input").val(), function(res){
			addTimeout(function(){
				$target.prop('disabled', false);
			}, 500);
			if(res.error) return $("#dict-output").html(res.error + ": " + L['wpFail_' + res.error]);
			
			$("#dict-output").html(processWord(res.word, res.mean, res.theme, res.type.split(','), "dictionary"));
		});
	}).hotkey($("#dict-input"), 13);
	$stage.dialog.wordPlusOK.on('click', function(e){
		var t;
		if($stage.dialog.wordPlusOK.hasClass("searching")) return;
		if(!(t = $("#wp-input").val())) return;
		t = t.replace(/[^a-z가-힣]/g, "");
		if(t.length < 2) return;
		
		$("#wp-input").val("");
		$(e.currentTarget).addClass("searching").html("<i class='fa fa-spin fa-spinner'></i>");
		send('wp', { value: t });
	}).hotkey($("#wp-input"), 13);
	$stage.dialog.inviteRobot.on('click', function(e){
		requestInvite("AI");
	});
	$stage.dialog.inviteLink.on('click', function(e){
		  var copyText = "플러스끄투에서 신나는 끄투 한판! 지금 같이 한 판 해요~ \n "+window.location;
		  navigator.clipboard.writeText(copyText);
		  alert("초대링크가 복사되었습니다. 원하는 곳에 붙여넣으세요!");
	});
	$stage.dialog.roomInfoJoin.on('click', function(e){
		$stage.dialog.roomInfo.hide();
		tryJoin($data._roominfo);
	});
	$stage.dialog.profileHandover.on('click', function(e){
		if(!confirm(L['sureHandover'])) return;
		send('handover', { target: $data._profiled });
	});
	$stage.dialog.profileKick.on('click', function(e){
		send('kick', { robot: $data.robots.hasOwnProperty($data._profiled), target: $data._profiled });
	});
	$stage.dialog.profileShut.on('click', function(e){
		var o = $data.users[$data._profiled];
		
		if(!o) return;
		toggleShutBlock(o.profile.title || o.profile.name);
	});
	$stage.dialog.profileWhisper.on('click', function(e){
		var o = $data.users[$data._profiled];
		
		$stage.talk.val("/e " + (o.profile.title || o.profile.name).replace(/\s/g, "") + " ").focus();
	});
	$stage.dialog.profileDress.on('click', function(e){
		// alert(L['error_555']);
		if($data.guest) return fail(421);
		if($data._gaming) return fail(438);
		if(showDialog($stage.dialog.dress)) $.get("/box", function(res){
			$('#dimmer').fadeIn();
			if(res.error) return fail(res.error);
			
			$data.box = res;
			drawMyDress();
		});
	});
	$stage.dialog.dressOK.on('click', function(e){
		var data = {};
		$(e.currentTarget).attr('disabled', true);

		if($("#dress-nickname").val() != $data.nickname) data.nickname = $("#dress-nickname").val();
		if($("#dress-exordial").val() != $data.exordial || ($("#dress-exordial").val() === "" && $data.exordial !== "")) data.exordial = $("#dress-exordial").val();

		var message = "";

		if(data.nickname && data.exordial){
			message = "닉네임과 소개를 변경하시겠어요? 1주일 내에는 닉네임을 변경할 수 없으며, 변경된 닉네임은 새로고침 후 반영돼요.";
		}
		else if (data.exordial){
			message = "소개를 변경하시겠어요?";
		}
		else if (data.nickname){
			message = "닉네임을 변경하시겠어요? 1주일 내에는 닉네임을 변경할 수 없으며, 변경된 닉네임은 새로고침 후 반영돼요.";
		}
		else {
			message = "프로필을 변경하시겠어요?";
		}
		if(confirm(message)){
			$.post("/profile", data, function(res){
			$stage.dialog.dressOK.attr('disabled', false);
			if(res.error) return fail(res.error);
			if(data.nickname) $data.users[$data.id].nickname = $data.nickname = data.nickname;
			if(data.exordial || data.exordial === "") $data.users[$data.id].exordial = $data.exordial = data.exordial;
			
			if (!data.nickname && !data.exordial){
				message = "수정되었습니다.";
			}
			else if (data.nickname) {
				if (data.exordial || data.exordial === "") {
					message = L.nickChanged + data.nickname + L.changed + " " + L.exorChanged + data.exordial + L.changed;
				} else {
					message = L.nickChanged + data.nickname + L.changed;
				}
			} else {
				message = L.exorChanged + data.exordial + L.changed;
			}
			alert(message);
			updateUserList(true);
			$stage.dialog.dress.hide();
		});}
		});
	$("#DressItemDiag .dress-type").on('click', function(e){
		var $target = $(e.currentTarget);
		var type = $target.attr('id').slice(11);
		
		$(".dress-type.selected").removeClass("selected");
		$target.addClass("selected");
		
		drawMyGoods(type == 'all' || $target.attr('value'));
	});
	$("#dressitembtn").on('click', function(e){
		showDialog($stage.dialog.dressitem);
	});
	$("#infobtn").on('click', function(e){
		requestProfile($data.id);
	});
	$("#dress-cf").on('click', function(e){
		if($data._gaming) return fail(438);
		if(showDialog($stage.dialog.charFactory)) drawCharFactory();
	});
	$stage.dialog.cfCompose.on('click', function(e){
		if(!$stage.dialog.cfCompose.hasClass("cf-composable")) return fail(436);
		if(!confirm(L['cfSureCompose'])) return;
		
		$.post("/cf", { tray: $data._tray.join('|') }, function(res){
			var i;
			
			if(res.error) return fail(res.error);
			send('refresh');
			alert(L['cfComposed']);
			$data.users[$data.id].money = res.money;
			$data.box = res.box;
			for(i in res.gain) queueObtain(res.gain[i]);
			
			drawMyDress($data._avGroup);
			updateMe();
			drawCharFactory();
		});
	});
	$("#room-injeong-pick").on('click', function(e){
		var rule = RULE[MODE[$("#room-mode").val()]];
		var i;
		
		$("#injpick-list>div").hide();
		if(rule.lang == "ko"){
			$data._ijkey = "#ko-pick-";
			$("#ko-pick-list").show();
		}else if(rule.lang == "en"){
			$data._ijkey = "#en-pick-";
			$("#en-pick-list").show();
		}
		$stage.dialog.injPickNo.trigger('click');
		for(i in $data._injpick){
			$($data._ijkey + $data._injpick[i]).prop('checked', true);
		}
		showDialog($stage.dialog.injPick);
	});

	$('.ko-pick').click(function() {
        $(this).find('input[type="checkbox"]').prop('checked', function(_, oldProp) {
            return !oldProp;
        });
    });
	$stage.dialog.injPickAll.on('click', function(e){
		$("#injpick-list input").prop('checked', true);
	});
	$stage.dialog.injPickNo.on('click', function(e){
		$("#injpick-list input").prop('checked', false);
	});
	$stage.dialog.injPickOK.on('click', function(e){
		var $target = $($data._ijkey + "list");
		var list = [];
		
		$data._injpick = $target.find("input").each(function(i, o){
			var $o = $(o);
			var id = $o.attr('id').slice(8);
			
			if($o.is(':checked')) list.push(id);
		});
		$data._injpick = list;
		$stage.dialog.injPick.hide();
	});
	$stage.dialog.kickVoteY.on('click', function(e){
		send('kickVote', { agree: true });
		clearTimeout($data._kickTimer);
		$stage.dialog.kickVote.hide();
	});
	$stage.dialog.kickVoteN.on('click', function(e){
		send('kickVote', { agree: false });
		clearTimeout($data._kickTimer);
		$stage.dialog.kickVote.hide();
	});
	$stage.dialog.purchaseOK.on('click', function(e){
		$.post("/buy/" + $data._sgood, function(res){
			var my = $data.users[$data.id];
			
			if(res.error) return fail(res.error);
			alert(L['purchased']);
			my.money = res.money;
			my.box = res.box;
			updateMe();
		});
		$stage.dialog.purchase.hide();
	});
	$stage.dialog.purchaseNO.on('click', function(e){
		$stage.dialog.purchase.hide();
	});
	$stage.dialog.obtainOK.on('click', function(e){
		var obj = $data._obtain.shift();
		
		if(obj) drawObtain(obj);
		else $stage.dialog.obtain.hide();

		$('#dimmer').fadeOut();
	});

	$stage.dialog.alertOK.on('click', function(e){
		$stage.dialog.alert.hide();
		$('#dimmer').fadeOut();
	});

	$stage.dialog.confirmOK.on('click', function(e){
		$stage.dialog.confirm.hide();
	});
	$stage.dialog.confirmCancel.on('click', function(e){
		$stage.dialog.confirm.hide();
	});
	
	$stage.dialog.newbieOK.on('click', function(e){
		$stage.dialog.newbie.hide();
		$.get("/box", function(res){
			$('#dimmer').fadeIn();
			if(res.error) return fail(res.error);
			
			$data.box = res;
			drawMyDress();
		});
		showDialog($stage.dialog.dressitem);
	});
	
	for(i=0; i<5; i++) $("#team-" + i).on('click', onTeam);
	function onTeam(e){
		if($(".team-selector").hasClass("team-unable")) return;
		
		send('team', { value: $(e.currentTarget).attr('id').slice(5) });
	}
// 리플레이
	function initReplayDialog(){
		$stage.dialog.replayView.attr('disabled', true);
	}

	$("#replay-file").on('change', function(e){
		var file = e.target.files[0];
		var reader = new FileReader();
		var $date = $("#replay-date").html("-");
		var $version = $("#replay-version").html("-");
		var $players = $("#replay-players").html("-");
	
		$rec = false;
		$stage.dialog.replayView.attr('disabled', true);
		if(!file) return;
		
		// Check if the file extension is .replay or .kkt
		var fileName = file.name;
		var isEncrypted = fileName.endsWith('.replay');
	
		// Read file as text
		reader.readAsText(file);
		
		reader.onload = function(e){
			var decryptedData;
			try {
				var fileContents = e.target.result;
	
				if (isEncrypted) {
					// Decrypt the data using CryptoJS
					decryptedData = CryptoJS.AES.decrypt(fileContents, '3GDRwHFgxUvcSvZ49RMXN3GUXsp5amPH').toString(CryptoJS.enc.Utf8);
				} else {
					// No need for decryption, use the file content directly
					decryptedData = fileContents;
				}
				
				// Parse decrypted JSON data
				var data = JSON.parse(decryptedData);
	
				$date.html((new Date(data.time)).toLocaleString());
				$version.html(data.version);
				$players.empty();
				
				for(var i in data.players){
					var u = data.players[i];
					var $p;
	
					$players.append($p = $("<div>").addClass("replay-player-bar ellipse")
						.text(u.title)
						.prepend(getLevelImage(u.data.score).addClass("users-level"))
					);
					if(u.id == data.me) $p.css('font-weight', "bold");
				}
				$rec = data;
				$stage.dialog.replayView.attr('disabled', false);
			} catch(ex) {
				console.warn(ex);
				alert(L['replayError']);
			}
		};
	});
	
	
	$stage.dialog.replayView.on('click', function(e){
		replayReady();
	});
	
// 스팸
	addInterval(function(){
		if(spamCount > 0) spamCount = 0;
		else if(spamWarning > 0) spamWarning -= 0.03;
	}, 1000);

// 웹소켓 연결
	function connect(){
		ws = new _WebSocket($data.URL);
		ws.onopen = function(e){
			loading();
			/*if($data.PUBLIC && mobile) $("#ad").append($("<ins>").addClass("daum_ddn_area")
				.css({ 'display': "none", 'margin-top': "10px", 'width': "100%" })
				.attr({
					'data-ad-unit': "DAN-1ib8r0w35a0qb",
					'data-ad-media': "4I8",
					'data-ad-pubuser': "3iI",
					'data-ad-type': "A",
					'data-ad-width': "320",
					'data-ad-height': "100"
				})
			).append($("<script>")
				.attr({
					'type': "text/javascript",
					'src': "//t1.daumcdn.net/adfit/static/ad.min.js"
				})
			);*/
		};
		ws.onmessage = _onMessage = function(e){
			onMessage(JSON.parse(e.data));
		};
		ws.onclose = function(e){
			var ct = L['closed'] + " (#" + e.code + ")";
			
			if(rws) rws.close();
			stopAllSounds();
			alert(ct);
			$.get("/kkutu_notice.html", function(res){
				loading(res);
			});
		};
		ws.onerror = function(e){
			console.warn(L['error'], e);
		};
	}
});
