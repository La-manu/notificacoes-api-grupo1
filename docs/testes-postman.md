### Eventos
- [✅] `GET /eventos` → retorna lista paginada com metadados
- [✅] `GET /eventos?busca=Workshop` → filtra por nome
- [✅] `GET /eventos/1` → retorna evento com todos os campos
- [✅] `GET /eventos/9999` → retorna 404 formatado
- [✅] `POST /eventos` com dados válidos → 201, retorna com ID e timestamps
- [✅] `POST /eventos` sem nome → 400, mensagem de validação
- [✅] `POST /eventos` com capacidade negativa → 400
- [✅] `PUT /eventos/1` → atualiza campos parcialmente
- [✅] `DELETE /eventos/1` → 204
- [✅] `POST /eventos/2/banner` com imagem → upload funciona


### Participantes

- [✅] `GET /participantes` → lista todos
- [✅] `POST /participantes` com dados válidos → 201
- [✅] `POST /participantes` com email duplicado → 409 (conflito)
- [✅] `POST /participantes` com email inválido → 400


### Inscrições

- [✅] `POST /inscricoes` com IDs válidos → 201
- [✅] `POST /inscricoes` duplicada → 400, "já inscrito"
- [✅] `POST /inscricoes` com evento inexistente → 404
- [✅] `GET /inscricoes` → lista com dados de evento e participante (include)
- [✅] `GET /inscricoes/evento/2` → filtra por evento
- [✅] `PATCH /inscricoes/1/cancelar` → status muda para "cancelada"

### Exportação e Relatórios

- [✅] `GET /exportar/eventos/xml` → retorna XML válido
- [✅] `GET /exportar/eventos/json` → retorna JSON para download
- [✅] `GET /exportar/relatorio/inscricoes` → retorna relatório formatado

### Infraestrutura

- [✅] `GET /rota-invalida` → 404 padronizado (middleware notFound)
- [✅] Cache funciona (segundo GET é mais rápido)
- [✅] **Reiniciar servidor** → dados persistem
- [ ] `npm run db:reset` → limpa e recria tudo com seeds
- [✅] Swagger acessível em `/api-docs`
