<script lang="ts">
	import type { AuthRecord, RecordModel, RecordSubscription, UnsubscribeFunc } from 'pocketbase';
	import { pbState } from '../../store/pbState.svelte';
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import NoteEditor from '$lib/components/NoteEditor.svelte';
	import type { DbNote } from '../../utils/types';
	import { Note } from '../../store/noteState.svelte';

	let notes: Note[] = $state([]);
	let unsubscribe: UnsubscribeFunc;

	onMount(async () => {
		// Set notes
		notes = await pbState.pb.collection('notes').getFullList<DbNote>(100, {
			filter: `user = "${pbState.currentUser?.id}"`,
			sort: '-created'
		});

		// Note listener
		unsubscribe = await pbState.pb
			.collection('notes')
			.subscribe('*', async ({ action, record }) => {
				if (action == 'create') {
					// add note
					notes.push(new Note(record as DbNote));
				}
				if (action == 'update') {
					// update note
					console.log('Note subscription:', record);
					const note = notes.find((n: Note) => n.id === record.id);
					if (note) {
						note.title = record.title;
						note.content = record.content;
					}
				}
				if (action == 'delete') {
					notes = notes.filter((n: Note) => n.id !== record.id);
				}
			});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});

	const logout = async () => {
		pbState.logout();
		await goto('/login');
	};

	const addNote = async () => {
		await pbState.pb.collection('notes').create({
			title: 'New Note',
			content: 'New Note Content',
			user: pbState.currentUser?.id
		});
	};

	async function getEmail(): Promise<string> {
		if (pbState.currentUser) {
			return pbState.getUser(pbState.currentUser.id).then((auth: AuthRecord) => {
				if (auth) {
					return auth.email;
				} else {
					return 'Email not found';
				}
			});
		}
		return 'Not signed in';
	}
</script>

<p>Current User ID: {pbState.currentUser?.id}</p>
{#await getEmail() then email}
	<p>Your email is: {email}</p>
{/await}
<button class="btn btn-wide" onclick={logout}>Logout</button>

<div class="flex h-screen w-screen flex-col items-center justify-center gap-2">
	{#each notes as note (note.id)}
		<NoteEditor {note} />
	{/each}
	<button class="btn btn-wide" onclick={addNote}>Add Note</button>
</div>
