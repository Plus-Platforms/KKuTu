<script>
  import { onMount } from 'svelte';
	const title = '끄투리오 통합 안내';
  var userLang = "";

  let jsonData = {"message":{"status":"200","error":{"code":"","msg":""},"result":{"cafeId":31109813,"cafeName":"모렘미","cafeStaff":false,"cafeMember":false,"manageMenus":{"showArticleDelete":false,"showReportBadArticle":false,"showBoardNotice":false,"showOneBoardNotice":false,"showActivityStop":false,"showSecede":false,"showArticleMove":false,"showLevelUp":false,"showRequiredNotice":false,"showPopularArticleHide":false},"requiredNoticeList":[{"articleId":35,"title":"필독공지","isCafeBook":false,"isNewNotice":false}],"mainNoticeList":[{"cafeId":31109813,"articleId":206,"refArticleId":206,"replyListOrder":"","menuId":8,"menuName":"Loading","menuType":"B","restrictMenu":false,"boardType":"L","subject":"불러오는 중","summary":"","writerId":"","writerNickname":"","memberLevel":999,"memberLevelIconId":1,"profileImage":"","newArticle":true,"replyArticle":false,"blindArticle":false,"openArticle":true,"marketArticle":false,"useSafetyPayment":false,"escrow":false,"onSale":false,"cost":0,"formattedCost":"","productSale":{"saleStatus":"NONE","cost":""},"attachImage":true,"attachMusic":false,"attachMovie":false,"attachFile":false,"attachMap":false,"attachGpx":false,"attachPoll":false,"attachLink":false,"attachCalendar":false,"popular":false,"representImage":"","representImageType":"I","imageAttachCount":1,"useHead":true,"headId":12,"headName":"","enableComment":true,"hasNewComment":false,"refArticleCount":0,"readCount":14,"commentCount":0,"writeDateTimestamp":1714362828690,"aheadOfWriteDate":"24.04.29.","formattedReadCount":"14","formattedCommentCount":"0","noticeType":"N","showNoticeDelete":false,"delParent":false,"blogScrap":false,"enableRecommendation":true}]}}};
  let jsonDataFull = {"message":{"status":"200","error":{"code":"","msg":""},"result":{"cafeId":31109813,"cafeName":"모렘미","cafeStaff":false,"cafeMember":false,"blockMemberList":[],"hasNext":true,"articleList":[{"cafeId":31109813,"articleId":209,"refArticleId":209,"replyListOrder":"","menuId":12,"menuName":"Loading","menuType":"B","restrictMenu":false,"boardType":"L","subject":"불러오는 중","memberKey":"","writerNickname":"","memberLevel":110,"memberLevelIconId":1,"memberLiked":false,"profileImage":"","newArticle":true,"replyArticle":false,"blindArticle":false,"openArticle":true,"marketArticle":false,"useSafetyPayment":false,"escrow":false,"onSale":false,"cost":0,"formattedCost":"","productSale":{"saleStatus":"NONE","cost":""},"attachImage":true,"attachMusic":false,"attachMovie":false,"attachFile":false,"attachMap":false,"attachGpx":false,"attachPoll":false,"attachLink":false,"attachCalendar":false,"popular":false,"representImage":"","representImageType":"I","imageAttachCount":20,"useHead":true,"headId":4,"headName":"","enableComment":true,"hasNewComment":false,"refArticleCount":0,"readCount":6,"commentCount":0,"likeItCount":0,"writeDateTimestamp":1714385210767,"delParent":false,"blogScrap":false,"enableRecommendation":false}],"manageMenus":{},"recentNoticeAddDate":1714362828780,"requiredNoticeList":[],"managerDelegate":{},"exposePlugReservation":false,"homeDaAdvertVisible":false,"adFreeGameCafe":false}}};
  let jsonDataServers = { list: [0], max: 0 };
  let randomMessageArray = ["혼자서도 즐겨 보세요!", "클래식과 모던, 두 가지 맛!", "동접 늘려주세요...T.T", "지금 접속하기!", "오리진 쿵쿵따 모드 업데이트!", "수학 대결 모드 업데이트!", "아무도 이 버튼을 안 눌러!", "내 버튼에 있는 내 끄투"];
  const randomMessage = randomMessageArray[Math.floor(Math.random() * randomMessageArray.length)];
  const serverName = ["감자", "냉이", "다래", "레몬", "망고", "보리", "상추", "아욱", "20세 이상"];
  let showModal = false; // 모달 표시 여부를 나타내는 변수

  onMount(async () => {
        const response = await fetch('https://kkutu.plus/sns/cafe/notice/31109813');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        jsonData = await response.json();

        const responseFull = await fetch('https://kkutu.plus/sns/cafe/post/31109813/7/0');
        
        if (!responseFull.ok) {
          throw new Error('Failed to fetch data');
        }

        jsonDataFull = await responseFull.json();

        const responseServers = await fetch('https://kkutu.plus/servers');
        
        if (!responseServers.ok) {
          throw new Error('Failed to fetch data');
        }

        jsonDataServers = await responseServers.json();

        
  });

  onMount(() => {
      userLang = navigator.language.replace("-", "_");
  });

  function checkUI() {
    if (document.cookie.indexOf("uipreference") == -1) {
      showModal = true;
      var modalWindow = document.getElementsByClassName('popup')[0];
      if (modalWindow) {
        modalWindow.classList.remove('hidden');
        modalWindow.classList.remove('modal-back');
        modalWindow.classList.add('modal-front');
      } else {
          console.error("Modal window element not found!");
      }
    }
    else{
      if (document.cookie.indexOf("uipreference=modern") != -1) {
        window.location.href = "https://kkutu.plus/game?server=0&locale=" + userLang;
      }else{
        window.location.href = "https://kkutu.plus/o/game?server=0&locale=" + userLang;
      }
    }
  }

  function closeUI() {
      var modalWindow = document.getElementsByClassName('popup')[0];
      if (modalWindow) {
        modalWindow.classList.remove('modal-front');
        modalWindow.classList.add('modal-back');
        setTimeout(() => {
          showModal = false;
          modalWindow.classList.add('hidden');
        }, 300);
      } else {
          console.error("Modal window element not found!");
      }
  }
</script>

<svelte:head>
	<title>플러스끄투 - {title}</title>
</svelte:head>

<div  class="dark:bg-gray-900 dark:text-white">
  <section class="overflow-x-hidden relative isolate bg-slate-900 w-full flex flex-col">

    <div class="">
      <div class="mx-auto max-w-screen-xl container px-4 md:px-6">
        <div class="pt-48 pb-28 justify-center flex flex-col items-center">
          
          <h1 class="text-hero mb-8 tracking-wider text-center text-slate-200 font-bold text-2xl lg:text-4xl">
            더 많은 사람들과 글자로 놀자!
          </h1>
          <div class="text-hero relative mx-auto flex flex-col">
            <img src="/img/web/title_1.png" class="leftReveal h-16 lg:h-32 justify-left" alt="끄투리오">
            <img src="/img/web/title_2.png" class="leftReveal h-16 lg:h-32 justify-right" alt="대통합">
          </div>

          <div class="absolute opacity-20 mx-auto hidden lg:flex">
            <img src="/img/web/glassFraction-1.png" class="glassFraction-1" alt="Glass Fraction 1" />
            <img src="/img/web/glassFraction-2.png" class="glassFraction-2" alt="Glass Fraction 2" />
          </div>

          <p class="delayedFadeIn-200ms mt-8 text-center text-slate-300 text-lg lg:text-xl">
            끄투리오와 플러스끄투의 상상도 못한 만남!<br>
            6월 중으로 계정 이관 서비스가 시작될 예정입니다.</p>

          
        <!--  <button class="delayedFadeIn-200ms mt-12 rounded-2xl text-gray-800 shadow-lg px-6 py-2 font-bold text-2xl transform ease-in duration-100 active:scale-95 lg:hover:scale-110 lg:hover:bg-gradient-to-r lg:hover:from-blue-500 lg:hover:to-purple-500 lg:hover:text-white bg-slate-100" on:click={() => checkUI()}>
            끄투리오 시작하기 →
          </button>

          {#if jsonDataServers.list[0] !== null}
          <button class="mt-4 lg:flex inline-flex text-lg text-slate-500 "  on:click={() => checkUI()}>
            플러스끄투 접속하기
          </button>
          {/if}-->

          <button class="delayedFadeIn-200ms mt-12 rounded-2xl text-gray-800 shadow-lg px-6 py-2 font-bold text-2xl transform ease-in duration-100 active:scale-95 lg:hover:scale-110 lg:hover:bg-gradient-to-r lg:hover:from-blue-500 lg:hover:to-purple-500 lg:hover:text-white bg-slate-100" on:click={() => checkUI()}>
            플러스끄투 시작하기 →
          </button>
        
        </div>
      </div>
    </div>
    
  </section>
  <div class="py-4 lg:py-12 bg-gradient-to-b from-slate-900 to-black"></div>
  <div class="bg-black py-8 lg:py-24 text-center">
    <h2 class="delayedFadeIn-500ms text-3xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
     계정 이관 서비스는<br>
     12월 31일까지 진행됩니다
    </h2>
    <p class="delayedFadeIn-600ms mt-4 text-center text-slate-300 text-xl">
      플러스끄투 게임 접속은 6월 30일 종료됩니다.<br>
      해당 기간 이후에는 로그인을 통해 보안 코드를 획득하실 수 있습니다.
    </p>
  </div>
  <!-- FAQ -->
  <div class="bg-black">
  <div class="bg-black mx-auto py-8 lg:py-24 max-w-screen-xl">
    <div class="px-4 lg:px-0">
    <h2 class="lg:ml-6 text-3xl lg:text-7xl font-bold text-left">
      자주 묻는 질문
    </h2>
    <p class="lg:ml-6 mt-4 text-left text-slate-300 text-xl">
      끄투리오와 플러스끄투의 통합에 대한 궁금증을 해결해 드립니다.
    </p>
  </div>
    <div class="mt-8">
      <div class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-6">
        <div class="bg-slate-900 p-4 rounded-2xl shadow-lg">
          <h3 class="text-xl font-bold text-white">통합은 왜 하는 건가요?</h3>
          <p class="mt-2 text-gray-300"><strong>끄투리오와 플러스끄투가 만나 끄투리오가 되었습니다.</strong> 더 좋은 서비스를 제공하기 위해서 긴 시간동안 서비스를 운영해온 끄투리오 팀과 통합하게 되었습니다.</p>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl shadow-lg">
          <h3 class="text-xl font-bold text-white">계정 이전 시 아이템은 어떻게 되나요?</h3>
          <p class="mt-2 text-gray-300">계정 이전 시 XP의 경우 밸런스를 위해 끄투리오 자체 기준으로 환산하여 전환되며, 아이템과 핑은 변동 없이 이전됩니다.</p>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl shadow-lg">
          <h3 class="text-xl font-bold text-white">이미 끄투리오 계정이 있어도 이전 가능한가요?</h3>
          <p class="mt-2 text-gray-300">끄투리오 계정이 이미 있다면, 끄투리오에서 획득한 핑과 아이템에 더해 이전된 데이터가 중첩됩니다.</p>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl shadow-lg">
          <h3 class="text-xl font-bold text-white">UI나 모드는 어떻게 되나요?</h3>
          <p class="mt-2 text-gray-300">모던 UI는 선 폐지 및 안정화 후 테스트 서버에서 제공할 계획이며, 수학 퀴즈는 문제 추가의 어려움으로 삭제됩니다. 수학 대결, 오리진 쿵쿵따, 쿠폰, 스티커 등은 끄투리오에서도 그대로 이용 가능합니다.</p>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl shadow-lg">
          <h3 class="text-xl font-bold text-white">SNS 채널은 어떻게 되나요?</h3>
          <p class="mt-2 text-gray-300">YouTube 및 카페, Discord 등은 끄투리오 측의 SNS를 사용하며, 플러스끄투 SNS는 다른 용도로 재사용 될 예정입니다.</p>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl shadow-lg">
          <h3 class="text-xl font-bold text-white">PC 클라이언트나 PWA는 그대로 이용 가능한가요?</h3>
          <p class="mt-2 text-gray-300">PC 클라이언트는 작동이 중단 될 예정이며, PWA는 재설치 후 사용 가능합니다.</p>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl shadow-lg">
          <h3 class="text-xl font-bold text-white">남은 MVP권 기간이 있습니다. 끄투리오 멤버십으로 이전되나요?</h3>
          <p class="mt-2 text-gray-300">이전이 불가능합니다. Patreon을 통해 구독을 취소 해 주세요.</p>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl shadow-lg">
          <h3 class="text-xl font-bold text-white">달달소 계정을 사용 중입니다. 이전할 수 있나요?</h3>
          <p class="mt-2 text-gray-300">보안 코드 단위로 계정을 이전하기 때문에, 다른 로그인 수단을 사용하면 이전할 수 있습니다.</p>
        </div>
      </div>
    </div>
  </div></div>
  <!-- FAQ -->

<!-- Right bottom overlay button to move to /moremtalk -->
<div class="fixed right-0 bottom-4 z-50 p-4">
  <a href="/moremtalk" target="_blank" class="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-4 shadow-lg transform ease-in duration-100 hover:scale-105">
    모레미에게 물어보기
  </a>
</div>

<div class="popup hidden fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm flex justify-center items-center">
  <div class="bg-white dark:bg-gray-800 pt-6 pb-8 px-4 lg:px-8 max-w-screen-xl">
    <button class="modal-close top-0 right-0 text-4xl text-gray-500" on:click={() => closeUI()}>&times;</button>
    
    <h3 class="text-3xl font-bold dark:text-white mt-2">UI 선택</h3>
    <p class="text-gray-500 dark:text-gray-300">변경한 UI는 환경설정 → UI 설정에서 되돌릴 수 있습니다.</p>
    
    <!-- 2 cards comparing old and new ui in row -->
    <div class="grid lg:grid-cols-2 gap-4 mt-4">
      <button class="lg:hidden bg-gray-100 dark:bg-gray-900 p-4 lg:p-8 border-blue-500 border-b-4 transform ease-in duration-100 hover:scale-105 hover:bg-blue-500 hover:text-white active:scale-95" on:click={() => {
        document.cookie = "uipreference=modern";
        window.location.href = `https://kkutu.plus/game?server=0&locale=${userLang}`;
      }} aria-label="Modern">
        <img src="/img/web/ui/modern.png" alt="Modern UI" class="w-full h-24 mb-4 object-cover" />
        <h4 class="text-3xl font-bold">Mobile UI</h4>
        <p class="mt-2">
          새로운 사용자를 위한&nbsp;<br class="hidden lg:block">모바일 UI입니다.
        </p>
      </button>

      <button class="hidden lg:block bg-gray-100 dark:bg-gray-900 p-4 lg:p-8 border-purple-500 border-b-4 transform ease-in duration-100 hover:scale-105 hover:bg-purple-500 hover:text-white active:scale-95" on:click={() => {
        document.cookie = "uipreference=classic";
        window.location.href = `https://kkutu.plus/o/game?server=0&locale=${userLang}`;
      }} aria-label="Classic">
        <img src="/img/web/ui/classic.png" alt="Classic UI" class="w-full h-24 mb-4 object-cover" />
        <h4 class="text-3xl font-bold">PC UI</h4>
        <p class="mt-2">
          숙련된 사용자를 위한&nbsp;<br class="hidden lg:block">원작 끄투의 UI입니다.
        </p>
      </button>
  </div>
</div>
</div>

</div>