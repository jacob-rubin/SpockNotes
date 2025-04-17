<script lang="ts">
	import { noteManager, type Note } from '../../store/noteState.svelte';

	interface Props {
		note: Note;
	}

	let { note }: Props = $props();
</script>

<div class="card card-sm card-border w-96 shadow-xs">
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
