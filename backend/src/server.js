const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const taskRoutes = require('./routes/taskRouter');

const app = express();
app.use(bodyParser.json());

// Usar as rotas de tarefas
app.use('/api', taskRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log('Servidor rodando na porta 5000');
      console.log('API de tarefas disponível em http://localhost:5000/api');
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

startServer();
