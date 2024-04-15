
  // 쿠키 저장 함수
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // 쿠키 불러오기 함수
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // 페이지 로드 시 쿠키에서 폰트 설정 불러오기
  window.onload = function() {
    var selectedFont = getCookie("selectedFont");
    if (selectedFont) {
      document.body.style.fontFamily = selectedFont;
      document.getElementById("fontSelect").value = selectedFont;
    }

    //팝업을 닫은 날짜가 20240414 이전이면 팝업 띄우기
    var evtpopup = getCookie("evtpopup");
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var todayStr = year + "" + (month < 10 ? "0" + month : month) + "" + (day < 10 ? "0" + day : day);
    if (!evtpopup || evtpopup < "20240414") {
      document.getElementById("evtpopup").style.display = "flex";
    }
  };

  // 폰트 변경 버튼 클릭 시 이벤트 핸들러
  document.getElementById("setting-ok").addEventListener("click", function() {
    var selectedFont = document.getElementById("fontSelect").value;
    document.body.style.fontFamily = selectedFont;
    setCookie("selectedFont", selectedFont, 30); // 쿠키에 폰트 저장 (30일 유지)
  });

  document.getElementById("evtpopup-ok").addEventListener("click", function() {
    //팝업을 닫은 날짜 YYYYMMDD 형식으로 저장
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var todayStr = year + "" + (month < 10 ? "0" + month : month) + "" + (day < 10 ? "0" + day : day);
    setCookie("evtpopup", todayStr, 30);
    document.getElementById("evtpopup").style.display = "none";
  });