<script lang="ts">
	import { noteManager, type Note } from '../../store/noteState.svelte';
	import TablerTrash from '~icons/tabler/trash';

	interface Props {
		note: Note;
	}

	let { note }: Props = $props();

	const deleteNote = () => {
		noteManager.deleteNote(note.id);
	};
</script>

<div class="flex flex-row items-center justify-between gap-2">
	<div class={`card card-sm card-border w-full shadow-xs`}>
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
	<button class="btn" onclick={deleteNote}>
		<TablerTrash />
	</button>
</div>
