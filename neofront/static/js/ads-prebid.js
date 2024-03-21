
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
  };

  // 폰트 변경 버튼 클릭 시 이벤트 핸들러
  document.getElementById("setting-ok").addEventListener("click", function() {
    var selectedFont = document.getElementById("fontSelect").value;
    document.body.style.fontFamily = selectedFont;
    setCookie("selectedFont", selectedFont, 30); // 쿠키에 폰트 저장 (30일 유지)
  });