<script>
	// @ts-ignore
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	// @ts-ignore
	/**
	 * @type {HTMLElement | null}
	 */
	let flyoutMenu = null;
	onMount(() => {
		flyoutMenu = document.getElementById('flyoutMenu');
	});
</script>

<header class="top-0 fixed w-full z-10">
	<div class="bg-gray-900/70 backdrop-blur-xl lg:py-0 py-4">
		<nav class="max-w-screen-xl mx-auto flex items-center justify-between px-4 lg:px-8 lg:py-0" aria-label="Global">
		<div class="flex lg:flex-1">
			<a href="/">
		<button class="-m-1.5 p-1.5 md:flex"><span class="sr-only">플러스끄투</span><img class="h-6" src="/img/kkutu/logo-top.svg" alt=""/></button>
		</a>
		</div>
		<!-- svelte-ignore a11y-misplaced-role -->
		<div class="lg:py-4 hidden lg:flex text-white"
		role="tooltip"
		on:mouseenter={() => {
			if (flyoutMenu) {
				flyoutMenu.classList.add('block');
				flyoutMenu.classList.remove('hidden');
			}
		}}
		on:mouseleave={() => {
			if (flyoutMenu) {
				flyoutMenu.classList.add('hidden');
				flyoutMenu.classList.remove('block');
			}
		}}>
			<a href="/howto"
					class="hidden lg:block mr-6 text-xl flex rounded-xl py-2 px-2 transform ease-in duration-100 active:scale-95 hover:backdrop-blur-lg hover:bg-white/20">
						게임 소개
						</a>
			<button
						class="lg:mr-6 text-xl flex rounded-xl py-2 px-2 transform ease-in duration-100 active:scale-95 hover:backdrop-blur-lg hover:bg-white/20">
						소식
					</button>
			<button
						class="lg:mr-6 text-xl flex rounded-xl py-2 px-2 transform ease-in duration-100 active:scale-95 hover:backdrop-blur-lg hover:bg-white/20">
						커뮤니티
					</button>
			<button
					class="lg:mr-6 text-xl flex rounded-xl py-2 px-2 transform ease-in duration-100 active:scale-95 hover:backdrop-blur-lg hover:bg-white/20">
					고객지원
				</button>
					</div>
		<div class="flex flex-1 justify-end">
			<a href="/login"
			class="text-white text-xl flex rounded-xl py-2 px-2 transform ease-in duration-100 active:scale-95 hover:backdrop-blur-lg hover:bg-white/20">
			로그인
			</a>
		</div>
		</nav>
	</div>
	<div class="hidden absolute inset-x-0 top-full text-sm text-gray-500" id="flyoutMenu" role="tooltip"
	on:mouseenter={() => {
		if (flyoutMenu) {
			flyoutMenu.classList.add('block');
			flyoutMenu.classList.remove('hidden');
		}
	}}
	on:mouseleave={() => {
		if (flyoutMenu) {
			flyoutMenu.classList.add('hidden');
			flyoutMenu.classList.remove('block');
		}
	}}>
		<div class="relative bg-gray-800/70 backdrop-blur-lg text-white">
		  <div class="mx-auto max-w-7xl px-8">
			<div class="grid grid-cols-1 gap-x-8 gap-y-10 py-16">
			  <div class="row-start-1 grid grid-cols-4 gap-x-8 gap-y-10 text-lg">
				<div>
				  <p id="Brands-heading" class="font-bold text-2xl text-white">
					게임 소개
				  </p>
				  <ul role="list" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
					<li class="flex">
						<a href="/howto" target="_blank" class="text-gray-200 hover:text-gray-400">
						게임 소개</a>
					  </li>
					<li class="flex">
					  <a href="https://free.kkutu.kr" target="_blank" class="text-gray-200 hover:text-gray-400">
						끄투 박물관</a>
					</li>
				  </ul>
				</div>
				<div>
					<p id="Brands-heading" class="font-bold text-2xl text-white">
					  소식
					</p>
					<ul role="list" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
					  <li class="flex">
						  <a href="https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=7&search.boardtype=L" target="_blank" class="text-gray-200 hover:text-gray-400">
						  공지사항</a>
						</li>
					  <li class="flex">
						<a href="https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=8&search.boardtype=L" target="_blank" class="text-gray-200 hover:text-gray-400">
						  업데이트</a>
					  </li>
					  <li class="flex">
						<a href="https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=14&search.boardtype=L" target="_blank" class="text-gray-200 hover:text-gray-400">
						  개발자노트</a>
					  </li>
					  <li class="flex">
						<a href="https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=9&search.boardtype=L" target="_blank" class="text-gray-200 hover:text-gray-400">
						  점검안내</a>
					  </li>
					  <li class="flex">
						<a href="https://cafe.naver.com/ArticleList.nhn?search.clubid=31109813&search.menuid=6&search.boardtype=W" target="_blank" class="text-gray-200 hover:text-gray-400">
						  인게임 이벤트</a>
					  </li>
					</ul>
				  </div>
				  <div>
					<p id="Brands-heading" class="font-bold text-2xl text-white">
					  커뮤니티
					</p>
					<ul role="list" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
					  <li class="flex">
						  <a href="https://cafe.naver.com/pluskkutu" target="_blank" class="text-gray-200 hover:text-gray-400">
						  네이버 카페</a>
						</li>
						<li class="flex">
							<a href="https://discord.gg/bt25WdwzR7" target="_blank" class="text-gray-200 hover:text-gray-400">
							디스코드 서버</a>
						</li>
					</ul>
				  </div>
				  <div>
					<p id="Brands-heading" class="font-bold text-2xl text-white">
					  고객지원
					</p>
					<ul role="list" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
					  <li class="flex">
						  <a href="https://pcor.me/kkutu/coupon" target="_blank" class="text-gray-200 hover:text-gray-400">
						  쿠폰 등록</a>
						</li>
						<li class="flex">
							<a href="mailto:support@kkutu.plus" target="_blank" class="text-gray-200 hover:text-gray-400">
						  이메일 문의</a>
						</li>
						<li class="flex">
							<a href="https://morem.me" target="_blank" class="text-gray-200 hover:text-gray-400">
						  모렘미 소개</a>
						</li>
						<li class="flex">
							<a href="https://cafe.naver.com/ArticleRead.nhn?clubid=31109813&menuid=7&boardtype=L&page=1&specialmenutype=&userDisplay=15&articleid=119" target="_blank" class="text-gray-200 hover:text-gray-400">
						  확률형 아이템</a>
						</li>
					</ul>
				  </div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>

  </header>

  