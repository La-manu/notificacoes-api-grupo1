### Rotas documentadas no Swagger

| Rota | Documentada? |
|---|---|
| **Eventos** | |
| GET /eventos | ✅ |
| GET /eventos/:id | ✅ |
| POST /eventos | ✅ |
| PUT /eventos/:id | ✅ |
| DELETE /eventos/:id | ✅ |
| POST /eventos/:id/banner | ✅ |
| **Participantes** | |
| GET /participantes | ✅ |
| GET /participantes/:id | ✅ |
| POST /participantes | ✅ |
| PUT /participantes/:id | ✅ |
| DELETE /participantes/:id | ✅ |
| **Inscrições** | |
| POST /inscricoes | ✅ |
| GET /inscricoes | ✅ |
| GET /inscricoes/evento/:eventoId | ✅ |
| PATCH /inscricoes/:id/cancelar | ✅ |
| **Notificações** | |
| GET /notificacoes | ✅ |
| GET /notificacoes/estatisticas | ✅ |
| GET /notificacoes/:id | ✅ |
| POST /notificacoes/:id/reenviar | ✅ |
| POST /notificacoes/teste-email | ✅ |
| **Exportação** | |
| GET /exportar/eventos/xml | ✅ |
| GET /exportar/eventos/json | ✅ |
| GET /exportar/relatorio/inscricoes | ✅ |