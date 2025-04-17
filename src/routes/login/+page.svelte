<script lang="ts">
	import { goto } from '$app/navigation';
	import { pbState } from '../../store/authState.svelte';

	const login = async () => {
		await pbState.login();
		goto('/notes');
	};
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center gap-4 p-2">
	<input type="text" placeholder="Login" class="input" />
	<input type="text" placeholder="Password" class="input" />
	<button class="btn btn-wide btn-lg" onclick={login}>Login</button>
</div>
