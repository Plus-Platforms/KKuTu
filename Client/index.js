const { app, BrowserWindow, screen, globalShortcut, dialog } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
let originalSize;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    title: 'PlusKKuTu Client',
    maximizable: false,
    icon: __dirname + '/assets/icon.png',
    autoHideMenuBar: true, // 이 부분이 리본바와 상단바를 없애는 옵션입니다.
    webPreferences: {
      devTools: !app.isPackaged,
      nodeIntegration: true
    }
  });

  originalSize = screen.getPrimaryDisplay().workAreaSize;

  const gameUrl = 'https://kkutu.cc/game?server=0';

  mainWindow.loadURL(gameUrl);

  mainWindow.webContents.on('did-finish-load', () => {
  });
  
  mainWindow.on('close', function (e) {
    let response = dialog.showMessageBoxSync(this, {
        type: 'question',
        buttons: ['나가기', '남아있기'],
        title: '정말로 나가시려고요?',
        message: '지금 나가면 너무 아쉬워요!'
    });

    if(response == 1) e.preventDefault();
});


  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // Ctrl+F로 전체 화면 토글
  globalShortcut.register('CommandOrControl+F', () => {
    toggleFullScreen();
  });

  globalShortcut.register('CommandOrControl+Shift+I', () => {
    dialog.showErrorBox("정말로 개발자 도구를 여시려고요?", "개발자 도구를 이용하여 부정하게 승리하는 행위는 양심없는 행위일 뿐더러 이용 정지를 받을 수 있습니다.");
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

// 전체 화면 토글 함수
function toggleFullScreen() {
  if (mainWindow.isFullScreen()) {
    mainWindow.setFullScreen(false);
  } else {
    mainWindow.setFullScreen(true);
  }
}
