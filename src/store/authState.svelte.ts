import PocketBase, { type ListResult, type RecordAuthResponse, type RecordModel } from 'pocketbase';
import { PUBLIC_PB_EMAIL, PUBLIC_PB_PASSWORD, PUBLIC_PB_URL } from '$env/static/public';
import type { DbNote } from '../utils/types';

class PbState {
	#pb: PocketBase;
	#authData: RecordAuthResponse<RecordModel> | null;

	constructor() {
		this.#pb = new PocketBase(PUBLIC_PB_URL);
		this.#authData = null;
	}

	get authData(): RecordAuthResponse<RecordModel> | null {
		return this.#authData;
	}

	async login(): Promise<void> {
		this.#authData = await this.#pb
			.collection('users')
			.authWithPassword(PUBLIC_PB_EMAIL, PUBLIC_PB_PASSWORD);

		console.log('Logged in:', this.#authData);
	}

	async getNotes(): Promise<DbNote[]> {
		const notes: ListResult<RecordModel> = await this.#pb.collection('notes').getList(1, 50, {
			filter: `user = "${this.#authData?.record.id}"`,
			sort: '-created'
		});

		return notes.items.map((note: RecordModel) => {
			return note as DbNote;
		});
	}

	logout(): void {
		this.#pb.authStore.clear();
		this.#authData = null;
	}
}

export const pbState = new PbState();
