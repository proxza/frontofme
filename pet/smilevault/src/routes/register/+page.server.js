import bcrypt from 'bcrypt';

import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const hashedPassword = await bcrypt.hash(password, 10);

		const result = await pool.query(
			'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
			[username, hashedPassword]
		);

		if (result.rows.length > 0) {
			return { userId: result.rows[0].id };
		} else {
			return { error: 'Не удалось зарегистрировать пользователя.' };
		}
	}
};
