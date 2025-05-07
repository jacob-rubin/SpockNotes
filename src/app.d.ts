// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import 'unplugin-icons/types/svelte';
import type PocketBase, { AuthRecord } from 'pocketbase';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			pb: PocketBase;
			user: AuthRecord;
		}
	}
}

export {};
