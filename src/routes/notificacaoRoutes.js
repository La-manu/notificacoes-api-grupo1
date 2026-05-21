const express = require("express");
const router = express.Router();
const { Notificacao, Inscricao, Evento, Participante } = require("../models");
const EmailService = require('../services/EmailService');

// GET /notificacoes — Listar todas as notificações
router.get("/", async (req, res, next) => {
  try {
    const notificacoes = await Notificacao.findAll({
      include: [
        {
          model: Inscricao,
          as: "inscricao",
          foreignKey: "inscricao_id", // 👈 ISSO DAQUI FORÇA O SEQUELIZE A USAR A COLUNA CORRETA DO MYSQL
          include: [
            { model: Evento, as: "evento", attributes: ["nome"] },
            {
              model: Participante,
              as: "participante",
              attributes: ["nome", "email"],
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    res.json(notificacoes);
  } catch (erro) {
    next(erro);
  }
});

// POST /notificacoes/teste-email — Enviar e-mail de teste via MailPit
router.post('/teste-email', async (req, res, next) => {
  try {
    console.log("📥 [Rotas] Iniciando requisição de e-mail de teste...");

    const resultado = await EmailService.enviar(
      'teste@exemplo.com',
      'Teste da API de Notificações',
      '<h1>Funcionou! 🎉</h1><p>Este e-mail foi enviado pela nossa API.</p>'
    );

    console.log("✅ [Rotas] Resposta do EmailService recebida com sucesso.");

    res.json({
      mensagem: 'E-mail de teste enviado!',
      messageId: resultado.messageId,
      visualizarEm: resultado.visualizarEm,
    });

  } catch (erro) {
    console.error("❌ [Rotas] Erro ao enviar e-mail de teste:", erro);
    next(erro);
  }
});

module.exports = router;
