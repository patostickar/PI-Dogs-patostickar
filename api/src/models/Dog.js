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
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life_span_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life_span_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    life_span: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.lifespan_min} - ${this.lifespan_max} years`;
      },
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
