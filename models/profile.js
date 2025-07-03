'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:"UserId"})
    }
  }
  Profile.init({
    phoneNumber: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    name: DataTypes.STRING,
    profilePicUrl: DataTypes.STRING,
    bio: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};