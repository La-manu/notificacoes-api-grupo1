// src/controllers/EventoController.js
const EventoModel = require("../models/EventoModel");
// GET /eventos — listar todos
function index(req, res) {
  const eventos = EventoModel.listarTodos();
  res.json(eventos);
}
// GET /eventos/:id — buscar por ID
function show(req, res) {
  const id = parseInt(req.params.id);
  const evento = EventoModel.buscarPorId(id);
  if (!evento) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }
  res.json(evento);
}
// POST /eventos — criar novo
function store(req, res) {
  const { nome, descricao, data, local, capacidade } = req.body;
  // Validação simples
  if (!nome || !data) {
    return res.status(400).json({ erro: "Nome e data são obrigatórios" });
  }
  const novoEvento = EventoModel.criar({
    nome,
    descricao,
    data,
    local,
    capacidade,
  });
  res.status(201).json(novoEvento);
}
// PUT /eventos/:id — atualizar

function update(req, res) {
  const id = parseInt(req.params.id);
  const eventoAtualizado = EventoModel.atualizar(id, req.body);
  if (!eventoAtualizado) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }
  res.json(eventoAtualizado);
}
// DELETE /eventos/:id — deletar
function destroy(req, res) {
  const id = parseInt(req.params.id);
  const deletado = EventoModel.deletar(id);
  if (!deletado) {
    return res.status(404).json({ erro: "Evento não encontrado" });
  }
  res.status(204).send();
}
module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
