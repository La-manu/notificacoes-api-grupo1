// src/controllers/InscricaoController.js
const InscricaoModel = require("../models-antigos/InscricaoModel");
const EventoModel = require("../models-antigos/EventoModel");
const ParticipanteModel = require("../models-antigos/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");

const InscricaoService = require("../services/InscricaoService");

// Novo store - DESAFIO VALIDAR INCRIÇÕES
// POST /inscricoes
async function store(req, res, next) {
  try {
    const novoInscricao = await InscricaoService.criar(req.body);
    res.status(201).json(novoInscricao);
  } catch (erro) {
    next(erro);
  }
}

// GET /inscricoes — listar todas
async function index(req, res, next) {
  try {
    const inscricoes = await InscricaoService.listarTodas();
    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

// GET /inscricoes/evento/:eventoId
async function listarPorEvento(req, res, next) {
  try {
    const eventoId = parseInt(req.params.eventoId);

    const inscricoes = await InscricaoService.listarPorEvento(eventoId);

    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

// PATCH /inscricoes/:id/cancelar
async function cancelar(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const inscricao = await InscricaoService.cancelar(id);

    return res.json(inscricao);
  } catch (error) {
    next(error);
  }
}

// GET /inscricoes/:id/detalhes
async function detalhes(req, res, next) {
  try {
    const { id } = req.params;
    // Idealmente, essa lógica complexa de montar o objeto com evento e participante
    // também deveria ser movida para um método no Service futuramente.
    const detalhes = await InscricaoService.buscarDetalhes(id);
    res.json(detalhes);
  } catch (erro) {
    next(erro);
  }
}

module.exports = { store, index, listarPorEvento, cancelar, detalhes };
