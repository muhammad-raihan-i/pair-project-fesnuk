'use strict';
const {CensorSensor} = require('censor-sensor');
const censor = new CensorSensor();
const {
  Model,
  Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:"UserId"})
      this.hasMany(models.PostTag,{foreignKey:"PostId"})
    }

    static async findPostByContent(content){
      return await this.findAll({
                      include:{
                          model : sequelize.models.PostTag,
                          include: {
                              model : sequelize.models.Tag,
                          }
                      },
                      where : {
                          content : {
                              [Op.iLike] : `%${content}%`
                          }
                      }
                  })
    }
  }
  Post.init({
    content: {type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Content required."
        },
        notNull:{
          msg:"Content required."
        },
        hasProfanity(val){
          if(censor.isProfaneIsh(val)){
            throw new error("Contains profanity.")
          }
        }
      }    
    },
    image: DataTypes.STRING,
    UserId: {type:DataTypes.INTEGER,
      references:{
        model:"Users",
        key:"id"
      },
      onUpdate:"cascade",
      onDelete:"cascade"
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};