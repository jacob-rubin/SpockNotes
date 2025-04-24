import type { DbNote } from '../utils/types';

export class Note implements Pick<DbNote, 'title' | 'content' | 'id'> {
	id: string;
	title: string = $state('');
	content: string = $state('');

	constructor(note: DbNote) {
		this.id = note.id;
		this.title = note.title;
		this.content = note.content;
	}
}
