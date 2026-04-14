// src/app.js
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const logger = require("./middlewares/logger");
const cors = require("cors");
const responseTime = require("./middlewares/responseTime");


// ============================================
// MIDDLEWARES GLOBAIS
// ============================================
app.use(express.json());
app.use(logger);
app.use(cors());
app.use(responseTime);


// ============================================
// DOCUMENTAÇÃO
// ============================================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============================================
// ROTAS
// ============================================
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);
// Rota raiz (informativa)
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Notificações",
    versao: "1.0.0",
    documentacao: "/api-docs",
    rotas: {
      eventos: "/eventos",
      participantes: "/participantes",
      inscricoes: "/inscricoes",
    },
  });
});

// ============================================
// MIDDLEWARES DE ERRO (sempre por último!)
// ============================================
const notFound = require("./middlewares/notFound");
app.use(notFound);

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;
