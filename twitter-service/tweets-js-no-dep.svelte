<script>
	export let preview
</script>

<div>
	{#each preview as tweet}
	<button>
		{tweet.content}
	</button>
	{/each}
</div>
