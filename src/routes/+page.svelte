<script lang="ts">
	import { onMount } from 'svelte';
	import { pbState } from '../store/pbState.svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		if (pbState.currentUser) {
			await goto('/notes');
		} else {
			await goto('/login');
		}
	});
</script>
