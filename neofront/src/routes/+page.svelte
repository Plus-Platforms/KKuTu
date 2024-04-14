<script>
  import { onMount } from 'svelte';
	const title = '혼자도 같이도 즐거운 온라인 단어 게임';
  var isModalOpen = false;
  // Function to show the modal
  function showModal() {
    // Check if the modal is already open
    if (!isModalOpen) {
      // Set isModalOpen to true to indicate that the modal is now open
      isModalOpen = true;

      // Code to display the modal (e.g., toggle a CSS class)
      // Replace the following line with your actual modal display logic
      document.querySelector('.modal').classList.add('visible');
    }
  }

  // Function to close the modal
  function closeModal() {
    // Set isModalOpen to false to indicate that the modal is now closed
    isModalOpen = false;

    // Code to hide the modal (e.g., toggle a CSS class)
    // Replace the following line with your actual modal hiding logic
    document.querySelector('.modal').classList.remove('visible');
  }

  onMount(() => {
    // Get the download link element
    const downloadLink = document.querySelector('.download-link');

    // Add a click event listener to the download link
    downloadLink.addEventListener('click', (event) => {
      // Prevent the default behavior of the link (e.g., navigating to a new page)
      event.preventDefault();

      // Call the function to show the modal
      showModal();
    });

    // Get the close button element inside the modal
    const closeButton = document.querySelector('.modal-close');

    // Add a click event listener to the close button
    closeButton.addEventListener('click', () => {
      // Call the function to close the modal
      closeModal();
    });
  });

  let jsonData = [];
  let jsonDataFull = [];
  let jsonDataServers = { list: [0], max: 0 };
  const serverName = ["감자", "냉이", "다래", "레몬", "망고", "보리", "상추", "아욱", "20세 이상"];

onMount(async () => {
      const response = await fetch('https://mapi.pcor.me/api/board/cafe.php');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      jsonData = await response.json();

      const responseFull = await fetch('https://mapi.pcor.me/api/board/cafe_free.php');
      
      if (!responseFull.ok) {
        throw new Error('Failed to fetch data');
      }

      jsonDataFull = await responseFull.json();

      const responseServers = await fetch('https://kkutu.cc/servers');
      
      if (!responseServers.ok) {
        throw new Error('Failed to fetch data');
      }

      jsonDataServers = await responseServers.json();
});

function calculateTotalConnectedUsers() {
    return jsonDataServers.list.reduce((total, current) => total + (current || 0), 0);
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
         
          <h1 class="text-gray-300 text-center text-3xl lg:text-8xl font-bold text-black sm:text-4xl md:text-5xl lg:text-6xl">
            끄투의 미래,<br>
            지금 <span class="text-white">플러스끄투</span>에서.
          </h1>

          <p class="text-white mt-8 text-center sm:text-4xl text-black">
            끄투의 틀에서 탈피한 아케이드 모드를 만나보세요.
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
          <a class="mt-16 bg-white rounded-full text-gray-800 shadow-lg px-8 py-2 font-bold text-3xl" href="https://kkutu.cc/game?server=0">
            시작하기
          </a>
          {/if}
  
          <a class="download-link mt-4 hidden lg:flex inline-flex text-lg px-4 py-2 text-white" href="#" on:click="{() => showModal()}">
            클라이언트 다운로드
          </a>
          
        </div>
      </div>
    </div>
    
  </section>
  
<div class="modal">
  <div class="modal-content">
    <button on:click="{() => isModalOpen = false}" class="modal-close text-2xl text-gray-500">×</button>
    <h3 class="text-3xl font-bold text-center dark:text-black">클라이언트는 지금 개편 중!</h3>
    <p class="text-gray-500 text-center">언제, 어디서나 즐긴다!<br/>Windows, macOS, Linux, iOS, Android 크로스 플레이를 지원하는<br/>새로운 클라이언트를 개발 중에 있습니다.
    <br/><br/>개발 완료 전까진 구 버전의 클라이언트를 이용할 수 있습니다.</p>
    <div class="px-4 w-full">
      <a href="https://github.com/Plus-Platforms/KKuTu/releases/download/1.0.0/install-1.0.0.exe">
      <button class="mt-3 px-3 w-full bg-blue-500 font-bold text-white text-center m-auto py-2 transform ease-in duration-100 active:scale-95 hover:bg-blue-700">
        2024/02/01 클라이언트 다운로드
    </button>
  </a>

  <p class="text-gray-500 text-center">1.0.0 수정사항 : Discord RPC 기능 추가</p>
    </div>

    <div class="px-4 justify-center flex items-center">
      <a href="https://plus.oqupie.com/portal/2568/article/56598" target="_blank">
      <button class="mt-3 px-3 bg-gray-100 font-bold text-black text-center m-auto py-2 transform ease-in duration-100 active:scale-95 hover:bg-gray-300">
        사양 확인
    </button>
  </a>
    </div>
    
  </div>
</div>
    <div class="bg-gray-100 dark:bg-gray-800 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 class="text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
          공식 SNS에서 만나요!
        </h2>
        <div class="max-w-lg mx-auto mt-16 grid grid-cols-3 gap-x-8 items-center jusitfy-center">
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
<section class="max-w-screen-xl mx-auto my-10 p-4 md:grid md:grid-cols-2">
  <div>
  <h2 class="text-3xl font-bold mb-4">카페 이야기</h2>
{#if jsonDataFull && jsonDataFull.message && jsonDataFull.message.result}
{#each jsonDataFull.message.result.articleList as { articleId, subject, writeDateTimestamp, menuName, menuId } (articleId)}
<a href={`https://cafe.naver.com/ArticleRead.nhn?clubid=31109813&page=1&menuid=${menuId}&boardtype=L&articleid=${articleId}&referrerAllArticles=false`} target="_blank" class="hover:text-blue-500 hover:underline">
  <div class="post py-4 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
    <h3 class="truncate">
      <a href={`https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=${menuId}&search.boardtype=L`} target="_blank"><span class={`boardBg-${menuId} rounded-full px-2 text-white mr-2 hover:bg-blue-600`}>{menuName}</span></a>
      <strong>{new Date(writeDateTimestamp).toLocaleDateString()}</strong>
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
      <a href={`${serverUsers === null ? "/" : "https://kkutu.cc/game?server="+index}`}>
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
</div>
</section>
<!--
<div class="overflow-hidden bg-gray-100 py-24 dark:bg-gray-800 dark:text-white">
      <div class="mx-auto max-w-screen-xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pr-8 lg:pt-4">
            <div class="lg:max-w-lg">
              <h2 class="text-base font-semibold leading-7 text-[#8B5CF6] dark:text-purple-300">플러스끄투에서만 만나다</h2>
              <p class="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-gray-100">당신이 플러스끄투에<br/>정착해야 하는 이유.</p>
              <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                개발사가 아닌 끄투 플레이어 한 명의 시선으로<br>끄투를 바라보고 개발하고 있어요.
              </p>

              <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-400 lg:max-w-none">
                <div class="relative pl-9">
                  <dt class="inline font-semibold text-gray-900 dark:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute left-1 top-1 h-5 w-5 text-[#3B82F6]">
                      <path fill-rule="evenodd" d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                    </svg>
                    높은 해상도 지원.
                  </dt>
                  <dd class="inline">가로 1600px에서 쾌적하게 플레이하세요.</dd>
                </div>
                <div class="relative pl-9">
                  <dt class="inline font-semibold text-gray-900 dark:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute left-1 top-1 h-5 w-5 text-[#3B82F6]">
                      <path fill-rule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z" clip-rule="evenodd" />
                    </svg>
                    PC 클라이언트.
                  </dt>
                  <dd class="inline">편리하게 접속하고 Discord 상태 공유가 가능해요.</dd>
                </div>
                <div class="relative pl-9">
                  <dt class="inline font-semibold text-gray-900 dark:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute left-1 top-1 h-5 w-5 text-[#3B82F6]">
                      <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />
                    </svg>
                    
                    다크 테마 지원.
                  </dt>
                  <dd class="inline">밤이라고 소중한 눈을 버릴 순 없잖아요.</dd>
                </div>
              </dl>
            </div>
          </div>
          <img
            src="/img/web/light.png"
            alt="인게임 화면"
            class="dark:hidden w-[48rem] max-w-none shadow-xl sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
          <img
            src="/img/web/dark.png"
            alt="인게임 화면"
            class="hidden dark:block w-[48rem] max-w-none shadow-xl sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>-->
    

    <section class="max-w-screen-xl mx-auto py-10 p-4 md:grid md:grid-cols-2">
      <div class="flex flex-col">
        <a href="https://cafe.naver.com/ArticleRead.nhn?clubid=31109813&page=1&menuid=7&boardtype=L&articleid=118&referrerAllArticles=false"  target="_blank">
          <img src="/img/2404 업데이트배너.png" alt="2404업데이트배너">
        </a>
      </div>
      <div class="mt-8 lg:mt-0">
      <h2 class="text-3xl font-bold mb-4">업데이트</h2>
      {#if jsonData && jsonData.message && jsonData.message.result}
      {#each jsonData.message.result.articleList as { menuName, menuId, articleId, subject, writeDateTimestamp } (articleId)}
      <a href={`https://cafe.naver.com/ArticleRead.nhn?clubid=31109813&page=1&menuid=${menuId}&boardtype=L&articleid=${articleId}&referrerAllArticles=false`} target="_blank" class="hover:text-blue-500 hover:underline">
        <div class="post py-4 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
          <h3 class="truncate">
            <a href={`https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=${menuId}&search.boardtype=L`} target="_blank"><span class={`boardBg-${menuId} rounded-full px-2 text-white mr-2 hover:bg-blue-600`}>{menuName}</span></a>
            <strong>{new Date(writeDateTimestamp).toLocaleDateString()}</strong>
            {subject}</h3>
        </div>
      </a>
      {/each}
      {:else}
      <p>불러오는 중</p>
    {/if}
    </div>

    </section>

</div>