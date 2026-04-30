class AppError extends Error {
  constructor(mensagem, statusCode) {
    super(mensagem);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

class NotFoundError extends AppError {
  constructor(recurso = "Recurso") {
    super(`${recurso} não encontrado(a)`, 404);
    this.name = "NotFoundError";
  }
}

class ValidationError extends AppError {
  constructor(mensagem) {
    super(mensagem, 400);
    this.name = "ValidationError";
  }
}

function isRequired(valor, campo) {
  if (!valor) return `${campo} é obrigatório`;
  return null;
}

function validar(erros) {
  const lista = erros.filter(Boolean);
  return lista.length > 0 ? lista : null;
}

module.exports = { validar, isRequired };

module.exports = { AppError, NotFoundError, ValidationError };
