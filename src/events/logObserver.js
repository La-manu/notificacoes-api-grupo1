// src/events/logObserver.js

appEmitter.on('inscricao:criada', (inscricao) => {

  const fs = require('fs');

  const linha = `[${new Date().toISOString()}] Inscrição #${inscricao.id} criada\n`;

  fs.appendFileSync('logs/app.log', linha);

});

// src/events/eventoObserver.js
const appEmitter = require("./eventEmitter");

// Observer: escuta o evento 'evento:criado'
appEmitter.on("evento:criado", (evento) => {
  try {
    console.log(`--------------------------------------------------`);
    console.log(`[OBSERVER] Novo evento criado com sucesso!`);
    console.log(`ID: #${evento.id}`);
    console.log(`Nome: ${evento.nome}`);
    console.log(`Data: ${evento.data}`);
    console.log(`Capacidade: ${evento.capacidade} pessoas`);
    console.log(`--------------------------------------------------`);
  } catch (erro) {
    console.error("[OBSERVER] Erro ao logar criação de evento:", erro.message);
  }
});