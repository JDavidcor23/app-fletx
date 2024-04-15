const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class CategoriesService {
  constructor() {
    this.categories = []; // Esta línea puede no ser necesaria si no mantienes un estado en memoria
  }

  async create(data) {
    const { name, description } = data;
    const query = `INSERT INTO categories (name, description) VALUES (?, ?) RETURNING id`;
    const [result] = await sequelize.query(query, {
      replacements: [name, description],
    });
    return { id: result[0].id, ...data };
  }

  async find() {
    const query = 'SELECT * FROM categories';
    const [data] = await sequelize.query(query);
    return data;
  }
  async findOne(id) {
    const query = 'SELECT * FROM categories WHERE id = :id';
    const [categories] = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT,
    });
    if (!categories) {
      throw boom.notFound('categories not found');
    }
    if (categories.isBlock) {
      throw boom.conflict('categories is blocked');
    }
    return categories;
  }

  async update(id, changes) {
    const fields = Object.keys(changes)
      .map((key) => `${key} = :${key}`)
      .join(', ');
    const query = `UPDATE categories SET ${fields} WHERE id = :id`;
    await sequelize.query(query, {
      replacements: { ...changes, id },
    });
    return this.findOne(id);
  }

  async delete(id) {
    const query = 'DELETE FROM categories WHERE id = :id';
    await sequelize.query(query, {
      replacements: { id },
    });
    return { id };
  }
}

module.exports = CategoriesService;
