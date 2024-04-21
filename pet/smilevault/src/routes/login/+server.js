import { verifyUser, createSession } from '$lib/utils';
import { serialize } from 'cookie';

export async function POST({ request }) {
	const { username, password } = await request.json();
	const user = await verifyUser(username, password);
	if (user) {
		const sessionId = await createSession(user);
		return new Response(JSON.stringify({ ok: true }), {
			headers: {
				'Set-Cookie': serialize('session', sessionId, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict', // adjust according to your security needs
					maxAge: 60 * 60 * 24 * 7 // one week
				})
			}
		});
	}
	return new Response(null, { status: 401 });
}
