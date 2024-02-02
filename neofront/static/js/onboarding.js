function playOnboarding(){
introJs().setOption("disableInteraction", false).setOption("dontShowAgain", true).setOptions({nextLabel: '다음', prevLabel: '뒤로가기', doneLabel: '완료'})
.setOptions({
    steps: [{intro: "플러스끄투에 온 걸 환영해!"},
    {intro: "간단한 방법으로 쉽게 익숙해질 수 있으니까 너는 따라만 하면 돼!"},
    {intro: "이 튜토리얼이 보기 싫다면 처음 화면에서 'Don't show again'을 눌러줘~"},
    {intro: "혹시 화면이 잘려서 잘 보이지 않는다고? Ctrl+마우스 휠이나 F11을 눌러 전체화면을 하면 원활하게 플레이 할 수 있어."},
    {element: document.querySelector('#NewRoomBtn'), intro: "봇, 또는 사람들과 플레이를 하고 싶다면 [방 만들기]를 클릭!"},
    {element: document.querySelector('#NewRoomBtn'), intro: "다른 프리서버엔 있지만 플러스끄투에 없는 단어가 있다면 [단어 등록]을 선택해."},
    {tooltipClass: 'RoomListBox', intro: "더 많은 방은 여기에서 선택할 수 있고,"},
    {element: document.querySelector('#addBalance'), intro: "핑은 PlusCoin으로 충전할 수 있어."},    
    {element: document.querySelector('#signin'), intro: "업적을 저장하고 싶다면, 로그인 하면 돼!"}    
]
  }).start();
}