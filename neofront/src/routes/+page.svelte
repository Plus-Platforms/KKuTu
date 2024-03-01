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
});
</script>

<svelte:head>
	<title>플러스끄투 - {title}</title>
</svelte:head>

<div  class="dark:bg-gray-900 dark:text-white">
<section class="hero w-full py-12 md:py-24 lg:py-32">
  <div class="mx-auto max-w-screen-2xl container px-4 md:px-6">
    <div class="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
      <div>
        <!--
          <h1 class="text-center lg:text-left text-3xl font-bold tracking-tight text-[#8B5CF6] sm:text-4xl md:text-5xl lg:text-6xl">
      어서와요, 플끄!
      </h1>
        -->
      <h1 class="text-white text-center lg:text-left text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
        Phase 2 업데이트
      </h1>
      <p class="text-white mt-2 text-center lg:text-left sm:text-2xl tracking-tight text-black">
        무언가 다른 끄투를 보여드리겠습니다
      </p>
      <div class="justify-center flex items-center lg:justify-start lg:items-start">
     <!-- <a href="https://plus.oqupie.com/portal/2568/request?type=16783">
        <button class="mt-3 px-3 bg-blue-500 font-bold text-white text-center m-auto py-2 transform ease-in duration-100 active:scale-95 hover:bg-blue-700">
          경험치 인정받기
      </button>
    </a>-->
    </div>
    </div>
      <div class="flex flex-col">
        <a
          class="gs hidden lg:flex inline-flex text-5xl items-center justify-center px-16 py-6 text-center text-white font-bold shadow transition-colors disabled:pointer-events-none disabled:opacity-50 bg-gray-50 hover:bg-gray-50/90 focus-visible:ring-gray-300"
          href="https://kkutu.cc/game?server=0"
        >
          GAME<br>
          START
        </a>
        <a
          class="download-link hidden lg:flex inline-flex text-xl items-center justify-center px-4 py-2 text-sm font-medium text-gray-400 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 bg-blue-900 hover:bg-blue-950 focus-visible:ring-gray-300"
          href="#"
          on:click="{() => showModal()}"
        >
         게임 다운로드
        </a>
      </div>
    </div>
  </div>
</section>

<div class="modal">
  <div class="modal-content">
    <button on:click="{() => isModalOpen = false}" class="modal-close text-2xl text-gray-500">×</button>
    <h3 class="text-3xl font-bold text-center dark:text-black">PC 클라이언트 다운로드</h3>
    <p class="text-gray-500 text-center">현재 Windows 기기만 지원합니다. (macOS 추후 지원 예정)</p>
    <div class="px-4 w-full">
      <a href="https://github.com/Plus-Platforms/KKuTu/releases/download/1.0.0/install-1.0.0.exe">
      <button class="mt-3 px-3 w-full bg-blue-500 font-bold text-white text-center m-auto py-2 transform ease-in duration-100 active:scale-95 hover:bg-blue-700">
        V 1.0.0 다운로드<br/>
      (2024/02/01)
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

<section class="max-w-screen-2xl mx-auto my-10 p-4 md:grid md:grid-cols-2">
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
<div class="justify-end items-end flex">
  <a href="https://cafe.naver.com/ArticleRead.nhn?clubid=31109813&page=1&menuid=7&boardtype=L&articleid=52&referrerAllArticles=false"  target="_blank">
  <img src="/img/삼일절우측.png" alt="삼일절배너">
</a>
</div>
</section>
<div class="overflow-hidden bg-gray-100 py-24 dark:bg-gray-800 dark:text-white">
      <div class="mx-auto max-w-screen-2xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pr-8 lg:pt-4">
            <div class="lg:max-w-lg">
              <h2 class="text-base font-semibold leading-7 text-[#8B5CF6] dark:text-purple-300">플러스끄투에서만 만나다</h2>
              <p class="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-gray-100">다른 끄투와 전격비교!</p>
              <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Google, Kakao, Discord 등 지원하는 모든 SNS를 통해 로그인 하여 모바일과 PC에서 게임을 즐길 수 있습니다.
              </p>

              <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-400 lg:max-w-none">
                <div class="relative pl-9">
                  <dt class="inline font-semibold text-gray-900 dark:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute left-1 top-1 h-5 w-5 text-[#3B82F6]">
                      <path fill-rule="evenodd" d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                    </svg>
                    높은 해상도 지원.
                  </dt>
                  <dd class="inline">PC 기준 가로 900픽셀의 원작 끄투 대비 1600픽셀로 증가한 해상도</dd>
                </div>
                <div class="relative pl-9">
                  <dt class="inline font-semibold text-gray-900 dark:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute left-1 top-1 h-5 w-5 text-[#3B82F6]">
                      <path fill-rule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z" clip-rule="evenodd" />
                    </svg>
                    PC 클라이언트.
                  </dt>
                  <dd class="inline">PC 클라이언트로 편리하게 접속하고 Discord 상태 공유가 가능한 끄투</dd>
                </div>
                <div class="relative pl-9 hidden">
                  <dt class="inline font-semibold text-gray-900 dark:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute left-1 top-1 h-5 w-5 text-[#3B82F6]">
                      <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                      <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                      <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                      <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                    </svg>
                    
                    핑 충전.
                  </dt>
                  <dd class="inline">커뮤니티 채팅이나 이벤트 참여로 얻을 수 있는 PlusCoin으로 핑을 충전</dd>
                </div>
              </dl>
            </div>
          </div>
          <img
            src="/img/gameclient.png"
            alt="인게임 화면"
            class="w-[48rem] max-w-none shadow-xl sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
    <section class="max-w-screen-2xl mx-auto my-10 p-4 md:grid md:grid-cols-2">
      <div class="flex flex-col">
      <a href="https://free.kkutu.kr"  target="_blank">
        <img src="/img/daldalso.png" alt="달달소">
      </a>
      </div>
      <div>
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
    <div class="bg-gray-100 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">
          게임 소식 가장 먼저 받기
        </h2>
        <div class="max-w-lg mx-auto mt-10 grid grid-cols-2 gap-x-8 items-center jusitfy-center">
          <div class="flex items-center justify-center">
          <a href="https://cafe.naver.com/pluskkutu" target="_blank">
          <img
            class="col-span-2 max-h-8 w-full object-contain lg:col-span-1"
            src="/img/cafe.png"
            alt="NaverCafe"
            width={48}
            height={48}
          /></a>
        </div>

      <div class="flex items-center justify-center">
        <a href="https://discord.gg/5b8kNZJawd" target="_blank">
        <img
          class="col-span-2 max-h-8 w-full object-contain lg:col-span-1"
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