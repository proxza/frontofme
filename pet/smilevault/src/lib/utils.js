import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
	BLABLABLA
});

export async function verifyUser(username, password) {
	const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
	if (rows.length > 0) {
		const user = rows[0];
		const match = await bcrypt.compare(password, user.password);
		if (match) {
			return user; // Return user only if password matches
		}
	}
	return null; // Return null if no user found or password does not match
}

// Assuming a sessions table exists with columns id, userId, and sessionId
export async function createSession(user) {
	const sessionId = uuidv4();
	await pool.query('INSERT INTO sessions (sessionId, userId) VALUES ($1, $2)', [
		sessionId,
		user.id
	]);
	return sessionId;
}

export async function getSessionUser(sessionId) {
	console.log(`Retrieving user for session: ${sessionId}`); // Debugging output
	const { rows } = await pool.query(
		'SELECT * FROM users INNER JOIN sessions ON users.id = sessions.userId WHERE sessions.sessionId = $1',
		[sessionId]
	);
	if (rows.length > 0) {
		return rows[0]; // Returning the first matching user
	}
	console.log('No session or user found for given session ID.'); // Debugging output
	return null; // No session found, or session expired
}
