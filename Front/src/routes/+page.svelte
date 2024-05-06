<script>
  import { onMount } from 'svelte';
	const title = '모든 것이 플러스';
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
  <section class="overflow-x-hidden relative isolate bg-purple-950 w-full flex flex-col">


    <div class="">
      <div class="mx-auto max-w-screen-xl container px-4 md:px-6 lg:grid lg:grid-cols-3">
        <div class="col-span-2 pt-48 pb-28 justify-center flex flex-col items-center lg:items-start">
         
          <a href="https://cafe.naver.com/pluskkutu/226" target="_blank">
              <p class="rounded-full lg:border-white lg:border-4 lg:px-4 lg:py-2 text-white mb-8 text-center sm:text-4xl  transform ease-in duration-100 active:scale-95 lg:hover:bg-white lg:hover:text-black">
                <strong>NEW!</strong>&nbsp;가정의 달 이벤트 →
              </p>
          </a>

          <h1 class="text-hero lg:text-left text-center text-purple-200 text-5xl lg:text-8xl font-extrabold text-black sm:text-4xl md:text-5xl lg:text-6xl">
            모든 것이 플러스<br>
            <span class="text-white border-b-8 border-purple-500">플러스끄투</span><span class="text-purple-500">.</span>
          </h1>

          <p class="lg:text-left text-center text-white mt-8 sm:text-4xl text-black">
            
          </p>

          <div class="mx-auto gb">
            <!-- Layer2 -->
            <div class="layer absolute top-0 left-0 w-full h-full bg-layer2 z-10 flex justify-center items-center">
              <img src="/img/web/2024Renewal/Layer2.png" alt="레이어">
            </div>
            <!-- Layer3 -->
            <div class="layer absolute top-0 left-0 w-full h-full bg-layer3 z-20 flex justify-center items-center">
              <img src="/img/web/2024Renewal/Layer3.png" alt="레이어">
            </div>
            <!-- Layer4 -->
            <div class="layer absolute top-0 left-0 w-full h-full bg-layer4 z-30 flex justify-center items-center">
              <img src="/img/web/2024Renewal/Layer4.png" alt="레이어">
            </div>
          </div>
          
          {#if jsonDataServers.list[0] == null}
          <div class="balloon-wrapper">
            <div class="mt-12 lg:flex inline-flex text-lg text-white bg-black/70 backdrop-blue-lg rounded-2xl px-4 py-2">
              현재 서버 점검 진행 중으로, 서버 접속이 불가능합니다.
            </div>
          </div>
          <a class="mt-4 bg-white rounded-full text-gray-800 shadow-lg px-8 py-2 font-bold text-3xl" href="https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=9&search.boardtype=L">
            점검 공지 확인하기
          </a>
          {:else}
          <div class="relative mt-12 conn-balloon">
            <div class="balloon-tail"></div>
            <div class="balloon-wrapper bg-black/70 text-lg text-white rounded-2xl px-4 py-2">
              <div class="flex items-center">
                <img src="/img/web/눈 Left.svg" alt="모레미 눈입" class="h-4 mr-2">
                {#if jsonDataServers.list[0] > 0}
                지금&nbsp;<strong>{jsonDataServers.list[0]}</strong>명이 함께하는 중!
                {:else}
                {randomMessage}
                {/if}
              </div>
            </div>
          </div>
          <button class="mt-4 rounded-3xl text-gray-800 shadow-lg px-8 py-2 lg:py-3 font-bold text-3xl lg:text-4xl transform ease-in duration-100 active:scale-95 lg:hover:scale-110 lg:hover:bg-gradient-to-r lg:hover:from-blue-500 lg:hover:to-purple-500 lg:hover:text-white bg-gradient-to-b from-white to-gray-300" on:click={() => checkUI()}>
            게임 시작 →
          </button>
          {/if}
          <div class="mx-auto lg:mx-0">
            <div class="max-w-lg mx-auto mt-16 grid grid-cols-3 gap-x-8 lg:gap-x-12 items-center jusitfy-center">
              <div class="flex items-center justify-center">
              <a href="https://cafe.naver.com/pluskkutu" target="_blank" class="px-3 py-3 lg:px-4 lg:py-4 rounded-full bg-white  transform ease-in duration-100 active:scale-95 lg:hover:scale-110 lg:hover:bg-green-200">
              <img
                class="col-span-2 max-h-6 w-6 lg:max-h-8 lg:w-8 object-contain lg:col-span-1"
                src="/img/cafe.png"
                alt="NaverCafe"
                width={48}
                height={48}
              /></a>
            </div>
    
            <div class="flex items-center justify-center">
              <a href="https://youtube.com/@pluskkutu" target="_blank" class="px-3 py-4 lg:px-4 lg:py-5 rounded-full bg-white transform ease-in duration-100 active:scale-95 lg:hover:scale-110 lg:hover:bg-red-200">
              <img
                class="col-span-2 max-h-6 w-6 lg:max-h-8 lg:w-8 object-contain lg:col-span-1"
                src="/img/youtube.png"
                alt="YouTube"
                width={48}
                height={48}
              /></a>
            </div>
    
          <div class="flex items-center justify-center">
            <a href="https://discord.gg/bt25WdwzR7" target="_blank" class="px-3 py-4 lg:px-4 lg:py-5 rounded-full bg-white transform ease-in duration-100 active:scale-95 lg:hover:scale-110 lg:hover:bg-indigo-200">
            <img
              class="col-span-2 max-h-6 w-6 lg:max-h-8 lg:w-8 object-contain lg:col-span-1"
              src="/img/discord.png"
              alt="Discord"
              width={48}
              height={48}
            /></a>
          </div>
    
          </div>
        </div>
        
        </div>
        <div class="hidden lg:flex w-full justify-end items-end">
          <img src="/img/web/Mask group.png" alt="레이어" class="moremi-hero w-full">
      </div>
      </div>
    </div>
    
  </section>
<div class="popup hidden fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm flex justify-center items-center">
  <div class="bg-white dark:bg-gray-800 pt-6 pb-8 px-4 lg:px-8 max-w-screen-xl">
    <button class="modal-close top-0 right-0 text-4xl text-gray-500" on:click={() => closeUI()}>&times;</button>
    
    <h3 class="text-3xl font-bold dark:text-white mt-2">UI 선택</h3>
    <p class="text-gray-500 dark:text-gray-300">변경한 UI는 환경설정 → UI 설정에서 되돌릴 수 있습니다.</p>
    
    <!-- 2 cards comparing old and new ui in row -->
    <div class="grid lg:grid-cols-2 gap-4 mt-4">
      <button class="bg-gray-100 dark:bg-gray-900 p-4 lg:p-8 border-blue-500 border-b-4 transform ease-in duration-100 hover:scale-105 hover:bg-blue-500 hover:text-white active:scale-95" on:click={() => {
        document.cookie = "uipreference=modern";
        window.location.href = `https://kkutu.plus/game?server=0&locale=${userLang}`;
      }} aria-label="Modern">
        <img src="/img/web/ui/modern.png" alt="Modern UI" class="w-full h-24 mb-4 object-cover" />
        <h4 class="text-3xl font-bold">모던 UI</h4>
        <p class="mt-2">
          새로운 사용자를 위한&nbsp;<br class="hidden lg:block">모던한 UI입니다.
        </p>
      </button>

      <button class="hidden lg:block bg-gray-100 dark:bg-gray-900 p-4 lg:p-8 border-purple-500 border-b-4 transform ease-in duration-100 hover:scale-105 hover:bg-purple-500 hover:text-white active:scale-95" on:click={() => {
        document.cookie = "uipreference=classic";
        window.location.href = `https://kkutu.plus/o/game?server=0&locale=${userLang}`;
      }} aria-label="Classic">
        <img src="/img/web/ui/classic.png" alt="Classic UI" class="w-full h-24 mb-4 object-cover" />
        <h4 class="text-3xl font-bold">클래식 UI</h4>
        <p class="mt-2">
          숙련된 사용자를 위한&nbsp;<br class="hidden lg:block">원작 끄투의 UI입니다.
        </p>
      </button>
  </div>
</div>
</div>

<section class="max-w-screen-xl mx-auto my-10 lg:my-24 p-4">
  <div>
  <h2 class="text-3xl lg:text-5xl font-bold mb-4 lg:mb-12">📢 새로운 소식</h2>
{#if jsonData && jsonData.message && jsonData.message.result}
{#each jsonData.message.result.mainNoticeList  as { headName, menuName, menuId, articleId, subject, aheadOfWriteDate} (articleId)}
<a href={`https://cafe.naver.com/ArticleRead.nhn?clubid=31109813&page=1&menuid=${menuId}&boardtype=L&articleid=${articleId}&referrerAllArticles=false`} target="_blank" class="hover:text-blue-500">
  <div class="rounded-xl post px-2 lg:px-4 py-4 dark:bg-gray-800 bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 mb-2 lg:mb-4 transform ease-in duration-100 active:scale-95">
      <a href={`https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=${menuId}&search.boardtype=L`} target="_blank"><span class={`boardBg-${menuId} rounded-full px-2 text-white mr-2 hover:bg-blue-600`}>{menuName}</span></a> | <strong>{aheadOfWriteDate}</strong>
      <h2 class="truncate font-bold text-xl lg:mt-2 lg:text-3xl">{headName !== undefined ? "["+headName+"]" : ""} {subject}</h2>
  </div>
</a>
{/each}
{:else}
<p>불러오는 중</p>
{/if}
</div>
</section>

<section class="max-w-screen-xl mx-auto py-10 p-4 md:grid md:grid-cols-2">
  <div>
    <h2 class="text-3xl font-bold mb-4">채널 선택</h2>
  <div class="grid grid-cols-2 gap-4">
    {#each jsonDataServers.list as serverUsers, index}
      <a href={`${serverUsers === null ? "/" : "https://kkutu.plus/game?server="+index}`}>
      <div class="rounded-xl bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 px-2 py-2 transform ease-in duration-100 active:scale-95">
        <h3 class="text-xl font-bold">{serverName[index]} 채널 <span class="font-normal text-gray-500 dark:text-gray-300">{serverUsers === null ? '점검 중' : `${serverUsers} / ${jsonDataServers.max}`}</span></h3>
        <div class="bg-gray-500 h-2 mt-2 rounded-full">
        <div class={`${serverUsers === null ? "bg-transparent" : "bg-blue-500"} h-full rounded-full`} style={`width: ${(serverUsers / jsonDataServers.max) * 100}%`}>
        </div>
        </div>
      </div>
    </a>
    {/each}
  </div>
</div>
<div class="flex-col lg:ml-8 mt-8 lg:mt-0">
  <div class="mt-8">
    <h2 class="text-3xl font-bold mb-4">공식 카페</h2>
    {#if jsonDataFull && jsonDataFull.message && jsonDataFull.message.result}
{#each jsonDataFull.message.result.articleList as { articleId, subject, writeDateTimestamp, menuName, menuId } (articleId)}
<a href={`https://cafe.naver.com/ArticleRead.nhn?clubid=31109813&page=1&menuid=${menuId}&boardtype=L&articleid=${articleId}&referrerAllArticles=false`} target="_blank" class="hover:text-blue-500 hover:underline">
<div class="post py-4 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
  <h3 class="truncate">
    <a href={`https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=${menuId}&search.boardtype=L`} target="_blank"><span class={`boardBg-${menuId} rounded-full px-2 text-white mr-2 hover:bg-blue-600`}>{menuName}</span></a>
    {subject}</h3>
</div>
</a>
{/each}
{:else}
<p>불러오는 중</p>
{/if}

  </div>
</div>
</section>

</div>