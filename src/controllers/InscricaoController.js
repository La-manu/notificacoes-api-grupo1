// src/controllers/InscricaoController.js
const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");

// Novo store - DESAFIO VALIDAR INCRIÇÕES
function store(req, res, next) {
  try {
    const { eventoId, participanteId } = req.body;
    const erros = validar([
      isRequired(eventoId, "EventoID"),
      isRequired(participanteId, "ParticipanteID"),
    ]);

    if (erros) {
      throw new ValidationError(erros.join("; "));
    }
    const resultado = InscricaoModel.criar(
      parseInt(eventoId),
      parseInt(participanteId),
    );

    res.status(201).json(resultado);
  } catch (erro) {
    next(erro);
  }
}

// GET /inscricoes — listar todas
function index(req, res, next) {
  try {
    const inscricoes = InscricaoModel.listarTodas();
    res.json(inscricoes);
  } catch (error) {
    next(error);
  }
}

// GET /inscricoes/evento/:eventoId
function listarPorEvento(req, res, next) {
  try {
    const eventoId = parseInt(req.params.eventoId);

    const inscricoes = InscricaoModel.listarPorEvento(eventoId);

    return res.json(inscricoes);
  } catch (error) {
    next(error);
  }
}

// PATCH /inscricoes/:id/cancelar
function cancelar(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const inscricao = InscricaoModel.cancelar(id);

    if (!inscricao) {
      throw new NotFoundError("Inscrição");
    }

    return res.json(inscricao);
  } catch (error) {
    next(error);
  }
}

// GET /inscricoes/:id/detalhes
function detalhes(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const inscricao = InscricaoModel.buscarPorId(id);

    if (!inscricao) {
      throw new NotFoundError("Inscrição");
    }

    const evento = EventoModel.buscarPorId(inscricao.eventoId);
    const participante = ParticipanteModel.buscarPorId(
      inscricao.participanteId,
    );

    return res.json({
      id: inscricao.id,
      status: inscricao.status,
      dataInscricao: inscricao.dataInscricao,
      evento: evento
        ? {
            id: evento.id,
            nome: evento.nome,
          }
        : null,
      participante: participante
        ? {
            id: participante.id,
            nome: participante.nome,
            email: participante.email,
          }
        : null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { store, index, listarPorEvento, cancelar, detalhes };
