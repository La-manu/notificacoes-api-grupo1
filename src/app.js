// src/app.js
const express = require("express");
const app = express();

// Middleware para ler JSON no body
app.use(express.json());

// No topo, junto com os outros requires:
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
// Depois do app.use(express.json()):
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const logger = require("./middlewares/logger");
app.use(logger);

const cors = require("cors");
app.use(cors());
// Importar rotas
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");

// Usar rotas com prefixo
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Notificações",
    rotas: {
      eventos: "/eventos",
      participantes: "/participantes",
      inscricoes: "/inscricoes",
    },
  });
});


// ... todas as rotas acima ...
// Middleware de rota não encontrada (sempre por último!)
const notFound = require("./middlewares/notFound");
app.use(notFound);


module.exports = app;
