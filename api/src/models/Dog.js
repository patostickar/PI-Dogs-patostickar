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
    },
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    weigth: {
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
