<script>
    import { onMount } from 'svelte';
	export let showModal; // boolean

	let dialog; // HTMLDialogElement
    var userLang = "";
    onMount(() => {
        userLang = navigator.language.replace("-", "_");
        //if there's no uipreference cookie, show the modal
        if (document.cookie.indexOf("uipreference") == -1) {
            showModal = true;
        }
        else{
            if (document.cookie.indexOf("uipreference=modern") != -1) {
                window.location.href = "/game?server=0";
            }else{
                window.location.href = "/o/game?server=0";
            }
        }
    });

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
