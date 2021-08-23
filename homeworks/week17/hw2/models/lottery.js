// 'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Lottery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lottery.belongsTo(models.User)
    }
  }
  Lottery.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imgURL: DataTypes.TEXT,
    chance: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    isDeleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lottery'
  })
  return Lottery
}
