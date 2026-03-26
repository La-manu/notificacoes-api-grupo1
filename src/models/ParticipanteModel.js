// src/models/ParticipanteModel.js

// Dados iniciais (seed)
let participantes = [
  { id: 1, nome: "Ana Silva", email: "ana@email.com" },
  { id: 2, nome: "Carlos Souza", email: "carlos@email.com" },
  { id: 3, nome: "Maria Santos", email: "maria@email.com" },
];

let proximoId = 4;

// Listar todos
function listarTodos() {
  return participantes;
}

// Buscar por ID
function buscarPorId(id) {
  return participantes.find((p) => p.id === id);
}

// Criar participante
function criar(dados) {
  const novoParticipante = {
    id: proximoId,
    nome: dados.nome,
    email: dados.email,
  };

  proximoId++;
  participantes.push(novoParticipante);

  return novoParticipante;
}

// Atualizar participante
function atualizar(id, dados) {
  const index = participantes.findIndex((p) => p.id === id);

  // se não encontrar
  if (index === -1) {
    return null;
  }

  participantes[index] = {
    ...participantes[index],
    ...dados,
  };

  return participantes[index];
}

// Deletar participante
function deletar(id) {
  const index = participantes.findIndex((p) => p.id === id);

  if (index === -1) {
    return false;
  }

  participantes.splice(index, 1);
  return true;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};