type Note = {
	content: string;
	title: string;
};

export type DbNote = Note & {
	collectionId: string;
	collectionName: 'notes';
	created: Date;
	id: string;
	updated: Date;
	user: string;
};
