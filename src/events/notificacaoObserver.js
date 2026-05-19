// src/events/notificacaoObserver.js
const appEmitter = require("./eventEmitter");
const { Notificacao, Participante, Evento, Inscricao } = require("../models");

// Observer: escuta o evento 'inscricao:criada'
appEmitter.on("inscricao:criada", async (inscricao) => {
  try {
    console.log(`[OBSERVER] Nova inscrição detectada: #${inscricao.id}`);

    // Buscar dados completos para montar a notificação
    const inscricaoCompleta = await Inscricao.findByPk(inscricao.id, {
      include: [
        { model: Evento, as: "evento" },
        { model: Participante, as: "participante" },
      ],
    });

    if (!inscricaoCompleta) return;

    const { evento, participante } = inscricaoCompleta;

    // Criar a notificação no banco
   const notificacao = await Notificacao.create({
     inscricaoId: inscricao.id, // Provavelmente seu modelo espera camelCase aqui também
     tipo: "confirmacao",
     destinatarioEmail: participante.email, // <-- CORRIGIDO AQUI
     assunto: `Inscrição confirmada: ${evento.nome}`,
     conteudo: `Olá ${participante.nome}! Sua inscrição no evento "${evento.nome}" foi confirmada.`,
     enviada: false,
   });

    console.log(
      `[OBSERVER] Notificação #${notificacao.id} criada para ${participante.email}`,
    );
  } catch (erro) {
    // O observer não deve derrubar a aplicação se falhar
    console.error("[OBSERVER] Erro ao criar notificação:", erro.message);
  }
});

// Observer: escuta 'inscricao:cancelada'
appEmitter.on("inscricao:cancelada", async (inscricao) => {
  try {
    console.log(`[OBSERVER] Inscrição #${inscricao.id} cancelada`);
    // Aqui poderíamos enviar um e-mail de cancelamento
    // Por enquanto, apenas logamos
  } catch (erro) {
    console.error("[OBSERVER] Erro:", erro.message);
  }
});
