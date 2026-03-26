// src/models/InscricaoModel.js
const EventoModel = require("./EventoModel");
const ParticipanteModel = require("./ParticipanteModel");
let inscricoes = [];
let proximoId = 1;
// Criar uma nova inscrição
function criar(eventoId, participanteId) {
  // Verificar se o evento existe
  const evento = EventoModel.buscarPorId(eventoId);
  if (!evento) return { erro: "Evento não encontrado" };
  // Verificar se o participante existe
  const participante = ParticipanteModel.buscarPorId(participanteId);
  if (!participante) return { erro: "Participante não encontrado" };
  // Verificar se já está inscrito
  const jaInscrito = inscricoes.find(
    (i) => i.eventoId === eventoId && i.participanteId === participanteId,
  );
  if (jaInscrito) return { erro: "Participante já inscrito neste evento" };
  const novaInscricao = {
    id: proximoId,
    eventoId,
    participanteId,
    dataInscricao: new Date().toISOString(),
    status: "confirmada",
  };
  proximoId++;
  inscricoes.push(novaInscricao);
  return novaInscricao;
}
// Listar inscrições de um evento específico
function listarPorEvento(eventoId) {
  return inscricoes.filter((i) => i.eventoId === eventoId);
}
// Listar todas as inscrições
function listarTodas() {
  return inscricoes;
}
// Cancelar uma inscrição
function cancelar(id) {
  const index = inscricoes.findIndex((i) => i.id === id);
  if (index === -1) return null;
  inscricoes[index].status = "cancelada";
  return inscricoes[index];
}

function buscarPorId(id) {
  return inscricoes.find((i) => i.id === id);
}
module.exports = {
  criar,
  listarPorEvento,
  listarTodas,
  cancelar,
  buscarPorId,
};
