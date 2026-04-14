// src/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const mensagem = err.message || "Erro interno do servidor";
  console.error(`[ERRO] ${err.name}: ${mensagem}`);
  const resposta = {
    erro: {
      tipo: err.name || "Error",
      mensagem: mensagem,
      statusCode: statusCode,
    },
  };
  // Em desenvolvimento, inclui o stack trace (útil para debug)
  // Em produção, esconde detalhes técnicos
  if (process.env.NODE_ENV === "development") {
    // O que adicionar aqui para ajudar no debug?
    // Dica: err.stack contém o rastro completo do erro
    // _________________________________
  }
  res.status(statusCode).json(resposta);
}
module.exports = errorHandler;
