// src/app.js
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const logger = require("./middlewares/logger");
const cors = require("cors");
const responseTime = require("./middlewares/responseTime");
const path = require('path');
require('./events/notificacaoObserver'); 
const notificacaoRoutes = require('./routes/notificacaoRoutes');



// ============================================
// MIDDLEWARES GLOBAIS
// ============================================
app.use(express.json());
app.use(logger);
app.use(cors());
app.use(responseTime);
app.use('/notificacoes', notificacaoRoutes);


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
const exportRoutes = require('./routes/exportRoutes');
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);
app.use('/exportar', exportRoutes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// No seu app.js ou server.js
require("./src/events/notificacaoObserver");
require("./src/events/logObserver"); // Adicione essa linha para ativar o observer de eventos

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
