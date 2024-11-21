const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados
const client = new Client({
  user: 'admin',
  host: 'ep-summer-night-a4xni33m-pooler.us-east-1.aws.neon.tech',
  database: 'Dados',
  password: 'SciGTsvo1g5r',
  port: 5432,
  ssl: true // Configuração SSL simplificada
});

// Conectar ao banco de dados
client.connect()
  .then(() => console.log("Conectado ao banco de dados"))
  .catch(err => console.error("Erro ao conectar ao banco de dados", err));

// Rota GET que retorna todos os dados da tabela
app.get('/todos', async (req, res) => {
  try {
    console.log("Buscando dados da tabela...");
    const result = await client.query('SELECT * FROM cadastro');
    console.log("Dados obtidos:", result.rows);
    res.json({ dados: result.rows });
  } catch (err) {
    console.error("Erro ao buscar dados", err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});
// Rota GET para buscar por matrícula
app.get('/cadastro/:matricula', async (req, res) => {
    const { matricula } = req.params;
  
    try {
      const result = await client.query('SELECT * FROM cadastro WHERE matricula = $1', [matricula]);
      
      if (result.rows.length > 0) {
        res.json(result.rows[0]); // Retorna o primeiro registro encontrado
      } else {
        res.status(404).json({ message: "Matrícula não encontrada" });
      }
    } catch (err) {
      console.error("Erro ao buscar dados", err);
      res.status(500).json({ error: "Erro ao buscar dados" });
    }
  });
// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
