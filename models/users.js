'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        roleId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        accountVerified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        website: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        companyId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        companyName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        source: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isPrimary: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        linkedInId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        stripeCustomerId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lastLogin: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        token: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        sessionToken: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        byPassSubscription: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        subscriptionId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        companySubscriptionType: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        mapExported: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        logoUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        }
  }, {
    sequelize,
    modelName: 'users',
    paranoid: true,
  });
  users.beforeCreate(async (user) => {
    const saltRounds = 10;
    if (user.password) {
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  });
  users.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

  return users;
};