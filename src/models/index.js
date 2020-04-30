// Dependencies
import Sequelize from "sequelize";

// Configuration
import { $db } from "../../config";

// Db Connection
const { database, username, password, dialect, host } = $db();

const sequelize = new Sequelize(database, username, password, {
  dialect,
  define: {
    underscored: true
  },
  protocol: "postgres",
  port: 5432,
  host: host,
  dialectOptions: {
    ssl: true
  }
});

// Models
const models = {
  Post: sequelize.import("./Post"),
  Tag: sequelize.import("./Tag"),
  User: sequelize.import("./User")
};

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

export default models;
