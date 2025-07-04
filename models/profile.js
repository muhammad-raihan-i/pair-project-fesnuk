'use strict';
 const {CensorSensor} = require('censor-sensor');
const censor = new CensorSensor();
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

     get formatDate(){
      return this.dateOfBirth.toISOString().split('T')[0]
     }
  }
  Profile.init({
    phoneNumber: {type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Name Required"
        },
        notEmpty:{
          msg:"Name Required"
        }
      }
    },
    dateOfBirth: {type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Date Required"
        },
        notEmpty:{
          msg:"Date Required"
        },
        isToday(val){
          let today=new Date().getFullYear()
          let birth=new Date(val).getFullYear
          if(today-birth<=10){
            throw new Error("Minimum age is 10.")
          }
        }
      }
    },
    name: {type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Name Required"
        },
        notEmpty:{
          msg:"Name Required"
        }
      }
    },
    profilePicUrl: {type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Picture Required"
        },
        notEmpty:{
          msg:"Picture Required"
        }
      }
    },
    bio: {type:DataTypes.TEXT,
      validate:{
        hasProfanity(val){
          if(censor.isProfaneIsh(val)){
            throw new error("Contains profanity.")
          }
        }
      }
    },
    UserId: DataTypes.INTEGER,
    nickName: DataTypes.STRING
    }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};