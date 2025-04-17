<script lang="ts">
	import TablerPlus from '~icons/tabler/plus';
	import NoteEditor from '$lib/components/NoteEditor.svelte';
	import { noteManager } from '../../store/noteState.svelte';

	noteManager.createNote();
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	{#each noteManager.getNotes() as note}
		<div class="p-2">
			<NoteEditor {note} />
		</div>
	{/each}
	<button class="btn btn-wide btn-lg" onclick={() => noteManager.createNote()}>
		<TablerPlus />
	</button>
</div>
