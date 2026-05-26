const appEmitter = require('../events/eventEmitter');
const { Participante } = require('../models');
const { NotFoundError } = require('../errors/AppError');


async function listarTodos() {
  const participante = await Participante.findAll({
    order: [['data', 'ASC']],
  });
  return participante;
}


async function buscarPorId(id) {
  const participante = await Participante.findByPk(id);

  if (!participante) {
    throw new NotFoundError('Participante');
  }

  return participante;
}

// Dentro da função que faz o cadastro:
async function criar(req, res, next) {
  try {
    // Linha existente que cria o participante (pode estar chamando o Service ou o Model direto)
    const novoParticipante = await Participante.create(req.body); 

    // ✨ COLOQUE O DISPARO DIRETAMENTE AQUI NO CONTROLLER:
    if (appEmitter && typeof appEmitter.emit === 'function') {
      appEmitter.emit("participante:criado", novoParticipante);
      console.log("[CONTROLLER] Evento emitido com sucesso!");
    } else {
      console.log("[CONTROLLER] Erro: appEmitter não foi importado corretamente.");
    }

    return res.status(201).json(novoParticipante);
  } catch (erro) {
    next(erro);
  }
}


/**
 * @swagger
 * /api/upload:
 * post:
 * summary: Realiza o upload de uma única imagem
 * description: Envia uma imagem para o servidor. O arquivo é validado por tipo (JPEG, PNG, GIF, WebP) e tamanho máximo de 5MB.
 * tags:
 * - Upload
 * requestBody:
 * required: true
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * file:
 * type: string
 * format: binary
 * description: O arquivo de imagem a ser enviado.
 * responses:
 * 200:
 * description: Arquivo enviado e salvo com sucesso.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * mensagem:
 * type: string
 * example: "Arquivo enviado com sucesso!"
 * filename:
 * type: string
 * example: "1716728400000-482910482.png"
 * 400:
 * description: Erro na validação do arquivo (tamanho ou tipo inválido).
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * example: "Tipo de arquivo não permitido. Use: JPEG, PNG, GIF ou WebP"
 */


// Atualizar e deletar ficam para a próxima aula
async function atualizar(id, dados) { /* TODO */ }


async function deletar(id) { /* TODO */ }


module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };