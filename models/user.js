'use strict';
const hashPassword = require('../helpers/helper')
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Profile,{foreignKey:"UserId"})
    }
  }
  User.init({
    username: {type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Password Required"
        },
        notEmpty:{
          msg:"Password Required"
        }
      }
    },
    email: {type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Username Required"
        },
        notEmpty:{
          msg:"Username Required"
        }
      }
    },
    password: DataTypes.STRING
  }, {
        hooks:{
      beforeCreate(instance, options){
        hashPassword(instance)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};