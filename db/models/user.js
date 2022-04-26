const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate = (models) =>
      this.hasMany(models.Expense, {
        foreignKey: 'userId',
      });

    static findByUsername = (username) =>
      User.findOne({
        where: { username },
      });

    comparePassword = (password) => bcrypt.compare(password, this.passwordHash);

    setPassword = (password) =>
      bcrypt
        .genSalt(12)
        .then((salt) => bcrypt.hash(password, salt))
        .then((passwordHash) => {
          this.passwordHash = passwordHash;
        });

    setIncome = (income) => {
      this.income = income;
      return this.save();
    };
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
        },
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\$2[ayb]\$.{56}$/,
        },
      },
      income: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: 'user',
    }
  );

  return User;
};
