<script>
	const title = 'Main';

</script>

<svelte:head>
	<title>{title} - 플러스끄투</title>
</svelte:head>

<div class="hero hidden lg:block">
	<span class="sr-only">혼자도 같이도 즐거운 온라인 단어 게임, 플러스끄투!</span>
</div>
<div class="m-hero lg:hidden">
	<span class="sr-only">혼자도 같이도 즐거운 온라인 단어 게임, 플러스끄투!</span>
</div>

<div class="overflow-hidden bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pr-8 lg:pt-4">
            <div class="lg:max-w-lg">
              <h2 class="text-base font-semibold leading-7 text-purple-500">크로스 플랫폼 게임 플레이</h2>
              <p class="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">언제 어디서나<br/>온라인 단어 게임!</p>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                Google, Kakao, Discord 등 지원하는 모든 SNS를 통해 로그인 하여 모바일과 PC에서 게임을 즐길 수 있습니다.
              </p>
            </div>
          </div>
          <img
            src="/screely-1703772701230.png"
            alt="인게임 화면"
            class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>

    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 class="text-center text-lg font-semibold leading-8 text-gray-900">
          게임 소식 가장 먼저 받기
        </h2>
        <div class="mx-auto mt-10 grid max-w-lg grid-cols-1 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-1 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-1">
          <a href="https://cafe.naver.com/pluskkutu">
          <img
            class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="/navercafe.webp"
            alt="NaverCafe"
            width={48}
            height={48}
  /></a>
        </div>
      </div>
    </div>
