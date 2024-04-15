const { Model, DataTypes } = require('sequelize');

const CATEGORIES_TABLE = 'categories';

const CategoriesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class Categories extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: 'Categories',
      timestamps: false,
    };
  }
}

module.exports = { Categories, CategoriesSchema, CATEGORIES_TABLE };
