const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

async function getConnection() {
  let retries = 20;
  while (retries > 0) {
    try {
      const conn = await mysql.createConnection(dbConfig);
      return conn;
    } catch {
      retries--;
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
  throw new Error('Não foi possível conectar ao MySQL após várias tentativas.');
}

async function init() {
  const conn = await getConnection();
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `);
  await conn.end();
}

const names = ['Wescley', 'Luiz', 'Ana', 'Carlos', 'Fernanda', 'Ricardo', 'Juliana', 'Marcos'];

app.get('/', async (req, res) => {
  const conn = await getConnection();

  const randomName = names[Math.floor(Math.random() * names.length)];
  await conn.execute('INSERT INTO people (name) VALUES (?)', [randomName]);

  const [rows] = await conn.execute('SELECT name FROM people ORDER BY id DESC');
  await conn.end();

  const listItems = rows.map((row) => `<li>${row.name}</li>`).join('');

  res.send(`
    <h1>Full Cycle Rocks!</h1>
    <ul>${listItems}</ul>
  `);
});

init().then(() => {
  app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});
