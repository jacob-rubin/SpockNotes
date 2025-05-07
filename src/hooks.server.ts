import { serializeNonPOJOs } from '$lib/utils/utils';
import type { Handle } from '@sveltejs/kit';
import Pocketbase, { type AuthRecord } from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	// initialize pocketbase instance
	event.locals.pb = new Pocketbase('http://127.0.0.1:8090');

	// load auth store from cookie if it exists
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	// check if user is authenticated and set user in locals
	if (event.locals.pb.authStore.isValid) {
		event.locals.user = serializeNonPOJOs<AuthRecord>(event.locals.pb.authStore.model);
	} else {
		event.locals.user = null;
	}

	const response = await resolve(event);

	// set auth cookie in response headers
	// TODO: set secure to true in production (?)
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return response;
};
