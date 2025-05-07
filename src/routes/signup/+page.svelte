<script lang="ts">
	import InputValidator from '$lib/components/InputValidator.svelte';
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center gap-2">
	<form class="flex w-full flex-col items-center" method="POST" action="?/signup">
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
		<InputValidator
			name="passwordConfirm"
			type="password"
			placeholder="Confirm Password"
			hint="Must be valid email"
		/>
		<button type="submit" class="btn btn-wide btn-lg">Sign Up</button>
	</form>
	<div class="divider">OR</div>
	<a role="button" class="btn btn-wide btn-lg" href="/login">Back to Login</a>
</div>
