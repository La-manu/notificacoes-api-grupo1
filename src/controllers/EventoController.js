const EventoModel = require("../models/EventoModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
function index(req, res, next) {
  try {
    const eventos = EventoModel.listarTodos();
    res.json(eventos);
  } catch (erro) {
    next(erro);
  }
}
function show(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const evento = EventoModel.buscarPorId(id);
    if (!evento) {
      throw new NotFoundError("Evento");
    }
    res.json(evento);
  } catch (erro) {
    next(erro);
  }
}
function store(req, res, next) {
  try {
    const { nome, descricao, data, local, capacidade } = req.body;
    if (!nome || !data) {
      throw new ValidationError("Nome e data são obrigatórios");
    }
    const novoEvento = EventoModel.criar({
      nome,
      descricao,
      data,
      local,

      capacidade,
    });
    res.status(201).json(novoEvento);
  } catch (erro) {
    next(erro);
  }
}
function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const eventoAtualizado = EventoModel.atualizar(id, req.body);
    if (!eventoAtualizado) {
      throw new NotFoundError("Evento");
    }
    res.json(eventoAtualizado);
  } catch (erro) {
    next(erro);
  }
}
function destroy(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const deletado = EventoModel.deletar(id);
    if (!deletado) {
      throw new NotFoundError("Evento");
    }
    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}
module.exports = { index, show, store, update, destroy };
