# Relatório Técnico — API de Notificações
**Grupo:** [01]
**Membros:** [Amanda Nº 03; Ana Thimote Nº 04; Beatriz Nº 07; Layra Nº 15;]
**Data:** [21 de Maio de 2026]

---

## 1. Introdução
### 1.1 Objetivo do Projeto
vc faz inscrição em um evento como participante e envia notificações avisando da inscrição realizada, ou caso haja um cancelamento de inscrição fazendo seu status passar para cancelado. Avisa também quando está perto da data do evento. 
[Descreva em 2-3 parágrafos o que o projeto faz e por que ele é necessário]
### 1.2 Escopo
### Incluído:

- CRUD de Eventos, Participantes e Inscrições
- Módulo de notificações por e-mail (simulado)
- Documentação com Swagger
- Deploy em plataforma de nuvem

### Não incluído:

- Autenticação de usuários
- Front-end
- Envio de SMS ou push notifications

---

## 2. Tecnologias Utilizadas
| Tecnologia | Versão | Justificativa |
| ---------- | ------ | --------------------------- |
| Node.js    | v18+   | [por que escolheram] |
| Express.js | 4.x    | [por que] |
| MySQL      | 8.0    | [para usar o banco de dados] |
| Sequelize  | 6.x    | [por que] |
| ... | | |

---

## 3. Arquitetura do Sistema

### 3.1 Diagrama de Classes

[Referência ao diagrama UML em docs/]

### 3.2 Arquitetura em Camadas
[Descreva brevemente: Routes → Controllers → Services → Models → MySQL]

### 3.3 Banco de Dados

[Quantas tabelas, relacionamentos principais]

---

## 4. Funcionalidades Implementadas
| Funcionalidade | Status | Bloco PBE |
| --------------------------------- | ----------- | --------- |
| CRUD de Eventos | ✅ Completo | 1 e 3 |
| CRUD de Participantes | ✅ Completo | 1 e 3 |
| Inscrições | ✅ Completo | 1 e 3 |
| Middlewares e tratamento de erros | ✅ Completo | 2 |
| Validação de dados | ✅ Completo | 2 |
| Persistência MySQL | ✅ Completo | 3 |
| Exportação JSON/XML | ✅ Completo | 3 |
| Upload de arquivos | ✅ Completo | 3 |
| Notificações por e-mail | [status] | 4 |
| Deploy | [status] | 5 |
| Documentação Swagger | [status] | 5 |

---

## 5. Processo de Desenvolvimento
### 5.1 Metodologia
[Ágil com sprints de 2 semanas, Kanban no GitHub Projects]
### 5.2 Divisão de Trabalho
[Quem fez o quê — referência à matriz RACI]
### 5.3 Controle de Versão
[Quantos commits, como organizaram branches]

---

## 6. Desafios e Soluções
| Desafio | Como resolvemos |
| ------------------------------- | ------------------------------------------- |

| [ex: conflitos de merge] | [ex: combinamos de sempre fazer pull antes] |
| [ex: Sequelize logging confuso] | [ex: desativamos em produção] |

---

## 7. Lições Aprendidas
[O que cada membro aprendeu de mais importante durante o projeto]

---

## 8. Próximos Passos (se o projeto continuasse)
[O que fariam se tivessem mais tempo — autenticação, front-end, notificações push, etc.]

---

## 9. Referências
- [Documentação do Express.js](https://expressjs.com/)
- [Documentação do Sequelize](https://sequelize.org/)
- [Documentação do Nodemailer](https://nodemailer.com/)