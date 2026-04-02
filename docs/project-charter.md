# Project Charter — API de Notificações

## 1. Nome do Projeto

API de Notificações por E-mail para Plataforma de Eventos

## 2. Objetivo

Desenvolver uma API REST que gerencie o envio de notificações por e-mail
(confirmação de inscrição e lembretes) para participantes de eventos.

## 3. Justificativa

Este módulo é necessário para automatizar a comunicação com os participantes dos eventos, garantindo que eles recebam informações importantes como confirmação de inscrição e lembretes.

Sem esse sistema, o envio de e-mails teria que ser feito manualmente, o que aumenta o risco de erros, atrasos e falta de padronização. A API resolve esse problema ao centralizar e automatizar o processo de notificações, tornando-o mais eficiente, confiável e escalável.

## 4. Escopo

### Incluído:

- CRUD de Eventos, Participantes e Inscrições
- Módulo de notificações por e-mail (simulado)
- Documentação com Swagger
- Deploy em plataforma de nuvem

### Não incluído:

- Autenticação de usuários
- Front-end
- Envio de SMS ou push notifications

## 5. Equipe

| Nome                           | Função/Responsabilidade                     |
| ------------------------------ | ------------------------------------------- |
| [Membro 1 - Amanda]            | [ex: Líder técnico, responsável pelo banco] |
| [Membro 2 - Ana Julia Thimote] | [ex: Responsável pela documentação]         |
| [Membro 3 - Layra Emanuelle]   | [ex: Responsável pelos testes]              |
| [Membro 4 - Beatriz]           | [ex: Responsável pelos testes ]             |

## 6. Tecnologias

Node.js, Express.js, MySQL, Sequelize, Swagger, Nodemailer, Git/GitHub

## 7. Prazo

Início: [26/03/2026] | Entrega final: [16/04/2026]

## 8. Critérios de Sucesso

- [ ] API funcional com todos os CRUDs
- [ ] Dados persistidos em MySQL
- [ ] Notificações por e-mail funcionando (simulado)
- [ ] Documentação Swagger completa
- [ ] Deploy realizado
- [ ] Apresentação aprovada
