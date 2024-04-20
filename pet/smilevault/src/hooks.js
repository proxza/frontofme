import cookie from 'cookie';

export async function handle({ request, resolve }) {
	// Используем optional chaining для безопасного доступа к cookies
	const cookies = cookie.parse(request.headers?.cookie || '');
	request.locals.authenticated = cookies.auth === 'true';

	const response = await resolve(request);
	return response;
}

export function getSession(request) {
	return {
		authenticated: request.locals.authenticated
	};
}
