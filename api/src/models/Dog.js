/*
[ ] Raza con las siguientes propiedades:
ID *
Nombre *
Altura *
Peso *
Años de vida
 */

const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Dog", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z ]*$/,
      },
    },
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        isInt: true,
      },
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        isInt: true,
      },
    },
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        isInt: true,
      },
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        isInt: true,
      },
    },
    life_span: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        isInt: true,
      },
      get() {
        return `${this.getDataValue("life_span")} years`;
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.weight_min} - ${this.weight_max}`;
      },
    },
    height: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.height_min} - ${this.height_max}`;
      },
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
