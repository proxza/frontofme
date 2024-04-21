import { parse } from 'cookie';
import { getSessionUser } from '$lib/utils';

export async function handle({ event, resolve }) {
	const cookies = parse(event.request.headers.get('cookie') || '');
	event.locals.user = cookies.session ? await getSessionUser(cookies.session) : null;
	const response = await resolve(event);
	return response;
}

export function getSession({ locals }) {
	return {
		user: locals.user ? { username: locals.user.username, id: locals.user.id } : null
	};
}
