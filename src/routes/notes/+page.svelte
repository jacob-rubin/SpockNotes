<script lang="ts">
	import TablerPlus from '~icons/tabler/plus';
	import NoteEditor from '$lib/components/NoteEditor.svelte';
	import { noteManager } from '../../store/noteState.svelte';
	import { onMount } from 'svelte';
	import { pbState } from '../../store/authState.svelte';
	import type { DbNote } from '../../utils/types';

	onMount(async () => {
		await pbState.login();
		const notes: DbNote[] = await pbState.getNotes();
		noteManager.loadFromDB(notes);
	});
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<div class="w-96">
		{#each noteManager.getNotes() as note}
			<div class="p-2">
				<NoteEditor {note} />
			</div>
		{/each}
		<button class="btn btn-lg w-full" onclick={() => noteManager.createNote()}>
			<TablerPlus />
		</button>
	</div>
</div>
