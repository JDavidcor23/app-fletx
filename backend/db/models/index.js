const { Products, ProductsSchema } = require('./product.model');
const { Categories, CategoriesSchema } = require('./categories.model');

function setupModels(sequelize) {
  Products.init(ProductsSchema, Products.config(sequelize));
  Categories.init(CategoriesSchema, Categories.config(sequelize));
}

module.exports = setupModels;
