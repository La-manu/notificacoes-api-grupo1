// src/models/NotificacaoModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notificacao = sequelize.define(
  "Notificacao",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.ENUM("confirmacao", "lembrete"),
      allowNull: false,
    },
    destinatarioEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "destinatario_email",
      validate: {
        isEmail: { msg: "E-mail do destinatário inválido" },
      },
    },
    assunto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dataEnvio: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "data_envio",
    },
    enviada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    // ✨ CORREÇÃO CIRÚRGICA: Mapeia o JavaScript para a coluna correta do banco
    inscricaoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "inscricao_id", 
    },
  },
  {
    tableName: "notificacoes",
    timestamps: true,
    underscored: true,
  },
);

module.exports = Notificacao;
