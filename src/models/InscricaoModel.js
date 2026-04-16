// src/models/InscricaoModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Inscricao = sequelize.define(
  "Inscricao",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dataInscricao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "data_inscricao",
    },
    status: {
      type: DataTypes.ENUM("confirmada", "cancelada"),
      allowNull: false,
      defaultValue: "confirmada",
    },
    evento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "eventos",
        key: "id",
      },
    },

    participante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "participantes",
        key: "id",
      },
    },
  },
  {
    tableName: "inscricoes",
    timestamps: true,
    underscored: true,
  },
);
module.exports = Inscricao;
