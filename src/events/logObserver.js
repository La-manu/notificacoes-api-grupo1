// src/events/logObserver.js
const fs = require('fs');
const path = require('path');
const appEmitter = require('./eventEmitter');

// Define os caminhos corretos apontando para a raiz do projeto (PBE2/notificacoes-api-grupo1/logs)
const diretorioLogs = path.join(__dirname, '../../logs');
const arquivoLog = path.join(diretorioLogs, 'app.log');

// 🛠️ RESOLUÇÃO DO SEU ERRO: Se a pasta ou o arquivo não existirem, o Node cria eles agora!
if (!fs.existsSync(diretorioLogs)) {
    fs.mkdirSync(diretorioLogs, { recursive: true });
}
if (!fs.existsSync(arquivoLog)) {
    fs.writeFileSync(arquivoLog, '', 'utf-8');
}

// Ouve o evento de inscrição criada
// Dentro do arquivo src/events/notificacaoObserver.js (ou emailObserver.js)

appEmitter.on('inscricao:criada', async (inscricao) => {
  try {
   

    // Descobre o e-mail de forma segura para não vir null
    const emailDestinatario = inscricao.participante?.email || 'teste@exemplo.com';

    // Grava na tabela de notificações
    await Notificacao.create({
      destinatarioEmail: emailDestinatario, // 🚀 PROTEGIDO: Nunca será null
      eventoId: inscricao.evento_id || inscricao.eventoId,
      status: 'enviado'
    });

    console.log("📌 Notificação gravada no banco de dados com sucesso!");

  } catch (erro) {
    console.log('[OBSERVER] Erro ao enviar notificação:', erro.message);
  }
});
// Ouve o evento de inscrição cancelada (se houver)
appEmitter.on('inscricao:cancelada', (inscricao) => {
    try {
        const linha = `[${new Date().toISOString()}] INSCRIÇÃO CANCELADA - ID: ${inscricao.id}\n`;
        fs.appendFileSync(arquivoLog, linha);
        console.log("📝 Log de cancelamento gravado com sucesso em logs/app.log");
    } catch (erro) {
        console.error("Erro ao gravar log de cancelamento:", erro.message);
    }
});

module.exports = appEmitter;