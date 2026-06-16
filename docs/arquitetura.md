# Documentação de Arquitetura — API de Notificações

## 1. Visão Geral

A API de Notificações é um módulo back-end REST responsável por gerenciar o envio
de notificações por e-mail para participantes de eventos em uma plataforma de eventos.

## 2. Arquitetura em Camadas

Cliente (Postman/Browser)
│
▼
[Middlewares] → express.json, cors, responseTime, cacheMiddleware
│
▼
[Routes] → Mapeamento de URLs para Controllers
│
▼
[Controllers] → Recebe req, chama Service, monta res
│
▼
[Services] → Validação, regras de negócio
│
▼
[Models (Sequelize)] → Acesso ao banco de dados
│
▼
[MySQL] → Persistência

## 3. Entidades e Relacionamentos

| Entidade     | Tabela        | Descrição                          |
| ------------ | ------------- | ---------------------------------- |
| Evento       | eventos       | Representa um evento na plataforma |
| Participante | participantes | Pessoa cadastrada                  |
| Inscrição    | inscricoes    | Relação participante ↔ evento      |
| Notificação  | notificacoes  | E-mail enviado ou a enviar         |

### Relacionamentos:

- Evento 1 → N Inscrição
- Participante 1 → N Inscrição
- Inscrição 1 → N Notificação

## 4. Endpoints da API

### Eventos

| Método | Rota                | Descrição         |
| ------ | ------------------- | ----------------- |
| GET    | /eventos            | Listar (paginado) |
| GET    | /eventos/:id        | Buscar por ID     |
| POST   | /eventos            | Criar             |
| PUT    | /eventos/:id        | Atualizar         |
| DELETE | /eventos/:id        | Deletar           |
| POST   | /eventos/:id/banner | Upload de imagem  |

| Método | Rota                      | Descrição         |
| ------ | -------------------       | ----------------- |
| GET    | /participante             | Listar (paginado) |
| GET    | /participante/:id         | Buscar por ID     |
| POST   | /participantes            | Criar             |
| PUT    | /participantes/:id        | Atualizar         |
| DELETE | /participantes/:id        | Deletar           |
| POST   | /participantes/:id/banner | Upload de imagem  |

| Método | Rota                   | Descrição         |
| ------ | -------------------    | ----------------- |
| GET    | /inscricoes            | Listar (paginado) |
| GET    | /inscricoes/:id        | Buscar por ID     |
| POST   | /inscricoes            | Criar             |
| PUT    | /inscricoes/:id        | Atualizar         |
| DELETE | /inscricoes/:id        | Deletar           |
| POST   | /inscricoes/:id/banner | Upload de imagem  |



## 5. Tecnologias e Justificativa

| Tecnologia | Justificativa                                          |
| ---------- | ------------------------------------------------------ |
| Node.js    | Runtime JavaScript no servidor, conhecimento da equipe |
| Express.js | Framework minimalista e flexível                       |
| MySQL      | Banco relacional, sinergia com UC de BD                |
| Sequelize  | ORM que abstrai SQL, facilita migrations               |

### 5.1 Tecnologias Utilizadas e suas Finalidades
| Tecnologia           | Finalidade                     |
| -------------------- | ------------------------------ |
| Node.js              | Runtime                        |
| Express.js           | Framework web                  |
| MariaDB              | Banco de dados                 |
| Sequelize            | ORM                            |
| Nodemailer + MailPit | Envio de e-mails (teste local) |
| Swagger              | Documentação                   |
| Multer               | Upload de arquivos             |

## 6. Estrutura de Pastas
notificacoes-api-grupo1/
│
├── docs/
├── logs/
├── src/
│   │
│   ├── config/
│   │   ├── cache.js
│   │   ├── database.js
│   │   └── database.json.example
│   │
│   ├── controllers/
│   │   ├── EventoController.js
│   │   ├── InscricaoController.js
│   │   └── ParticipanteController.js
│   │
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 20260428125024-criar-tabela-eventos.js
│   │   │   ├── 20260428125035-criar-tabela-participantes.js
│   │   │   ├── 20260428125052-criar-tabela-inscricoes.js
│   │   │   ├── 20260428125711-criar-tabela-notificacoes.js
│   │   │   └── 20260503113837-adicionar-banner-eventos.js
│   │   │
│   │   └── seeders/
│   │       └── 20260428131301-dados-iniciais.js
│   │
│   ├── AppErrors/
│   │
│   ├── events/
│   │   ├── eventEmitter.js
│   │   ├── LogObserver.js
│   │   └── notificacaoObserver.js
│   │
│   ├── helpers/
│   │
│   ├── validators/
│   │
│   ├── middlewares/
│   │   ├── cacheMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── notFound.js
│   │   └── responseTime.js
│   │
│   ├── models/
│   │   ├── EventoModel.js
│   │   ├── index.js
│   │   ├── InscricaoModel.js
│   │   ├── NotificacaoModel.js
│   │   ├── ParticipanteModel.js
│   │   └── models-antigos/
│   │
│   ├── routes/
│   │   ├── eventoRoutes.js
│   │   ├── exportRoutes.js
│   │   ├── inscricaoRoutes.js
│   │   ├── notificacaoRoutes.js
│   │   └── participanteRoutes.js
│   │
│   ├── services/
│   │   ├── EmailService.js
│   │   ├── EventoService.js
│   │   ├── InscricaoService.js
│   │   ├── NotificacaoService.js
│   │   └── ParticipanteService.js
│   │
│   ├── templates/
│   │   └── email/
│   │       ├── baseTemplate.js
│   │       ├── cancelamentoInscricao.js
│   │       ├── confirmacaoInscricao.js
│   │       └── lembreteEvento.js
│   │
│   ├── app.js
│   ├── server.js
│   └── swagger.js
│
├── uploads/
├── .env.example
├── .gitignore
├── .sequelizerc
├── package-lock.json
├── package.json
└── README.md


## 🔧 Scripts Disponíveis

| Comando              | Descrição             |
| -------------------- | --------------------- |
| `npm start`          | Inicia em produção    |
| `npm run dev`        | Inicia com Nodemon    |
| `npm run db:migrate` | Executa migrations    |
| `npm run db:seed`    | Insere dados iniciais |
| `npm run db:reset`   | Recria banco completo |

## 7. Variáveis de Ambiente

| Variável | Descrição         | Exemplo         |
| -------- | ----------------- | --------------- |
| PORT     | Porta do servidor | 3000            |
| DB_HOST  | Host do MySQL     | localhost       |
| DB_NAME  | Nome do banco     | notificacoes_db |
| ...      | ...               | ...             |

> **Capacidade técnica exercitada:** 9 (documentação técnica do sistema)
