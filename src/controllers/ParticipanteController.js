// src/controllers/ParticipanteController.js
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError, BadRequestError } = require("../errors/AppError");
const { validar, isRequired, isEmail } = require('../helpers/validators');

async function index(req, res, next) {
  try {
    const participantes = await ParticipanteModel.findAll();
    res.json(participantes);
  } catch (erro) {
    next(erro);
  }
}

async function show(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const participante = await ParticipanteModel.findByPk(id);
    if (!participante) {
      throw new NotFoundError("Participante");
    }
    res.json(participante);
  } catch (erro) {
    next(erro);
  }
}

async function store(req, res, next) {
  try {
    const { nome, email } = req.body;

    const erros = validar([
      isRequired(nome, "Nome"),
      isRequired(email, "Email"),
      isEmail(email),
    ]);
    if (erros) {
      throw new ValidationError(erros.join("; "));
    }

    const emailExistente = await ParticipanteModel.findOne({ where: { email } });
    if (emailExistente) {
      throw new ValidationError("Já existe um participante com esse e-mail");
    }

    const novoParticipante = await ParticipanteModel.create({ nome, email });
    res.status(201).json(novoParticipante);
  } catch (erro) {
    next(erro);
  }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const erros = [];

    if (!req.body.nome) erros.push("Nome obrigatorio");
    if (!req.body.email) erros.push("Email obrigatorio");
    if (!req.body.eventoId) erros.push("EventoId obrigatorio");

    if (erros.length > 0) {
      throw new BadRequestError(erros.join("; "));
    }

    const participante = await ParticipanteModel.findByPk(id);
    if (!participante) {
      throw new NotFoundError("Participante");
    }

    await participante.update(req.body);
    res.json(participante);
  } catch (erro) {
    next(erro);
  }
}

async function destroy(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const participante = await ParticipanteModel.findByPk(id);
    if (!participante) {
      throw new NotFoundError("Participante");
    }
    await participante.destroy();
    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

module.exports = { index, show, store, update, destroy };