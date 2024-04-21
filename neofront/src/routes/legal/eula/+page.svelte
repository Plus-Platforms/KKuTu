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