// src/server.js
require("dotenv").config();

// 1. Instância do e-mail primeiro
const EmailService = require('./services/EmailService');

// 2. Banco de dados e App depois
const app = require("./app");
const { sequelize } = require("./models");


// 3. Os Observers entram por último, depois que os Models já foram carregados pelo app
require("./events/notificacaoObserver");
require("./events/logObserver"); 

const PORT = process.env.PORT || 3001;


async function iniciar() {

  try {

    await sequelize.authenticate();

    console.log('Conexão com MySQL estabelecida com sucesso!');

    // Inicializar o serviço de e-mail

    await EmailService.inicializar();

    app.listen(PORT, () => {

      console.log(`Servidor rodando em http://localhost:${PORT}`);

      console.log(`Documentação: http://localhost:${PORT}/api-docs`);

    });

  } catch (erro) {

    console.error('Erro ao iniciar:', erro.message);

    process.exit(1);

  }

}

iniciar();
