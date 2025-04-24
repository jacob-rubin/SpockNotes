export type Note = {
	content: string;
	title: string;
};

type NoteCollection = {
	collectionId: string;
	collectionName: 'notes';
	created: Date;
	id: string;
	updated: Date;
	user: string;
};

export type DbNote = Note & NoteCollection;
