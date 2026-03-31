const EventoModel = require("../models/EventoModel");
function index(req, res, next) {
  try {
    const eventos = EventoModel.listarTodos();
    res.json(eventos);
  } catch (erro) {
    next(erro);
  }
}

const {
  isRequired,
  isPositiveInteger,
  minLength,
  validar,
} = require("../helpers/validators");
const { NotFoundError, ValidationError } = require("../errors/AppError");



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

// NOVO STORE
function store(req, res, next) {
  try {
    const { nome, descricao, data, local, capacidade } = req.body;
    // Validar os dados de entrada
    const erros = validar([
      isRequired(nome, "Nome"),
      isRequired(data, "Data"),
      minLength(nome, 3, "Nome"),
      isPositiveInteger(capacidade, "Capacidade"),
    ]);

    if (erros) {
      throw new ValidationError(erros.join("; "));
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

// NOVO UPDATE
function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { nome, capacidade } = req.body;
    
    // No update, os campos não são obrigatórios (atualização parcial)
    // Mas SE forem enviados, devem ser válidos
    const erros = validar([
      minLength(nome, 3, "Nome"),
      isPositiveInteger(capacidade, "Capacidade"),
    ]);

    if (erros.length > 0) {
      throw new ValidationError(erros.join("; "));
    }
    
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
