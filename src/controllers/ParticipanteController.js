// src/controllers/ParticipanteController.js
const ParticipanteModel = require("../models-antigos/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
function index(req, res, next) {
  try {
    const participantes = ParticipanteModel.listarTodos();
    res.json(participantes);
  } catch (erro) {
    next(erro);
  }
}

function show(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const participante = ParticipanteModel.buscarPorId(id);
    if (!participante) {
      throw new NotFoundError("Participante");
    }
    res.json(participante);
  } catch (erro) {
    next(erro);
  }
}

// NOVO STORE
function store(req, res, next) {
  try {
    const { nome, email } = req.body;
    const erros = validar([
      isRequired(nome, "Nome"),
      isRequired(email, "Email"),
    ]);
    if (erros) {
      throw new ValidationError(erros.join("; "));
    }
    const novoParticipante = ParticipanteModel.criar({ nome, email });
    res.status(201).json(novoParticipante);
  } catch (erro) {
    next(erro);
  }
}


// UPDATE COM VALIDAÇÃO
function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const erros = [];

    if (!req.body.nome) {
      erros.push("Nome obrigatorio");
    }

    if (!req.body.email) {
      erros.push("Email obrigatorio");
    }

    if (!req.body.eventoId) {
      erros.push("EventoId obrigatorio");
    }

    if (erros.length > 0) {
      throw new BadRequestError(erros.join("; "));
    }
    const ParticipanteAtualizado = ParticipanteModel.atualizar(id, req.body);
    if (!ParticipanteAtualizado) {
      throw new NotFoundError("Participante");
    }
    res.json(ParticipanteAtualizado);
  } catch (erro) {
    next(erro);
  }
}

function destroy(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const deletado = ParticipanteModel.deletar(id);
    if (!deletado) {
      throw new NotFoundError("Participante");
    }
    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

module.exports = { index, show, store, update, destroy };
