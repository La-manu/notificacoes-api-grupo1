// src/models/EventoModel.js
// "Banco de dados" temporário — array em memória
let eventos = [
  {
    id: 1,
    nome: "Workshop de Node.js",
    descricao: "Aprenda Node.js do zero",
    data: "2025-08-15",
    local: "SENAI - Sala 3",
    capacidade: 30,
  },
  {
    id: 2,
    nome: "Hackathon SENAI 2025",
    descricao: "Maratona de programação",
    data: "2025-09-20",
    local: "SENAI - Auditório",
    capacidade: 100,
  },
];
// Variável para controlar o próximo ID
let proximoId = 3;
// Listar todos os eventos
function listarTodos() {
  return eventos;
}
// Buscar um evento pelo ID
function buscarPorId(id) {
  return eventos.find((evento) => evento.id === id);
}
// Criar um novo evento
function criar(dados) {
  const novoEvento = {
    id: proximoId,
    nome: dados.nome,
    descricao: dados.descricao,

    data: dados.data,
    local: dados.local,
    capacidade: dados.capacidade,
  };
  proximoId++;
  eventos.push(novoEvento);
  return novoEvento;
}
// Atualizar um evento existente
function atualizar(id, dados) {
  const index = eventos.findIndex((evento) => evento.id === id);
  if (index === -1) return null;
  eventos[index] = {
    ...eventos[index], // mantém os dados antigos
    ...dados, // sobrescreve com os novos
    id: id, // garante que o ID não muda
  };
  return eventos[index];
}
// Deletar um evento
function deletar(id) {
  const index = eventos.findIndex((evento) => evento.id === id);
  if (index === -1) return false;
  eventos.splice(index, 1);
  return true;
}
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};
