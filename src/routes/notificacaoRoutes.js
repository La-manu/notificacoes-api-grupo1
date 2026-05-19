const express = require("express");
const router = express.Router();
const { Notificacao, Inscricao, Evento, Participante } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const notificacoes = await Notificacao.findAll({
      include: [
        {
          model: Inscricao,
          as: "inscricao",
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

module.exports = router;
