import cookie from 'cookie';
import bcrypt from 'bcrypt';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const actions = {
	default: async ({ request }) => {
		const data = await request.json();
		const { username, password } = data;

		try {
			const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
			if (rows.length > 0) {
				const user = rows[0];
				const valid = await bcrypt.compare(password, user.password);
				if (valid) {
					return {
						headers: {
							'Set-Cookie': cookie.serialize('auth', 'true', {
								path: '/',
								httpOnly: true,
								maxAge: 60 * 60 * 24 * 7 // 1 week
							})
						},
						status: 200
					};
				}
			}
			return { status: 401 }; // Неверный логин или пароль
		} catch (error) {
			console.error(error);
			return { status: 500 };
		}
	}
};
