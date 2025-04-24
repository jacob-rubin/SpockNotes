<script lang="ts">
	import TablerMail from '~icons/tabler/mail';
	import TablerLockPassword from '~icons/tabler/lock-password';
	import { pbState } from '../../store/pbState.svelte';
	import { goto } from '$app/navigation';

	const signup = async () => {
		await pbState.signup(email, password);
		await goto('/notes');
	};

	let email: string;
	let password: string;
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center gap-2">
	<form class="flex w-full flex-col items-center justify-center gap-2" onsubmit={signup}>
		<label class="input">
			<TablerMail />
			<input required bind:value={email} type="email" placeholder="Email" class="grow" />
		</label>
		<label class="input">
			<TablerLockPassword />
			<input
				required
				bind:value={password}
				type="password"
				placeholder="Confirm Password"
				class="grow"
			/>
		</label>
		<button type="submit" class="btn btn-wide btn-lg">Sign Up</button>
	</form>
	<div class="divider">OR</div>
	<a role="button" class="btn btn-wide btn-lg" href="/login">Back to Login</a>
</div>
