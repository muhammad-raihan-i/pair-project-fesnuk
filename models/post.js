'use strict';
const {
  Model
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
  }
  Post.init({
    content: DataTypes.STRING,
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