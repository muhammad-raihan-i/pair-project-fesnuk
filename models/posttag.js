'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post,{foreignKey:"PostId"})
      this.belongsTo(models.Tag,{foreignKey:"TagId"})
    }
  }
  PostTag.init({
    TagId: {type:DataTypes.INTEGER,
      references:{
        model:"Tags",
        key:"id"
      },
      onUpdate:"cascade",
      onDelete:"cascade"
    },
    PostId: {type:DataTypes.INTEGER,
      references:{
        model:"Post",
        key:"id"
      },
      onUpdate:"cascade",
      onDelete:"cascade"
    }
  }, {
    sequelize,
    modelName: 'PostTag',
  });
  return PostTag;
};