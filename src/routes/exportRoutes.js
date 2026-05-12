// src/routes/exportRoutes.js
const express = require("express");
const router = express.Router();

const { create } = require("xmlbuilder2");

const { Inscricao, Evento, Participante } = require("../models");

/**
 * @swagger
 * /exportar/eventos/xml:
 *   get:
 *     summary: Exporta a lista de eventos em formato XML
 *     tags: [Exportação]
 *     responses:
 *       200:
 *         description: Arquivo XML gerado com sucesso
 */


// GET /exportar/eventos/xml — exportar eventos em XML

/**
 * @swagger
 * /exportar/eventos/json:
 *   get:
 *     summary: Exporta a lista de eventos em formato JSON
 *     tags: [Exportação]
 *     responses:
 *       200:
 *         description: Lista de eventos em JSON
 */


// GET /exportar/eventos/json — exportar eventos em JSON (download)
router.get("/eventos/json", async (req, res, next) => {
  try {
    const eventos = await Evento.findAll({
      order: [["data", "ASC"]],
      raw: true,
    });

    res.set("Content-Type", "application/json");
    res.set("Content-Disposition", 'attachment; filename="eventos.json"');
    res.json(eventos);
  } catch (erro) {
    next(erro);
  }
});

router.get("/eventos/xml", async (req, res, next) => {
  try {
    const eventos = await Evento.findAll({ order: [["data", "ASC"]] });

    const xml = create({ version: "1.0", encoding: "UTF-8" }).ele("eventos");

    eventos.forEach((evento) => {
      xml
        .ele("evento")
        .ele("id")
        .txt(String(evento.id))
        .up()
        .ele("nome")
        .txt(evento.nome)
        .up()
        .ele("descricao")
        .txt(evento.descricao || "")
        .up()
        .ele("data")
        .txt(evento.data.toISOString())
        .up()
        .ele("local")
        .txt(evento.local || "")
        .up()
        .ele("capacidade")
        .txt(String(evento.capacidade || 0))
        .up()
        .up();
    });

    const xmlString = xml.end({ prettyPrint: true });

    res.set("Content-Type", "application/xml");
    res.send(xmlString);
  } catch (erro) {
    next(erro);
  }
});

router.get("/inscricao/xml", async (req, res, next) => {
  try {
    const inscricoes = await Inscricao.findAll({
      include: [
        {
          model: Evento,
          as: "evento",
          attributes: ["nome", "data", "local"],
        },
        {
          model: Participante,
          as: "participante",
          attributes: ["nome", "email"],
        },
      ],
    });

    const xml = create({ version: "1.0", encoding: "UTF-8" }).ele("inscricoes");

    inscricoes.forEach((inscricao) => {
      xml
        .ele("inscricao")
        .ele("id")
        .txt(String(inscricao.id))
        .up()
        .ele("nome")
        .txt(inscricao.evento.nome)
        .up()
        .ele("local")
        .txt(inscricao.evento.local || "")
        .up()
        .ele("capacidade")
        .txt(String(inscricao.evento.capacidade || 0))
        .up()
        .up();
    });

    const xmlString = xml.end({ prettyPrint: true });

    res.set("Content-Type", "application/xml");
    res.send(xmlString);
  } catch (erro) {
    next(erro);
  }
});

/**
 * @swagger
 * /exportar/relatorio/inscricoes:
 *   get:
 *     summary: Gera um relatório completo de inscrições
 *     tags: [Exportação]
 *     responses:
 *       200:
 *         description: Relatório gerado com sucesso
 *       500:
 *         description: Erro interno no servidor
 */


router.get("/relatorio/inscricoes", async (req, res, next) => {
  try {
    const eventos = await Evento.findAll({
      include: [
        {
          model: Inscricao,
          as: "inscricoes",
          include: [
            {
              model: Participante,
              as: "participante",
              attributes: ["nome", "email"],
            },
          ],
        },
      ],
      order: [["data", "ASC"]],
    });

    // Formatar o relatório
    const relatorio = eventos.map((evento) => ({
      evento: evento.nome,
      data: evento.data,
      capacidade: evento.capacidade,
      totalInscritos: evento.inscricoes.length,
      vagasRestantes: (evento.capacidade || 0) - evento.inscricoes.length,
      inscritos: evento.inscricoes.map((i) => ({
        nome: i.participante.nome,
        email: i.participante.email,
        status: i.status,
        dataInscricao: i.dataInscricao,
      })),
    }));

    res.json({
      geradoEm: new Date().toISOString(),
      totalEventos: relatorio.length,
      relatorio,
    });
  } catch (erro) {
    next(erro);
  }
});

router.get("/relatorio/inscricoes/csv", async (req, res, next) => {
  try {
    const inscricoes = await Inscricao.findAll({
      include: [
        { model: Evento, as: "evento", attributes: ["nome", "data"] },
        {
          model: Participante,
          as: "participante",
          attributes: ["nome", "email"],
        },
      ],
      raw: true,
      nest: true,
    });

    // Montar o cabeçalho do CSV
    let csv =
      "ID,Evento,Data Evento,Participante,Email,Status,Data Inscricao\n";

    // Montar as linhas
    inscricoes.forEach((i) => {
      const dataEv = new Date(i.evento.data).toLocaleDateString("pt-BR");
      const dataIns = new Date(i.createdAt).toLocaleDateString("pt-BR");

      csv += `${i.id},"${i.evento.nome}","${dataEv}","${i.participante.nome}","${i.participante.email}","${i.status}","${dataIns}"\n`;
    });

    res.set("Content-Type", "text/csv");
    res.set("Content-Disposition", 'attachment; filename="inscricoes.csv"');
    res.send(csv);
  } catch (erro) {
    next(erro);
  }
});

module.exports = router;
