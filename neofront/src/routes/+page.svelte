<script>
  import { onMount } from 'svelte';
	const title = '혼자도 같이도 즐거운 온라인 단어 게임';
  var userLang = "";

  let jsonData = [];
  let jsonDataFull = [];
  let jsonDataServers = { list: [0], max: 0 };
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

  function calculateTotalConnectedUsers() {
      return jsonDataServers.list.reduce((total, current) => total + (current || 0), 0);
  }

  function checkUI() {
    if (document.cookie.indexOf("uipreference") == -1) {
      showModal = true;
    }
    else{
      if (document.cookie.indexOf("uipreference=modern") != -1) {
        window.location.href = "https://kkutu.plus/game?server=0&locale=" + userLang;
      }else{
        window.location.href = "https://kkutu.plus/o/game?server=0&locale=" + userLang;
      }
    }
  }
</script>

<svelte:head>
	<title>플러스끄투 - {title}</title>
</svelte:head>

<div  class="dark:bg-gray-900 dark:text-white">
  <section class="relative isolate bg-gray-800 w-full flex flex-col">
    
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-500 to-purple-700 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>

    <div class="py-32 sm:py-48 lg:py-56">
      <div class="mx-auto max-w-screen-2xl container px-4 md:px-6">
        <div class="justify-center flex flex-col items-center">
         
         
          <p class="text-white mb-8 text-center sm:text-4xl text-black">
            <strong>NEW!</strong>&nbsp;클래식 UI 추가!
          </p>

          <h1 class="text-gray-300 text-center text-3xl lg:text-8xl font-bold text-black sm:text-4xl md:text-5xl lg:text-6xl">
            모든 것이 플러스,<br>
            <span class="text-white">플러스끄투</span>
          </h1>

          <p class="text-white mt-8 text-center sm:text-4xl text-black">
            즐겨하던 끄투가 그 어디든 만족스럽게!<br>
            다양한 선택지와 상식적인 패치까지,<br/>
            끄투의 새로운 기준을 제시하고 있습니다.
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
          <p class="mt-16 lg:flex inline-flex text-lg px-4 py-2 text-white">
            현재 서버 점검 진행 중으로, 서버 접속이 불가능합니다.
          </p>
          <a class="mt-4 bg-white rounded-full text-gray-800 shadow-lg px-8 py-2 font-bold text-3xl" href="https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=9&search.boardtype=L">
            점검 공지 확인하기
          </a>
          {:else}
          <button class="mt-16 bg-white rounded-full text-gray-800 shadow-lg px-8 py-2 font-bold text-3xl" on:click={() => checkUI()}>
            시작하기
          </button>
          {/if}
          <div class="hidden lg:block mx-auto">
            <div class="max-w-lg mx-auto mt-16 grid grid-cols-3 gap-x-16 items-center jusitfy-center">
              <div class="flex items-center justify-center">
              <a href="https://cafe.naver.com/pluskkutu" target="_blank" class="px-4 py-4 rounded-full bg-white">
              <img
                class="col-span-2 max-h-8 w-8 object-contain lg:col-span-1"
                src="/img/cafe.png"
                alt="NaverCafe"
                width={48}
                height={48}
              /></a>
            </div>
    
            <div class="flex items-center justify-center">
              <a href="https://youtube.com/@pluskkutu" target="_blank" class="px-4 py-5 rounded-full bg-white">
              <img
                class="col-span-2 max-h-8 w-8 object-contain lg:col-span-1"
                src="/img/youtube.png"
                alt="YouTube"
                width={48}
                height={48}
              /></a>
            </div>
    
          <div class="flex items-center justify-center">
            <a href="https://discord.gg/5b8kNZJawd" target="_blank" class="px-4 py-5 rounded-full bg-white">
            <img
              class="col-span-2 max-h-8 w-8 object-contain lg:col-span-1"
              src="/img/discord.png"
              alt="Discord"
              width={48}
              height={48}
            /></a>
          </div>
    
          </div>
        </div>
        </div>
      </div>
    </div>
    
  </section>
{#if showModal}
<div class="modal fixed inset-0 z-50 overflow-auto bg-black/50 flex justify-center items-center">
  <div class="bg-white pt-4 pb-8 px-4 lg:px-8 lg:rounded-xl max-w-xl">
    <button class="modal-close top-0 right-0 text-4xl text-gray-500" on:click={() => (showModal = false)}>&times;</button>
    
    <h3 class="text-3xl font-bold dark:text-black mt-4">UI 선택</h3>
    <p class="text-gray-500">변경한 UI는 환경설정 &gt; UI 설정에서 되돌릴 수 있습니다.</p>
    
    <!-- 2 cards comparing old and new ui in row -->
    <div class="grid lg:grid-cols-2 gap-4 mt-4">
      <div class="bg-gray-100 p-4 border-blue-500 border-b-4">
        <img src="/img/ui/modern.png" alt="Modern UI" class="w-full h-24 mb-4 object-cover" />
        <h4 class="text-3xl font-bold text-black">모던 UI</h4>
        <p class="mt-2 text-gray-600">
          새로운 사용자를 위한&nbsp;<br class="hidden lg:block">모던한 UI입니다.
        </p>
        <button class="bg-blue-500 hover:bg-blue-600 transform ease-in duration-100 active:scale-95 text-white px-4 py-2 lg:rounded-lg mt-4" on:click={() => {
          document.cookie = "uipreference=modern";
          window.location.href = `https://kkutu.plus/game?server=0&locale=${userLang}`;
        }}>선택하기</button>
      </div>
      <div class="hidden lg:block bg-gray-100 p-4 border-purple-500 border-b-4">
        <img src="/img/ui/classic.png" alt="Classic UI" class="w-full h-24 mb-4 object-cover" />
        <h4 class="text-3xl font-bold text-black">클래식 UI</h4>
        <p class="mt-2 text-gray-600">
          숙련된 사용자를 위한&nbsp;<br class="hidden lg:block">원작 끄투의 UI입니다.
        </p>
        <button class="hidden lg:block bg-purple-500 hover:bg-purple-600 transform ease-in duration-100 active:scale-95 text-white px-4 py-2 lg:rounded-lg mt-4" on:click={() => {
          document.cookie = "uipreference=classic";
          window.location.href = `https://kkutu.plus/o/game?server=0&locale=${userLang}`;
        }}>선택하기</button>

        <button class="lg:hidden bg-gray-500 hover:bg-gray-600 transform ease-in duration-100 active:scale-95 text-white px-4 py-2 lg:rounded-lg mt-4">
          모바일 미지원</button>
      </div>

  </div>
</div>
</div>
{/if}
<section class="max-w-screen-xl mx-auto my-10 p-4 md:grid md:grid-cols-2">
  <div>
  <h2 class="text-3xl font-bold mb-4">공지사항</h2>
{#if jsonData && jsonData.message && jsonData.message.result}
{#each jsonData.message.result.mainNoticeList  as { menuName, menuId, articleId, subject, aheadOfWriteDate} (articleId)}
<a href={`https://cafe.naver.com/ArticleRead.nhn?clubid=31109813&page=1&menuid=${menuId}&boardtype=L&articleid=${articleId}&referrerAllArticles=false`} target="_blank" class="hover:text-blue-500 hover:underline">
  <div class="post py-4 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
    <h3 class="truncate">
      <a href={`https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=${menuId}&search.boardtype=L`} target="_blank"><span class={`boardBg-${menuId} rounded-full px-2 text-white mr-2 hover:bg-blue-600`}>{menuName}</span></a>
      <strong>{aheadOfWriteDate}</strong>
      {subject}</h3>
  </div>
</a>
{/each}
{:else}
<p>불러오는 중</p>
{/if}
</div>
<div class="flex-col lg:ml-8 mt-8 lg:mt-0">
  <h2 class="text-3xl font-bold mb-4">채널 선택</h2>
  <div class="grid grid-cols-2 gap-4">
    {#each jsonDataServers.list as serverUsers, index}
      <a href={`${serverUsers === null ? "/" : "https://kkutu.plus/game?server="+index}`}>
      <div class="rounded-xl bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 px-2 py-2 transform ease-in duration-100 active:scale-95">
        <h3 class="text-xl font-bold">{serverName[index]} 채널 <span class="font-normal text-gray-500 dark:text-gray-300">{serverUsers === null ? '점검 중' : `${serverUsers} / ${jsonDataServers.max}`}</span></h3>
        <div class="bg-gray-500 h-2 mt-2">
        <div class={`${serverUsers === null ? "bg-transparent" : "bg-blue-500"} h-full`} style={`width: ${(serverUsers / jsonDataServers.max) * 100}%`}>
        </div>
        </div>
      </div>
    </a>
    {/each}
  </div>
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