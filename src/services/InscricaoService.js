// src/services/InscricaoService.js
const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, validar } = require("../helpers/validators");

function criar(dados) {
  const { eventoId, participanteId } = dados;

  // Validar campos obrigatórios
  const erros = validar([
    isRequired(eventoId, "eventoId"),
    isRequired(participanteId, "participanteId"),
  ]);
  if (erros) throw new ValidationError(erros.join("; "));

  // Verificar se evento existe
  const evento = EventoModel.buscarPorId(parseInt(eventoId));
  if (!evento) throw new NotFoundError("Evento");

  // Verificar se participante existe
  const participante = ParticipanteModel.buscarPorId(parseInt(participanteId));
  if (!participante) throw new NotFoundError("Participante");

  try {
    return InscricaoModel.criar(parseInt(eventoId), parseInt(participanteId));
  } catch (erro) {
    // Se o erro for de duplicata, você pode lançar um ValidationError mais claro
    if (erro.message.includes("duplicada") || erro.code === "P2002") {
      throw new ValidationError(
        "Este participante já está inscrito neste evento.",
      );
    }
    throw erro; // Repassa outros erros inesperados
  }
}


// parte da amanda
function listarTodas() {
  return InscricaoModel.listarTodas();
}

function listarPorEvento(eventoId) {
  const evento = EventoModel.buscarPorId(parseInt(eventoId));
  if (!evento) throw new NotFoundError("Evento não encontrado");

  return InscricaoModel.listarPorEvento(parseInt(eventoId));
}

function cancelar(id) {
  const cancelado = InscricaoModel.cancelar(id);
  if (!cancelado) {
    throw new NotFoundError("Inscricao");
  }
  return true;
}

module.exports = { criar, listarTodas, listarPorEvento, cancelar };
