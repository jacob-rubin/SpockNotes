<script lang="ts">
	import { pbState } from '../../store/pbState.svelte';
	import { goto } from '$app/navigation';

	let email: string;
	let password: string;

	const login = async () => {
		try {
			await pbState.login(email, password);
		} catch (error) {
			console.error('Login error:', error);
			alert('Login failed. Please check your credentials.');
			return;
		}

		console.log(pbState.currentUser);
		if (pbState.currentUser) {
			await goto('/notes');
		} else {
			alert('Login failed. Please check your credentials.');
		}
	};
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center gap-2">
	<form class="flex w-full flex-col items-center justify-center gap-2" onsubmit={login}>
		<input bind:value={email} type="text" placeholder="Email" class="input" />
		<input bind:value={password} type="text" placeholder="Password" class="input" />
		<button class="btn btn-wide btn-lg" type="submit">Login</button>
	</form>
	<div class="divider">OR</div>
	<a role="button" class="btn btn-wide btn-lg" href="/signup">Sign Up</a>
</div>
