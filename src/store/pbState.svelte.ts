import { PUBLIC_PB_URL } from '$env/static/public';
import PocketBase, { type AuthRecord, type RecordAuthResponse } from 'pocketbase';

class PbState {
	#pb: PocketBase = new PocketBase(PUBLIC_PB_URL);
	#currentUser: AuthRecord = $state(this.#pb.authStore.record);

	constructor() {
		this.#pb.authStore.onChange((auth) => {
			console.log('Auth store changed:', auth);
			this.#currentUser = this.#pb.authStore.record;
		});
	}

	get currentUser(): AuthRecord {
		return this.#currentUser;
	}

	get pb(): PocketBase {
		return this.#pb;
	}

	async login(username: string, password: string): Promise<void> {
		const authResponse: RecordAuthResponse<AuthRecord> = await this.#pb
			.collection('users')
			.authWithPassword(username, password);
		this.#currentUser = authResponse.record;
	}

	async signup(email: string, password: string): Promise<void> {
		const data = {
			email: email,
			password: password,
			passwordConfirm: password
		};
		await this.#pb.collection('users').create(data);
		await this.login(email, password);
	}

	async getUser(id: string): Promise<AuthRecord> {
		const user: AuthRecord = await this.#pb.collection('users').getOne(id);
		return user;
	}

	logout(): void {
		this.#pb.authStore.clear();
		this.#currentUser = null;
	}

	// async subscribeToNotes(
	// 	onCreate: (note: RecordModel) => void,
	// 	onUpdate: (note: RecordModel) => void,
	// 	onDelete: (note: RecordModel) => void
	// ): Promise<UnsubscribeFunc> {
	// 	return await this.#pb.collection('notes').subscribe(
	// 		'*',
	// 		({ action, record }) => {
	// 			if (action === 'create') {
	// 				console.log('Note created:', record);
	// 				onCreate(record);
	// 			} else if (action === 'update') {
	// 				console.log('Note updated:', record);
	// 				onUpdate(record);
	// 			} else if (action === 'delete') {
	// 				console.log('Note deleted:', record);
	// 				onDelete(record);
	// 			}
	// 		},
	// 		{
	// 			filter: `user.id = "${this.#currentUser?.id}"`
	// 		}
	// 	);
	// }

	// async getNotes(): Promise<DbNote[]> {
	// 	const notes: ListResult<RecordModel> = await this.#pb.collection('notes').getList(1, 50, {
	// 		filter: `user.id = "${this.#currentUser?.id}"`,
	// 		sort: '-created'
	// 	});

	// 	return notes.items.map((note: RecordModel) => {
	// 		return note as DbNote;
	// 	});
	// }

	// async addNote(note: Note): Promise<DbNote> {
	// 	return await this.#pb.collection('notes').create({
	// 		...note,
	// 		user: this.#currentUser?.id
	// 	});
	// }
}

export const pbState = new PbState();
