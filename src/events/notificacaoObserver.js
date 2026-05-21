const appEmitter = require('./eventEmitter');
const { Notificacao, Participante, Evento, Inscricao } = require('../models');
const EmailService = require('../services/EmailService');

appEmitter.on('inscricao:criada', async (inscricao) => {
  try {
    console.log(`[OBSERVER] Nova inscrição detectada: #${inscricao.id}`);

    const inscricaoCompleta = await Inscricao.findByPk(inscricao.id, {
      include: [
        { model: Evento, as: 'evento' },
        { model: Participante, as: 'participante' },
      ],
    });

    if (!inscricaoCompleta) {
      console.warn(`[OBSERVER] Inscrição #${inscricao.id} não encontrada no banco.`);
      return;
    }

    const { evento, participante } = inscricaoCompleta;

    if (!participante || !participante.email) {
      console.error(`[OBSERVER] Participante ou e-mail não encontrado para inscrição #${inscricao.id}`);
      return;
    }

    // Montar o HTML do e-mail
    const html = `
      <h2>Inscrição Confirmada! ✅</h2>
      <p>Olá <strong>${participante.nome}</strong>,</p>
      <p>Sua inscrição no evento <strong>"${evento.nome}"</strong> foi confirmada com sucesso.</p>
      <p><strong>Detalhes do evento:</strong></p>
      <ul>
        <li><strong>Data:</strong> ${new Date(evento.data).toLocaleDateString('pt-BR')}</li>
        <li><strong>Local:</strong> ${evento.local || 'A definir'}</li>
      </ul>
      <p>Até lá! 🎉</p>
      <hr>
      <small>Este é um e-mail automático da Plataforma de Eventos.</small>
    `;

    // Enviar o e-mail via MailPit
    await EmailService.enviar(
      participante.email,
      `Inscrição confirmada: ${evento.nome}`,
      html
    );

    // Salvar a notificação no banco de dados
    await Notificacao.create({
      inscricaoId: inscricao.id,
      tipo: 'confirmacao',
      destinatarioEmail: participante.email,
      assunto: `Inscrição confirmada: ${evento.nome}`,
      conteudo: html,
      dataEnvio: new Date(), // ✨ Ajustado de data_envio para dataEnvio
      enviada: true,
    });

    console.log(`[NOTIFICAÇÃO] Confirmação enviada e salva no banco para ${participante.email}`);

  } catch (erro) {
    console.error('[NOTIFICAÇÃO] Erro ao processar evento de inscrição:', erro.message);
  }
});


appEmitter.on('participante:criado', async (participante) => {
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
      html
    );

    console.log(`[BOAS-VINDAS] E-mail enviado com sucesso para ${participante.email}`);

  } catch (erro) {
    console.error('[BOAS-VINDAS] Erro ao enviar e-mail de boas-vindas:', erro.message);
  }
});