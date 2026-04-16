// src/services/EventoService.js
const EventoModel = require("../models-antigos/EventoModel");

const { NotFoundError, ValidationError } = require("../errors/AppError");

const {
  isRequired,
  isPositiveInteger,
  minLength,
  validar,
} = require("../helpers/validators");

function listarTodos() {
  return EventoModel.listarTodos();
}

function buscarPorId(id) {
  const evento = EventoModel.buscarPorId(id);
  if (!evento) {
    throw new NotFoundError("Evento");
  }
  return evento;
}

function criar(dados) {
  const { nome, descricao, data, local, capacidade } = dados;
  // Validação
  const erros = validar([
    isRequired(nome, "Nome"),
    isRequired(data, "Data"),
    minLength(nome, 3, "Nome"),
    isPositiveInteger(capacidade, "Capacidade"),
  ]);
  if (erros) {
    throw new ValidationError(erros.join("; "));
  }
  return EventoModel.criar({ nome, descricao, data, local, capacidade });
}

function atualizar(id, dados) {
  const { nome, capacidade } = dados;
  // Validações (campos opcionais no update)
  const erros = validar([
    minLength(nome, 3, "Nome"),
    isPositiveInteger(capacidade, "Capacidade"),
  ]);
  if (erros) {
    throw new ValidationError(erros.join("; "));
  }
  const eventoAtualizado = EventoModel.atualizar(id, dados);
  if (!eventoAtualizado) {
    throw new NotFoundError("Evento");
  }
  return eventoAtualizado;
}

function deletar(id) {
  const deletado = EventoModel.deletar(id);
  if (!deletado) {
    throw new NotFoundError("Evento");
  }
  return true;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};
