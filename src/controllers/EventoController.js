const EventoService = require("../services/EventoService");
function index(req, res, next) {
  try {
    const eventos = EventoService.listarTodos();
    res.json(eventos);
  } catch (erro) {
    next(erro);
  }
}
function show(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const evento = EventoService.buscarPorId(id);
    res.json(evento);
  } catch (erro) {
    next(erro);
  }
}
function store(req, res, next) {
  try {
    const novoEvento = EventoService.criar(req.body);
    res.status(201).json(novoEvento);
  } catch (erro) {
    next(erro);
  }
}
function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const eventoAtualizado = EventoService.atualizar(id, req.body);
    res.json(eventoAtualizado);
  } catch (erro) {
    next(erro);
  }
}
function destroy(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    EventoService.deletar(id);
    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}
module.exports = { index, show, store, update, destroy };
