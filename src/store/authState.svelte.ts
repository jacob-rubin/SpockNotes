import PocketBase, { type RecordAuthResponse, type RecordModel } from 'pocketbase';
import { PUBLIC_PB_EMAIL, PUBLIC_PB_PASSWORD, PUBLIC_PB_URL } from '$env/static/public';

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
			.collection('_superusers')
			.authWithPassword(PUBLIC_PB_EMAIL, PUBLIC_PB_PASSWORD);

		console.log('Logged in:', this.#authData);
	}

	logout(): void {
		this.#pb.authStore.clear();
		this.#authData = null;
	}
}

export const pbState = new PbState();
