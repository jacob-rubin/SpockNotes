import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const actions: Actions = {
	logout: async ({ locals }) => {
		locals.pb.authStore.clear();
		locals.user = null;

		throw redirect(303, '/login');
	}
};

export const load = (async ({ locals }) => {
	if (locals.user) {
		return {
			user: locals.user
		};
	}
	return {
		user: null
	};
}) satisfies PageServerLoad;
