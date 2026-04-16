// InscricaoModel.criar() simplificado:
function criar(eventoId, participanteId) {
  // Verificar duplicata (essa fica no Model porque é regra de dados)
  const jaInscrito = inscricoes.find(
    (i) => i.eventoId === eventoId && i.participanteId === participanteId,
  );
  if (jaInscrito) {
    throw new ValidationError("Participante já inscrito neste evento");
  }
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
