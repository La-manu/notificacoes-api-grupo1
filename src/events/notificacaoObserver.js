const appEmitter = require("./eventEmitter");
const { Notificacao, Participante, Evento, Inscricao } = require("../models");
const EmailService = require("../services/EmailService");
const confirmacaoInscricao = require("../templates/email/confirmacaoInscricao");
const cancelamentoInscricao = require("../templates/email/cancelamentoInscricao");

// Helper para buscar dados completos da inscrição
async function buscarDadosInscricao(inscricaoId) {
  return await Inscricao.findByPk(inscricaoId, {
    include: [
      { model: Evento, as: "evento" },
      { model: Participante, as: "participante" },
    ],
  });
}

// Helper para salvar notificação no banco
async function salvarNotificacao(dados) {
  return await Notificacao.create(dados);
}

// ── OBSERVER: Inscrição criada ──
appEmitter.on("inscricao:criada", async (inscricao) => {
  try {
    const dados = await buscarDadosInscricao(inscricao.id);
    if (!dados) return;

    // Dentro do observer, ANTES de criar a notificação:

    const jaNotificado = await Notificacao.findOne({
      where: {
        inscricao_id: inscricao.id,
        tipo: "confirmacao",
        // Complete: que outra condição faz sentido aqui?
        destinatario_email: inscricao.participante.email,
      },
    });

    if (jaNotificado) {
      console.log("[NOTIFICAÇÃO] Confirmação já enviada, ignorando duplicata");
      return;
    }

    const { evento, participante } = dados;
    const assunto = `Inscrição confirmada: ${evento.nome}`;
    const html = confirmacaoInscricao({
      participanteNome: participante.nome,
      eventoNome: evento.nome,
      eventoData: evento.data,
      eventoLocal: evento.local,
    });

    const resultado = await EmailService.enviar(
      participante.email,
      assunto,
      html,
    );

    await salvarNotificacao({
      inscricao_id: inscricao.id,
      tipo: "confirmacao",
      destinatario_email: participante.email,
      assunto,
      conteudo: html,
      data_envio: new Date(),
      enviada: true,
    });

    console.log(`[NOTIFICAÇÃO] Confirmação enviada para ${participante.email}`);
    console.log(`   Visualizar em: ${resultado.visualizarEm}`);
  } catch (erro) {
    console.error("[NOTIFICAÇÃO] Erro:", erro.message);
  }
});

// ── OBSERVER: Inscrição cancelada ──
appEmitter.on("inscricao:cancelada", async (inscricao) => {
  try {
    const dados = await buscarDadosInscricao(inscricao.id);
    if (!dados) return;

    const { evento, participante } = dados;
    const assunto = `Inscrição cancelada: ${evento.nome}`;
    const html = cancelamentoInscricao({
      participanteNome: participante.nome,
      eventoNome: evento.nome,
    });

    const resultado = await EmailService.enviar(
      participante.email,
      assunto,
      html,
    );

    await salvarNotificacao({
      inscricao_id: inscricao.id,
      tipo: "confirmacao",
      destinatario_email: participante.email,
      assunto,
      conteudo: html,
      data_envio: new Date(),
      enviada: true,
    });

    console.log(
      `[NOTIFICAÇÃO] Cancelamento enviado para ${participante.email}`,
    );
    console.log(`   Visualizar em: ${resultado.visualizarEm}`);
  } catch (erro) {
    console.error("[NOTIFICAÇÃO] Erro:", erro.message);
  }
});

appEmitter.on("participante:criado", async (participante) => {
  try {
    console.log(`[OBSERVER] Novo participante detectado: ${participante.nome}`);

    const html = `
      <h2>Bem-vindo à Plataforma de Eventos! 🎉</h2>
      <p>Olá <strong>${participante.nome}</strong>,</p>
      <p>Bem-vindo à Plataforma de Eventos, ${participante.nome}!</p>
      <hr>
      <small>Este é um e-mail automático de boas-vindas.</small>
    `;

    // Envia o e-mail usando o MailPit
    await EmailService.enviar(
      participante.email,
      `Bem-vindo à Plataforma de Eventos, ${participante.nome}!`,
      html,
    );

    console.log(
      `[BOAS-VINDAS] E-mail enviado com sucesso para ${participante.email}`,
    );
  } catch (erro) {
    console.error(
      "[BOAS-VINDAS] Erro ao enviar e-mail de boas-vindas:",
      erro.message,
    );
  }
});
