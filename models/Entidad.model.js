import { DataTypes } from "sequelize";
import { sequelize } from "../src/connection.js";


const Entidad = sequelize.define('entidad', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: true, paranoid: true });

// Entity.sync({ alter: true })
// Entity.sync({ force: false })


export { Entidad };