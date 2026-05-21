// src/services/EventoService.js
const { Evento } = require("../models");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const appEmitter = require("../events/eventEmitter");

/**
 * Busca todos os eventos com suporte a paginação e filtros.
 */
async function listarTodos(opcoes = {}) {
  const { pagina = 1, porPagina = 10, ordenarPor = "data", ordem = "ASC", busca = null } = opcoes;

  const where = {};
  if (busca) {
    const { Op } = require("sequelize");
    where.nome = { [Op.like]: `%${busca}%` };
  }

  const { count, rows } = await Evento.findAndCountAll({
    where,
    order: [[ordenarPor, ordem.toUpperCase()]],
    limit: parseInt(porPagina),
    offset: (parseInt(pagina) - 1) * parseInt(porPagina),
  });

  return {
    dados: rows,
    total: count,
    pagina: parseInt(pagina),
    porPagina: parseInt(porPagina),
    totalPaginas: Math.ceil(count / parseInt(porPagina)),
  };
}

/**
 * Busca um evento específico pelo ID.
 */
async function buscarPorId(id) {
  const evento = await Evento.findByPk(id);

  if (!evento) {
    throw new NotFoundError("Evento");
  }

  return evento;
}

/**
 * Cria um novo evento e dispara o aviso para os observers (logs).
 */
async function criar(dados) {
  try {
    const novoEvento = await Evento.create(dados);

    if (appEmitter) {
      appEmitter.emit("evento:criado", novoEvento);
    }

    return novoEvento;
  } catch (erro) {
    if (erro.name === "SequelizeValidationError") {
      const mensagens = erro.errors.map((e) => e.message).join("; ");
      throw new ValidationError(mensagens);
    }
    throw erro;
  }
}

/**
 * Atualiza os dados de um evento existente.
 */
async function atualizar(id, dados) {
  const evento = await Evento.findByPk(id);

  if (!evento) {
    throw new NotFoundError("Evento");
  }

  try {
    await evento.update(dados);
    return evento;
  } catch (erro) {
    if (erro.name === "SequelizeValidationError") {
      const mensagens = erro.errors.map((e) => e.message).join("; ");
      throw new ValidationError(mensagens);
    }
    throw erro;
  }
}

/**
 * Remove um evento do banco de dados.
 */
async function deletar(id) {
  const evento = await Evento.findByPk(id);

  if (!evento) {
    throw new NotFoundError("Evento");
  }

  await evento.destroy();
  return true;
}

/**
 * Filtra apenas os eventos que vão acontecer da data atual em diante.
 */
async function listarFuturos() {
  const { Op } = require("slate-sequelize" in global ? "sequelize" : "sequelize");

  const eventos = await Evento.findAll({
    where: {
      data: { [Op.gt]: new Date() },
    },
    order: [["data", "ASC"]],
  });

  return eventos;
}

// ✅ EXPORTAÇÃO CORRETA E ÚNICA QUE O CONTROLLER PRECISA:
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  listarFuturos,
};