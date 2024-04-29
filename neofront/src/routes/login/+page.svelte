<script>
    import { onMount } from 'svelte';
      const title = '로그인';
    var userLang = "";
    onMount(() => {
        userLang = navigator.language.replace("-", "_");
      });
  </script>
  
  <svelte:head>
      <title>플러스끄투 - {title}</title>
  </svelte:head>
  <div class="dark:bg-gray-900 flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img src="/img/kkutu/intro/moremme_light.svg" class="mx-auto dark:hidden h-10" alt="Morem.MELogo"/>
      <img src="/img/kkutu/intro/moremme_dark.svg" class="mx-auto hidden dark:block h-10" alt="Morem.MELogo"/>
      <h2 class="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
        로그인
      </h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <a href="https://kkutu.plus/login/daldalso">
            <button class="bg-[#20318D] text-white mt-4 flex w-full justify-center rounded-xl px-3 py-2 items-center font-semibold leading-6 shadow-sm transform ease-in duration-100 active:scale-95">
            🌛 <span class="text-[#FFE101]">달달소</span>로 로그인
            </button>
            </a>
          <a href="https://kkutu.plus/login/google">
          <button class="bg-gray-100 hover:bg-gray-200 text-black mt-4 flex w-full justify-center rounded-xl px-3 py-2 items-center font-semibold leading-6 shadow-sm transform ease-in duration-100 active:scale-95">
            <img src="/img/web/google.svg" class="h-4 mr-2" alt="Google"/>
            Google로 로그인
          </button>
          </a>
          <a href="https://kkutu.plus/login/kakao">
            <button class="bg-[#FFDE00] text-[#3C1E1E] mt-4 flex w-full justify-center rounded-xl px-3 py-2 items-center font-semibold leading-6 shadow-sm transform ease-in duration-100 active:scale-95">
              <img src="/img/web/kakao.svg" class="h-4 mr-2" alt="Google"/>
              카카오로 로그인
            </button>
          </a>
          <a href="https://kkutu.plus/login/discord">
            <button class="bg-[#5865F2] text-white mt-4 flex w-full justify-center rounded-xl px-3 py-2 items-center font-semibold leading-6 shadow-sm transform ease-in duration-100 active:scale-95">
              <img src="/img/web/discord.svg" class="h-4 mr-2" alt="Google"/>
              디스코드로 로그인
            </button>
          </a>
          <a href="https://kkutu.plus/login/naver">
            <button class="bg-[#03C75A] text-white mt-4 flex w-full justify-center rounded-xl px-3 py-2 items-center font-semibold leading-6 shadow-sm transform ease-in duration-100 active:scale-95">
              네이버 로그인 예정
            </button>
          </a>
          <a href="/">
            <button class="bg-gray-500 hover:bg-gray-600 text-white mt-4 flex w-full justify-center rounded-xl px-3 py-2 items-center font-semibold leading-6 shadow-sm transform ease-in duration-100 active:scale-95">
              익명으로 플레이
            </button>
            </a>
        </div>
      <p class="mt-10 text-center text-sm text-gray-500 dark:text-gray-300">
        로그인이 이루어지면 Morem.ME의 
        <a href="https://cafe.naver.com/pluskkutu/109" class="font-semibold leading-6 text-purple-600 hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-500">
          이용약관
        </a>
        과 <a href="https://cafe.naver.com/pluskkutu/110" class="font-semibold leading-6 text-purple-600 hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-500">
          개인정보처리방침
        </a>에 동의하는 것으로 간주합니다.<br><br>
        <a href="https://kkutu.plus/login/old" class="font-semibold leading-6 text-purple-600 hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-500">
          이전 레이아웃으로 돌아가기
        </a>
        
      </p>
    </div>
  </div>