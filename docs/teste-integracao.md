### Roteiro de Testes

| # | Ação | Endpoint | Esperado |
|---|---|---|---|
| 1 | Listar eventos (seed) | `GET /eventos` | 3 eventos retornados | ✅
| 2 | Criar evento novo | `POST /eventos` | 201, evento com ID 4 | ✅
| 3 | Criar participante | `POST /participantes` | 201, participante com ID 4 | ✅
| 4 | Inscrever no evento | `POST /inscricoes` (eventoId: 4, participanteId: 4) | 201, inscrição criada | ✅
| 5 | Verificar e-mail enviado | Abrir MailPit no navegador | E-mail de confirmação bonito | ✅
| 6 | Verificar notificação no banco | `GET /notificacoes` | Notificação com `enviada: true` | ✅
| 7 | Tentar inscrição duplicada | `POST /inscricoes` (mesmos IDs) | 400, "já inscrito" | ✅
| 8 | Cancelar inscrição | `PATCH /inscricoes/:id/cancelar` | 200, status "cancelada" | ✅
| 9 | Verificar e-mail de cancelamento | Abrir MailPit | E-mail de cancelamento | ✅
| 10 | Ver estatísticas | `GET /notificacoes/estatisticas` | total, enviadas, porTipo | ✅
| 11 | Reenviar notificação | `POST /notificacoes/1/reenviar` | 200 + e-mail no MailPit | ✅
| 12 | Exportar eventos XML | `GET /exportar/eventos/xml` | XML válido | ✅
| 13 | Exportar relatório | `GET /exportar/relatorio/inscricoes` | JSON com inscritos por evento | ✅
| 14 | Upload de banner | `POST /eventos/2/banner` (form-data) | Banner salvo |
| 15 | Swagger completo | `GET /api-docs` | Página funcional | ✅
| 16 | **Reiniciar servidor** | `Ctrl+C` + `npm run dev` | — | ✅
| 17 | Listar eventos | `GET /eventos` | Tudo persiste! | ✅