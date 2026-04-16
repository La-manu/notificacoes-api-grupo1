// src/server.js
require("dotenv").config();

const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com MySQL estabelecida com sucesso!");
    // Sincronizar Models com o banco (criar tabelas se não existirem)
    await sequelize.sync({ alter: true });
    console.log("Tabelas sincronizadas com o banco de dados.");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Documentação: http://localhost:${PORT}/api-docs`);
    });
  } catch (erro) {
    console.error("Erro ao iniciar:", erro.message);
    process.exit(1);
  }
}

iniciar();
