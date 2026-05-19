// src/server.js
require("dotenv").config();
// No seu app.js ou server.js
require("./src/events/notificacaoObserver");
require("./src/events/logObserver"); // Adicione essa linha para ativar o observer de eventos
const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com MySQL estabelecida com sucesso!");

    // REMOVIDO: await sequelize.sync({ alter: true });
    // Agora usamos Migrations para gerenciar o esquema do banco

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error("Erro ao iniciar:", erro.message);
    process.exit(1);
  }
}


iniciar();
