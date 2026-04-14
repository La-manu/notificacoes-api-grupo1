// src/services/ParticipanteService.js

const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");

const {
  isRequired,
  isEmail,
  minLength,
  validar,
} = require("../helpers/validators");

// LISTAR TODOS
function listarTodos() {
  return ParticipanteModel.listarTodos();
}

// BUSCAR POR ID
function buscarPorId(id) {
  const participante = ParticipanteModel.buscarPorId(id);

  if (!participante) {
    throw new NotFoundError("Participante não encontrado");
  }

  return participante;
}

// CRIAR PARTICIPANTE
function criar(dados) {
  validar([
    isRequired(dados.nome, "Nome"),
    minLength(dados.nome, 3, "Nome"),
    isRequired(dados.email, "Email"),
    isEmail(dados.email),
  ]);

  return ParticipanteModel.criar(dados);
}

// ATUALIZAR PARTICIPANTE
function atualizar(id, dados) {
  const participante = ParticipanteModel.buscarPorId(id);

  if (!participante) {
    throw new NotFoundError("Participante não encontrado");
  }

  validar([
    isRequired(dados.nome, "Nome"),
    minLength(dados.nome, 3, "Nome"),
    isRequired(dados.email, "Email"),
    isEmail(dados.email),
  ]);

  return ParticipanteModel.atualizar(id, dados);
}

// REMOVER PARTICIPANTE
function remover(id) {
  const participante = ParticipanteModel.buscarPorId(id);

  if (!participante) {
    throw new NotFoundError("Participante não encontrado");
  }

  ParticipanteModel.remover(id);
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  remover,
};
