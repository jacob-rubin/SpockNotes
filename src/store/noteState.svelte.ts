import { v4 as uuidv4 } from 'uuid';

export class Note {
	#id: string;
	#title: string = $state('');
	#content: string = $state('');

	constructor() {
		this.#id = uuidv4();
		this.#title = 'Untitled Note';
		this.#content = '';
	}

	get id() {
		return this.#id;
	}

	get title() {
		return this.#title;
	}

	set title(title: string) {
		this.#title = title;
	}

	get content() {
		return this.#content;
	}

	set content(content: string) {
		this.#content = content;
	}
}

class NoteManager {
	#notes: Note[] = $state([]);

	getNoteById(id: string): Note {
		const note: Note | undefined = this.#notes.find((note) => note.id === id);

		if (!note) {
			throw new Error(`Note with id ${id} not found`);
		}

		return note;
	}

	getNotes(): Note[] {
		return this.#notes;
	}

	createNote() {
		const note = new Note();
		this.#notes.push(note);
	}

	updateTitle(id: string, title: string) {
		const note: Note | undefined = this.#notes.find((note) => note.id === id);

		if (!note) {
			throw new Error(`Note with id ${id} not found`);
		}

		note.title = title;
	}

	updateContent(id: string, content: string) {
		const note: Note | undefined = this.#notes.find((note) => note.id === id);

		if (!note) {
			throw new Error(`Note with id ${id} not found`);
		}

		note.content = content;
	}

	deleteNote(id: string) {
		const noteIndex: number = this.#notes.findIndex((note) => note.id === id);

		if (noteIndex === -1) {
			throw new Error(`Note with id ${id} not found`);
		}

		this.#notes.splice(noteIndex, 1);
	}

	clear() {
		this.#notes = [];
	}
}

export const noteManager = new NoteManager();
