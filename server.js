// Libraries
const express = require('express')
const { Pool } = require('pg')

// DB Connection
const localConnection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

const herokuConnection = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
};

const db = new Pool(
    process.env.DATABASE_URL
    ? herokuConnection
    : localConnection
);

// Server
const app = express()

app.use(express.static(__dirname));

app.get('/api', (req, res) => {
    db.query('SELECT * FROM table1;').then(({rows}) => res.send(rows[0]));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));