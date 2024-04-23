<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	

</script>

<header class="top-0 fixed w-full z-10">
	<div class="bg-gray-900/70 backdrop-blur-xl lg:py-0 py-4">
		<nav class="max-w-screen-xl mx-auto flex items-center justify-between px-4 lg:px-8 lg:py-0" aria-label="Global">
		<div class="flex lg:flex-1">
			<a href="/">
		<button class="-m-1.5 p-1.5 md:flex"><span class="sr-only">플러스끄투</span><img class="h-6" src="/img/logo_dark.png" alt=""/></button>
		</a>
		</div>
		<div class="hidden py-4 lg:flex text-white">
			<a href="/howto"
					class="mr-6 text-xl flex rounded-xl py-2 px-2 transform ease-in duration-100 active:scale-95 hover:backdrop-blur-lg hover:bg-white/20">
						게임 소개
						</a>
			<a href="/login"
						class="mr-6 text-xl flex rounded-xl py-2 px-2 transform ease-in duration-100 active:scale-95 hover:backdrop-blur-lg hover:bg-white/20">
						로그인
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
</div>
  </header>

  