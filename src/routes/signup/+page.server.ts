import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const actions: Actions = {
	signup: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());

		// TODO: Validate form data/add type safety
		try {
			await locals.pb.collection('users').create({
				email: body.email,
				password: body.password,
				passwordConfirm: body.passwordConfirm
			});
			await locals.pb
				.collection('users')
				.authWithPassword(body.email.toString(), body.password.toString());
			console.log('Creating user:', body.email.toString(), body.password.toString());
		} catch (error) {
			console.log('Error creating user:', error);
			throw new Error('Error creating user');
		}

		throw redirect(303, '/');
	}
};

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;
