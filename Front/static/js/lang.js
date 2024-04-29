var userLanguage = navigator.language || navigator.userLanguage;
      var langCode = userLanguage.split('-')[0];
      var localPage = document.getElementById('localPage').innerText;
      var langFile = "/language/" + localPage + "/" + langCode;
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = langFile;
            document.head.appendChild(script);
          } else {
            var defaultLangFile = "/language/" + localPage + "/ko_KR";
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = defaultLangFile;
            document.head.appendChild(script);
          }
        }
      };
      xhr.open('GET', langFile, true);
      xhr.send();