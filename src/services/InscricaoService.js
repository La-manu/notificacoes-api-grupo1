// src/services/InscricaoService.js
const { Inscricao, Evento, Participante } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');
const { isRequired, validar } = require("../helpers/validators");
const appEmitter = require('../events/eventEmitter');

async function criar(dados) {
  const { eventoId, participanteId } = dados;

  // Verificar se o evento existe
  const evento = await Evento.findByPk(eventoId);
  if (!evento) throw new NotFoundError('Evento');

  // Verificar se o participante existe
  const participante = await Participante.findByPk(participanteId);
  if (!participante) throw new NotFoundError('Participante');

  // Verificar duplicata
  const jaInscrito = await Inscricao.findOne({
    where: { evento_id: eventoId, participante_id: participanteId }
  });
  if (jaInscrito) throw new ValidationError('Participante já inscrito neste evento');

  // Criar a inscrição
  const novaInscricao = await Inscricao.create({
    evento_id: eventoId,
    participante_id: participanteId,
  });

  // 💡 AJUSTE DE OURO: Busca os dados completos para que o Observer de Log e E-mail consiga ler o nome do evento e e-mail
  const inscricaoCompleta = await Inscricao.findByPk(novaInscricao.id, {
    include: [
      { model: Evento, as: 'evento', attributes: ['nome', 'data'] },
      { model: Participante, as: 'participante', attributes: ['nome', 'email'] },
    ],
  });

  // Emitir evento passando o objeto completo com os relacionamentos carregados
  if (appEmitter) {
    appEmitter.emit('inscricao:criada', inscricaoCompleta);
  }

  return inscricaoCompleta;
}

async function listarTodas() {
  const inscricoes = await Inscricao.findAll({
    include: [
      { model: Evento, as: 'evento', attributes: ['id', 'nome', 'data'] },
      { model: Participante, as: 'participante', attributes: ['id', 'nome', 'email'] },
    ],
    order: [['created_at', 'DESC']],
  });
  return inscricoes;
}

async function listarPorEvento(eventoId) {
  const evento = await Evento.findByPk(eventoId);
  if (!evento) throw new NotFoundError('Evento');
  return await Inscricao.findAll({
    where: { evento_id: eventoId },
    include: [
      { model: Participante, as: 'participante', attributes: ['id', 'nome', 'email'] },
    ],
    order: [['created_at', 'DESC']],
  });
}

async function cancelar(id) {
  // Busca a inscrição trazendo também quem é o participante e o evento (necessário para logs/avisos)
  const inscricao = await Inscricao.findByPk(id, {
    include: [
      { model: Evento, as: 'evento', attributes: ['nome'] },
      { model: Participante, as: 'participante', attributes: ['nome', 'email'] },
    ]
  });
  
  if (!inscricao) throw new NotFoundError('Inscrição');

  // Atualiza o status no banco de dados
  await inscricao.update({ status: 'cancelada' });

  // 🚀 CORREÇÃO: Agora o evento é emitido antes do return final!
  if (appEmitter) {
    appEmitter.emit('inscricao:cancelada', inscricao);
  }

  return inscricao;
}

module.exports = { criar, listarTodas, listarPorEvento, cancelar };