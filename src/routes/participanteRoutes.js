// src/routes/participanteRoutes.js
const appEmitter = require("../events/eventEmitter");
const express = require("express");
const router = express.Router();
const ParticipanteController = require("../controllers/ParticipanteController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Participante:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         nome:
 *           type: string
 *           description: Nome do participante
 *         email:
 *           type: string
 *           description: E-mail do participante
 *       example:
 *         id: 1
 *         nome: Ana Silva
 *         email: ana@email.com
 */

/**
 * @swagger
 * /participantes:
 *   get:
 *     summary: Listar todos os participantes
 *     tags: [Participantes]
 *     responses:
 *       200:
 *         description: Lista de participantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Participante'
 */
router.get("/", ParticipanteController.index);

/**
 * @swagger
 * /participantes/{id}:
 *   get:
 *     summary: Buscar participante por ID
 *     tags: [Participantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do participante
 *     responses:
 *       200:
 *         description: Participante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participante'
 *       404:
 *         description: Participante não encontrado
 */
router.get("/:id", ParticipanteController.show);

/**
 * @swagger
 * /participantes:
 *   post:
 *     summary: Criar um novo participante
 *     tags: [Participantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               nome: "Carlos Souza"
 *               email: "carlos@email.com"
 *     responses:
 *       201:
 *         description: Participante criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", async (req, res, next) => {
  try {
    // 1. Cria uma resposta interceptando a função original do Controller
    const originalJson = res.json;
    
    // Modifica temporariamente o res.json para capturar os dados do participante criado
    res.json = function (dados) {
      if (res.statusCode === 201 || dados.id) {
        console.log(`[ROTAS] Interceptado! Participante criado: ${dados.nome}`);
        
        // 2. Força o disparo do evento para o notificacaoObserver
        if (appEmitter) {
          appEmitter.emit("participante:criado", dados);
          console.log("[ROTAS] Evento 'participante:criado' disparado com sucesso!");
        }
      }
      return originalJson.call(this, dados);
    };

    // Executa o controller padrão do projeto
    await ParticipanteController.store(req, res, next);
  } catch (erro) {
    next(erro);
  }
});

/**
 * @swagger
 * /participantes/{id}:
 *   put:
 *     summary: Atualizar um participante
 *     tags: [Participantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Participante atualizado
 *       404:
 *         description: Participante não encontrado
 */
router.put("/:id", ParticipanteController.update);

/**
 * @swagger
 * /participantes/{id}:
 *   delete:
 *     summary: Deletar um participante
 *     tags: [Participantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Participante deletado
 *       404:
 *         description: Participante não encontrado
 */
router.delete("/:id", ParticipanteController.destroy);

module.exports = router;