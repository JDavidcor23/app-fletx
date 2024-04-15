const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3).max(80);
const category_id = Joi.number().integer().min(1);
const price = Joi.number().integer().min(10);
const value = Joi.number().integer().min(0);
const stock = Joi.string().min(1);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  category_id: category_id.required(),
  value: value.required(),
  stock: stock.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  category_id: category_id,
  value: value,
  stock: stock,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
