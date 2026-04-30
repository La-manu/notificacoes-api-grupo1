// src/services/ParticipanteService.js
const { Participante } = require('../models');
const { NotFoundError } = require('../errors/AppError');

async function listarTodos() {
  const participante = await Participante.findAll({
    order: [['data', 'ASC']],
  });
  return participante;
}


async function buscarPorId(id) {
  const participante = await Participante.findByPk(id);

  if (!participante) {
    throw new NotFoundError('Participante');
  }

  return participante;
}

async function criar(dados) {
  try {
    const novoParticipante = await Participante.create(dados);
    return novoParticipante;
  } catch (erro) {
    if (erro.name === 'SequelizeValidationError') {
      const mensagens = erro.error.map(e => e.message).join(';');
      throw new validationError (mensagens);
    }
    throw erro;
  }
  
}

// Atualizar e deletar ficam para a próxima aula
async function atualizar(id, dados) { /* TODO */ }
async function deletar(id) { /* TODO */ }

module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };