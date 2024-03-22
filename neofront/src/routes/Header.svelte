<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	

</script>

<header class="top-0 bg-[#252d3d] py-4 lg:py-0 w-full z-10">
	<nav class="max-w-screen-2xl mx-auto flex items-center justify-between px-4 lg:px-8 lg:py-0" aria-label="Global">
	  <div class="flex lg:flex-1">
		<a href="/">
	  <button class="-m-1.5 p-1.5 md:flex"><span class="sr-only">플러스끄투</span><img class="h-6" src="/img/logo_dark.png" alt=""/></button>
	</a>
	  </div>
	  <div class="hidden lg:flex text-white">
		<a href="https://kkutu.cc/login"
					  class="mr-6 text-2xl flex font-bold leading-5 py-3 pt-5 text-right">
					<div>로그인
					<br><span class="text-sm text-[#ffff00] font-medium">로그인을 하고 더욱 즐거운 플러스끄투를 즐겨보세요!</span>
				</div>
				<img src="img/2024fools/logout.png" alt="로그아웃" class="h-12 -mt-2 pl-2">
						  </a>
				  </div>
	  <div class="lg:hidden flex flex-1 justify-end">
					  <div>
					  <a
	href="https://kkutu.cc/game?server=0"
	class="flex items-center justify-center text-white text-lg lg:text-3xl h-full px-2 lg:py-4 lg:px-12 transform ease-in duration-100 active:scale-95 bg-white/20"
	style="transform: skew(-10deg);"
  >
	<span class="font-bold tracking-wide">게임시작</span>
  </a>
  
								</div>
		  
	  </div>
	</nav>
  </header>

  <div class="hidden lg:block bg-[#EEBB33] text-[#111111] text-center font-semibold py-1 text-xl">
	플러스끄투가 2018년을 맞아 새로워졌습니다! 자세한 내용은 카페 공지사항을 확인해주세요.
  </div>