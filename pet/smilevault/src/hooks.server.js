import { parse } from 'cookie';
import { getSessionUser } from '$lib/utils';

export async function handle({ event, resolve }) {
	const cookies = parse(event.request.headers.get('cookie') || '');
	console.log('Session ID from cookies:', cookies.session); // Debugging output
	event.locals.user = cookies.session ? await getSessionUser(cookies.session) : null;
	const response = await resolve(event);
	return response;
}

export function getSession({ locals }) {
	console.log('User data in session:', locals.user); // Debugging output
	return {
		user: locals.user ? { username: locals.user.username, id: locals.user.id } : null
	};
}
