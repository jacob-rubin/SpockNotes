<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	onMount(() => {
		console.log('Page mounted!');
		console.log('Data:', data);
	});
</script>

<form
	class="flex h-screen w-screen flex-col items-center justify-center gap-2"
	method="POST"
	action="?/logout"
>
	<p>Email: {data.user?.email}</p>
	<button class="btn btn-wide" type="submit">Logout</button>
</form>
