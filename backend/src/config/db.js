const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tododb', 'user', 'password', {
  host: 'db',  // Nome do serviço definido no Docker Compose
  dialect: 'postgres',
  port: 5432,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao PostgreSQL!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

module.exports = { sequelize, connectDB };
