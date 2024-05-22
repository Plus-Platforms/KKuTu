<script>
  	import { page } from '$app/stores';
	
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';
	import '../app.css';
</script>

<div class="app">
	{#if $page.url.pathname.includes('moremtalk')}
	<slot />
  {:else}
  	<Header/>
		<main>
		<slot />
		</main>  
	<Footer />
  {/if}
</div>