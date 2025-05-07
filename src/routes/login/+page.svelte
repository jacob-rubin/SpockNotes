<script>
	import InputValidator from '$lib/components/InputValidator.svelte';
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center gap-2">
	<form
		class="flex w-full flex-col items-center justify-center gap-2"
		method="POST"
		action="?/login"
	>
		<InputValidator
			name="email"
			type="email"
			placeholder="mailto@email.com"
			hint="Must be valid email"
		/>
		<InputValidator
			name="password"
			type="password"
			placeholder="Password"
			hint="Must be valid email"
		/>
		<button class="btn btn-wide btn-lg" type="submit">Login</button>
	</form>
	<div class="divider">OR</div>
	<a role="button" class="btn btn-wide btn-lg" href="/signup">Sign Up</a>
</div>
