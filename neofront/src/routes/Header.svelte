<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	

</script>

<header class="py-4 lg:py-0 backdrop-blur-lg bg-white/70 dark:bg-black/70 sticky top-0 md:shadow-md w-full z-10">
	<nav class="max-w-screen-2xl mx-auto flex items-center justify-between px-4 lg:px-8 lg:py-0" aria-label="Global">
	  <div class="flex lg:flex-1">
		<a href="/">
	  <button class="-m-1.5 p-1.5 md:flex"><span class="sr-only">플러스끄투</span><img class="dark:hidden h-6" src="/img/logo.png" alt=""/><img class="hidden dark:block h-6" src="/img/logo_dark.png" alt=""/></button>
	</a>
	  </div>
	  <div class="hidden py-4 lg:flex dark:text-white">

		<a href="https://cafe.naver.com/pluskkutu"
			  class="mr-6 text-xl flex rounded-xl py-2 px-2 transform ease-in duration-100 active:scale-95 hover:bg-gray-100 dark:hover:bg-gray-800 hover:underline hover:font-semibold hover:text-purple-500">
				  카페
				  </a>
		
		<a href="https://discord.gg/5b8kNZJawd"
				  class="mr-6 text-xl flex rounded-xl py-2 px-2 transform ease-in duration-100 active:scale-95 hover:bg-gray-100 dark:hover:bg-gray-800 hover:underline hover:font-semibold hover:text-purple-500">
					  디스코드
					  </a>
		
		<a href="https://plus.oqupie.com/portal/2568"
					  class="mr-6 text-xl flex rounded-xl py-2 px-2 transform ease-in duration-100 active:scale-95 hover:bg-gray-100 dark:hover:bg-gray-800 hover:underline hover:font-semibold hover:text-purple-500">
						  고객지원
						  </a>

		<a href="https://kkutu.cc/login"
						  class="mr-6 text-xl flex rounded-xl py-2 px-2 transform ease-in duration-100 active:scale-95 hover:bg-gray-100 dark:hover:bg-gray-800 hover:underline hover:font-semibold hover:text-purple-500">
							  로그인
							  </a>
				  </div>
	  <div class="lg:hidden flex flex-1 justify-end">
					  <div>
					  <a
	href="https://kkutu.cc/game?server=0"
	class="flex items-center justify-center text-white text-lg lg:text-3xl h-full px-2 lg:py-4 lg:px-12 transform ease-in duration-100 active:scale-95 bg-gradient-to-b md:bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 lg:hover:text-4xl"
	style="transform: skew(-10deg);"
  >
	<span class="font-bold tracking-wide">게임시작</span>
  </a>
  
								</div>
		  
	  </div>
	</nav>
  </header>
  <div class="fixed top-1/3 right-0 transform"><div class="items-end justify-end flex flex-col">
	<a href="https://cafe.naver.com/pluskkutu">
		<button class="lg:hidden transform ease-in duration-100 bg-black/70 border hover:bg-blue-600/70 hover:px-8 text-white px-4 py-2 text-lg">
		카페</button>
	</a>
	<a href="https://discord.gg/5b8kNZJawd">
		<button class="lg:hidden transform ease-in duration-100 bg-black/70 border hover:bg-blue-600/70 hover:px-8 text-white px-4 py-2 text-lg">
		디스코드</button>
	</a>
	<a href="https://plus.oqupie.com/portal/2568">
		<button class="lg:hidden transform ease-in duration-100 bg-black/70 border hover:bg-blue-600/70 hover:px-8 text-white px-4 py-2 text-lg">
		고객지원</button>
	</a>
	<a href="#">
		<button class="transform ease-in duration-100 bg-black/70 border hover:bg-blue-600/70 hover:px-8 text-white px-4 py-2 text-lg">TOP</button>
	</a>
</div></div>

  