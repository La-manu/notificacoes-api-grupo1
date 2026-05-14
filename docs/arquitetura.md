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

## 6. Estrutura de Pastas
notificacoes-api-grupo1/
├── docs/
├── src/
│   ├── config/
│       ├── cache.js 
        ├── database.js
        ├── database.json.example
        ├── upload.js
│   ├── controllers/
│   │   ├── EventoController.js
│   │   ├── InscricaoController.js
│   │   └── ParticipanteController.js
    ├── database
        ├── migrations
        ├── seeders 
│   ├── errors/
│   │   └── AppError.js
│   ├── helpers/
│   │   └── validators.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── notFound.js
│   │   └── responseTime.js
        ├── cacheMiddleware
│   ├── models/
│   │   ├── EventoModel.js
│   │   ├── index.js
│   │   ├── InscricaoModel.js
│   │   ├── NotificacaoModel.js
│   │   └── ParticipanteModel.js
│   ├── models-antigos/
│   │   ├── EventoModel.js
│   │   ├── InscricaoModel.js
│   │   └── ParticipanteModel.js
│   ├── routes/
│   │   ├── eventoRoutes.js
│   │   ├── inscricaoRoutes.js
│   │   └── participanteRoutes.js
        ├── exportRoutes.js
│   ├── services/
│   │   ├── EventoService.js
│   │   ├── InscricaoService.js
│   │   └── ParticipanteService.js
│   ├── app.js
│   ├── server.js
│   └── swagger.js
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── README.md


## 7. Variáveis de Ambiente

| Variável | Descrição         | Exemplo         |
| -------- | ----------------- | --------------- |
| PORT     | Porta do servidor | 3000            |
| DB_HOST  | Host do MySQL     | localhost       |
| DB_NAME  | Nome do banco     | notificacoes_db |
| ...      | ...               | ...             |

> **Capacidade técnica exercitada:** 9 (documentação técnica do sistema)

### Tempo restante: trabalho técnico

Use o tempo restante da aula para avançar no projeto PBE (persistência, banco de dados).
