// src/controllers/ParticipanteController.js
const ParticipanteModel = require("../models/ParticipanteModel");

function index(req, res) {
  // Liste todos os participantes
  const participantes = ParticipanteModel.listarTodos();
  res.json(participantes);
}

function show(req, res) {
  const id = parseInt(req.params.id);

  // Busque o participante por ID
  const participante = ParticipanteModel.buscarPorId(id);

  // Se não encontrar
  if (!participante) {
    return res.status(404).json({ erro: "Participante não encontrado" });
  }

  // Se encontrar
  res.json(participante);
}

function store(req, res) {
  const { nome, email } = req.body;

  // Validação
  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e email são obrigatórios" });
  }

  // Criar participante
  const participante = ParticipanteModel.criar({ nome, email });

  res.status(201).json(participante);
}

function update(req, res) {
  const id = parseInt(req.params.id);

  const participante = ParticipanteModel.atualizar(id, req.body);

  // Se não encontrar
  if (!participante) {
    return res.status(404).json({ erro: "Participante não encontrado" });
  }

  // Retorna atualizado
  res.json(participante);
}

function destroy(req, res) {
  const id = parseInt(req.params.id);

  const deletado = ParticipanteModel.deletar(id);

  // Se não encontrar
  if (!deletado) {
    return res.status(404).json({ erro: "Participante não encontrado" });
  }

  // 204 = sem conteúdo
  res.status(204).send();
}

module.exports = { index, show, store, update, destroy };