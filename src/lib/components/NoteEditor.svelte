<script lang="ts">
	import type { Note } from '../../store/noteState.svelte';

	interface Props {
		note: Note;
	}

	let { note = $bindable() }: Props = $props();
</script>

<div class="card card-sm card-border w-96 shadow-md">
	<div class="card-body">
		<input
			type="text"
			class="input input-bordered card-title w-full"
			bind:value={note.title}
			placeholder="Title"
		/>
		<textarea class="textarea w-full" placeholder="Note" bind:value={note.content}></textarea>
	</div>
</div>
