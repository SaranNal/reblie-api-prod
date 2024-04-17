"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  roles.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true, // Explicitly set the 'id' column as the primary key
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: DataTypes.STRING,
      displayName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "roles",
    }
  );
  return roles;
};
