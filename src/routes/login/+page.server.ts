import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.pb
				.collection('users')
				.authWithPassword(body.email.toString(), body.password.toString());
			console.log('Logging in user:', body.email.toString(), body.password.toString());
		} catch (error) {
			console.log('Error logging in user:', error);
			return {
				error: true,
				email: body.email
			};
		}

		throw redirect(303, '/');
	}
};

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;
