import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api', async (req, res) => {
	try {
		const content = await pool.query('SELECT * FROM content');
		res.json(content.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send(`Server Error: ${err.message}`);
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
