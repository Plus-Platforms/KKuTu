<script>
  import { onMount } from 'svelte';
	const title = '혼자도 같이도 즐거운 온라인 단어 게임';
  var isModalOpen = false;

  let jsonData = [];
  let jsonDataFull = [];
  let jsonDataServers = { list: [0], max: 0 };
  const serverName = ["감자", "냉이", "다래", "레몬", "망고", "보리", "상추", "아욱", "20세 이상"];

  //만우절 날짜세기
  function subtractSixYears(timestamp) {
    const date = new Date(timestamp);
    date.setFullYear(date.getFullYear() - 6);
    return date.toLocaleDateString();
  }

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
<div id="Background"></div>
<div class="lg:w-[1010px] mx-auto lg:flex">
  <div class="hidden lg:block w-[260px] lg:mr-[50px]">
    <div class="h-[170px] text-lg py-3 text-white text-center bg-black/20">
      글자로 놀자, 끄투 온라인!
      <img src="/img/kkutu/logo-ingame-dark.svg" class="h-[120px]" alt="로고">
  </div>
  <div>
  {#if jsonDataServers.list[0] == null}
  <p class="mt-16 lg:flex inline-flex text-lg px-4 py-2 text-white">
    현재 서버 점검 진행 중으로, 서버 접속이 불가능합니다.
  </p>
  {:else}
  <a class="w-full" href="https://kkutu.cc/game?server=0">
    <img src="/img/2024fools/gamestart.png" class="transform ease-in duration-100 hover:scale-105" alt="게임 시작!">
  </a>
  {/if}
</div>
  <div class="my-1 text-center bg-blue-900">
    <p class="text-white">▼ 서버 선택</p>
  </div>
  {#each jsonDataServers.list as serverUsers, index}
  <a href={`${serverUsers === null ? "/" : "https://kkutu.cc/game?server="+index}`}>
  <div class="text-white p-2 bg-black/50 transform ease-in duration-100 active:scale-95">
    <h3 class="text-xl font-bold">{serverName[index]} 채널 <span class="font-normal text-gray-500 dark:text-gray-300">{serverUsers === null ? '점검 중' : `${serverUsers} / ${jsonDataServers.max}`}</span></h3>
    <div class="bg-gray-500 h-2 mt-2">
    <div class={`${serverUsers === null ? "bg-transparent" : "bg-green-500"} h-full`} style={`width: ${(serverUsers / jsonDataServers.max) * 100}%`}>
    </div>
    </div>
  </div>
</a>
{/each}
  </div>
  <div class="lg:w-[700px] mb-8">
    <a href="https://discord.gg/5b8kNZJawd" target="_blank">
    <img src="/img/2024fools/discord.png" class="w-full" alt="디스코드">
    </a>
    <div class="mt-1 lg:grid lg:grid-cols-2 lg:gap-4">
      <div>
      <div class="mt-1 text-blue-900 text-lg bg-white px-2">
        <strong>카페 이야기</strong> Cafe Story
      </div>
      <div class="mb-1 bg-black/50 px-2">
        {#if jsonDataFull && jsonDataFull.message && jsonDataFull.message.result}
        {#each jsonDataFull.message.result.articleList as { articleId, subject, writeDateTimestamp, menuName, menuId } (articleId)}
        <a href={`https://cafe.naver.com/ArticleRead.nhn?clubid=31109813&page=1&menuid=${menuId}&boardtype=L&articleid=${articleId}&referrerAllArticles=false`} target="_blank" class="hover:text-blue-500 hover:underline">
          <div class="text-white">
            <h3 class="truncate">
              <a href={`https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=${menuId}&search.boardtype=L`} target="_blank"><span class="text-[#ffff00]">[{menuName}]</span></a>
              {subtractSixYears(writeDateTimestamp)}
              {subject.replace("2024", "2018")}</h3>
          </div>
        </a>
        {/each}
        {:else}
        <p>불러오는 중</p>
        {/if}
      </div>

      <div class="mt-1 text-blue-900 text-lg bg-white px-2">
        <strong>업데이트 내역</strong> Update History
      </div>
      <div class="mb-1 bg-black/50 p-2 h-[180px] overflow-y-scroll">
            
      {#if jsonData && jsonData.message && jsonData.message.result}
      {#each jsonData.message.result.articleList as { menuName, menuId, articleId, subject, writeDateTimestamp } (articleId)}
        <a href={`https://cafe.naver.com/ArticleRead.nhn?clubid=31109813&page=1&menuid=${menuId}&boardtype=L&articleid=${articleId}&referrerAllArticles=false`} target="_blank">
          <div class="text-white">
            <h3 class="truncate">
              <h3 class="text-2xl font-bold text-blue-300">{subtractSixYears(writeDateTimestamp)}</h3>
              {subject}
            </h3>
          </div>
        </a>
      {/each}
      {:else}
      <p>불러오는 중</p>
      {/if}
      
      </div>

      </div>
      <div>
        <div>
            
          <div class="mt-1 text-blue-900 text-lg bg-white px-2">
            <strong>플러스끄투와 더욱 친해져요!</strong>
          </div>
          <div class="mb-1 bg-black/50 px-2 flex justify-center gap-2">
            <a href="https://cafe.naver.com/pluskkutu" target="_blank" class="text-center w-[65px] h-[50px] bg-[#53616c] text-white">
              <img src="/img/2024fools/cafe.png" class="inline-block w-[30px] h-[30px]" alt="카페"><br>
              공식카페
            </a>
            <a href="https://youtube.com/@pluskkutu" target="_blank" class="text-center w-[65px] h-[50px] bg-[#53616c] text-white">
              <img src="/img/2024fools/youtube.jpg" class="inline-block w-[30px] h-[30px]" alt="카페"><br>
              유튜브
            </a>
            <a href="https://discord.gg/5b8kNZJawd" target="_blank" class="text-center w-[65px] h-[50px] bg-[#53616c] text-white">
              <img src="/img/2024fools/discord-old.png" class="inline-block w-[30px] h-[30px]" alt="카페"><br>
              디스코드
            </a>
          </div>
            
          <iframe width="342" height="195" src="https://www.youtube.com/embed/-qOu-WZ_MEM?si=0rfS2weIeUqkHFVq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

          <div class="mt-1 text-blue-900 text-lg bg-white px-2">
            <strong>배너</strong>
          </div>
          <a href="https://www.vultr.com/?ref=9599027-8H" class="mt-1">
          <img src="/img/2024fools/referral.png" class="w-full" alt="Vultr 추천인코드">
          </a>

        </div>
      </div>
    </div>
  </div>
</div>