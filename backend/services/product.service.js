const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class ProductsService {
  constructor() {
    this.products = []; // Esta línea puede no ser necesaria si no mantienes un estado en memoria
  }

  async create(data) {
    const { image, name, stock, price, value, category_id, creation_date } =
      data;
    const query = `INSERT INTO products (image, name, stock, price, value, category_id, creation_date) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id`;
    const [result] = await sequelize.query(query, {
      replacements: [
        image,
        name,
        stock,
        price,
        value,
        category_id,
        creation_date,
      ],
    });
    return { id: result[0].id, ...data };
  }

  async find() {
    const query = 'SELECT * FROM products';
    const [data] = await sequelize.query(query);
    return data;
  }
  async findOne(id) {
    const query = 'SELECT * FROM products WHERE id = :id';
    const [product] = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT,
    });
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is blocked');
    }
    return product;
  }

  async update(id, changes) {
    const fields = Object.keys(changes)
      .map((key) => `${key} = :${key}`)
      .join(', ');
    const query = `UPDATE products SET ${fields} WHERE id = :id`;
    await sequelize.query(query, {
      replacements: { ...changes, id },
    });
    return this.findOne(id);
  }

  async delete(id) {
    const query = 'DELETE FROM products WHERE id = :id';
    await sequelize.query(query, {
      replacements: { id },
    });
    return { id };
  }
}

module.exports = ProductsService;
