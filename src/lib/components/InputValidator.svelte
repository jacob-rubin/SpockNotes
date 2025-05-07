<script lang="ts">
	import TablerMail from '~icons/tabler/mail';
	import TablerLockPassword from '~icons/tabler/lock-password';

	interface Props {
		name: string;
		type: 'email' | 'password';
		placeholder: string;
		hint: string;
	}

	let { name, type, placeholder, hint }: Props = $props();
</script>

<div>
	<label class="input validator">
		{#if type === 'email'}
			<TablerMail />
		{:else if type === 'password'}
			<TablerLockPassword />
		{/if}
		<input class="grow" {name} {type} required {placeholder} />
	</label>
	<p class="validator-hint">{hint}</p>
</div>
