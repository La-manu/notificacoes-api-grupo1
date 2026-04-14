// src/controllers/InscricaoController.js
const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");

const InscricaoService = require("../services/InscricaoService");

// Novo store - DESAFIO VALIDAR INCRIÇÕES
// POST /inscricoes
function store(req, res, next) {
  try {
    const novoInscricao = InscricaoService.criar(req.body);
    res.status(201).json(novoInscricao);
  } catch (erro) {
    next(erro);
  }
}

// GET /inscricoes — listar todas
function index(req, res, next) {
  try {
    const inscricoes = InscricaoService.listarTodas();
    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

// GET /inscricoes/evento/:eventoId
function listarPorEvento(req, res, next) {
  try {
    const eventoId = parseInt(req.params.eventoId);

    const inscricoes = InscricaoService.listarPorEvento(eventoId);

    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

// PATCH /inscricoes/:id/cancelar
function cancelar(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const inscricao = InscricaoService.cancelar(id);

    return res.json(inscricao);
  } catch (error) {
    next(error);
  }
}

// GET /inscricoes/:id/detalhes
function detalhes(req, res, next) {
  try {
    const { id } = req.params;
    // Idealmente, essa lógica complexa de montar o objeto com evento e participante
    // também deveria ser movida para um método no Service futuramente.
    const detalhes = InscricaoService.buscarDetalhes(id);
    res.json(detalhes);
  } catch (erro) {
    next(erro);
  }
}

module.exports = { store, index, listarPorEvento, cancelar, detalhes };
