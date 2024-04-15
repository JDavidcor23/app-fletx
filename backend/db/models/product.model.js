const { Model, DataTypes } = require('sequelize');

const PRODUCTS_TABLE = 'products';

const ProductsSchema = {
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
  category_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  value: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  stock: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  creation_date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

class Products extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Products',
      timestamps: false,
    };
  }
}

module.exports = { Products, ProductsSchema, PRODUCTS_TABLE };
