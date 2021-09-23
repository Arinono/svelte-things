<script lang="ts">
	import { getTweets } from "./getTweets.action.js" 
	export let onPreview: any
	const { outputs, preview } = getTweets.addPreview(onPreview)
</script>

<div>
	{#each preview as tweet}
	<button>
		{tweet.content}
	</button>
	{/each}
</div>
