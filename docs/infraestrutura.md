# Infraestrutura e Dependências

## Ambiente de Desenvolvimento

- **OS:** Windows 10/11
- **Runtime:** Node.js v18+
- **IDE:** VS Code
- **Banco:** MySQL 8.0 (instalado na UC de BD)
- **Versionamento:** Git + GitHub

## Dependências do Projeto (package.json)

| Pacote             | Versão | Finalidade                   |
| ------------------ | ------ | ---------------------------- |
| express            | ^4.x   | Framework web                |
| mysql2             | ^3.x   | Driver MySQL                 |
| sequelize          | ^6.x   | ORM                          |
| swagger-jsdoc      | ^6.x   | Geração de docs              |
| swagger-ui-express | ^5.x   | UI do Swagger                |
| dotenv             | ^16.x  | Variáveis de ambiente        |
| cors               | ^2.x   | Compartilhamento de recursos |
| multer             | ^1.x   | Upload de arquivos           |
| nodemailer         | ^6.x   | Envio de e-mail              |
| node-cache         | ^5.x   | Cache em memória             |

## Dependências de Desenvolvimento

| Pacote        | Versão | Finalidade          |
| ------------- | ------ | ------------------- |
| nodemon       | ^3.x   | Reinício automático |
| sequelize-cli | ^6.x   | Migrations/Seeds    |

## Serviços Externos

- **Mailtrap/Ethereal** — servidor de e-mail simulado (gratuito)
- **Render/Railway** — plataforma de deploy (gratuito)
