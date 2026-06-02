// src/services/NotificacaoService.js
const { Notificacao, Inscricao, Evento, Participante } = require('../models');
const EmailService = require('./EmailService');
const { NotFoundError, ValidationError } = require('../errors/AppError');
const confirmacaoInscricao = require('../templates/email/confirmacaoInscricao');

async function listarTodas(filtros = {}) {
  const where = {};

  // Filtrar por tipo (confirmacao, lembrete)
  if (filtros.tipo) {
    where.tipo = filtros.tipo;
  }

  // Filtrar por status de envio
  if (filtros.enviada !== undefined) {
    where.enviada = filtros.enviada === 'true';
  }

  const notificacoes = await Notificacao.findAll({
    where,
    include: [{
      model: Inscricao,
      as: 'inscricao',
      include: [
        { model: Evento, as: 'evento', attributes: ['id', 'nome'] },
        { model: Participante, as: 'participante', attributes: ['id', 'nome', 'email'] },
      ],
    }],
    order: [['created_at', 'DESC']],
  });

  return notificacoes;
}

async function buscarPorId(id) {
  const notificacao = await Notificacao.findByPk(id, {
    include: [{
      model: Inscricao,
      as: 'inscricao',
      include: [
        { model: Evento, as: 'evento' },
        { model: Participante, as: 'participante' },
      ],
    }],
  });

  if (!notificacao) throw new NotFoundError('Notificação');
  return notificacao;
}

async function reenviar(id) {
  const notificacao = await buscarPorId(id);

  if (!notificacao) {
    throw new Error("Notificação não encontrada.");
  }

  const html = notificacao.conteudo;
  let visualizarEm = null;

  try {
    // Tenta enviar o e-mail
    const resultado = await EmailService.enviar(
      notificacao.destinatario_email,
      notificacao.assunto,
      html
    );
    visualizarEm = resultado?.visualizarEm;
  } catch (erroEmail) {
    console.error("[EMAIL ERROR] Falha ao conectar com o serviço de e-mail:", erroEmail.message);
    // Opcional: Se quiser que a rota continue mesmo se o serviço de e-mail falhar, 
    // deixe o catch assim. Se quiser travar com um erro customizado, descomente a linha abaixo:
    // throw new Error("Serviço de e-mail indisponível.");
  }

  // Atualizar registro no banco (só faz sentido se o e-mail foi/será tratado)
  await notificacao.update({
    enviada: true,
    data_envio: new Date(),
  });

  return {
    notificacao,
    visualizarEm: visualizarEm || "Link indisponível (Erro no serviço de e-mail)",
  };
}

async function obterEstatisticas() {
  const total = await Notificacao.count();
  const enviadas = await Notificacao.count({ where: { enviada: true } });
  const pendentes = await Notificacao.count({ where: { enviada: false } });

  const porTipo = await Notificacao.findAll({
    attributes: [
      'tipo',
      [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'quantidade'],
    ],
    group: ['tipo'],
    raw: true,
  });

  return {
    total,
    enviadas,
    pendentes,
    taxaEnvio: total > 0 ? `${Math.round((enviadas / total) * 100)}%` : '0%',
    porTipo,
  };
}


module.exports = {
  listarTodas,
  buscarPorId,
  reenviar,
  obterEstatisticas,
};
