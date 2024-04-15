const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3).max(80);
const description = Joi.string().min(3).max(400);

const createCategorySchema = Joi.object({
  name: name.required(),
  description: description.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
  description: description,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};
