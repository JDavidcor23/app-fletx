const sequelize = require('../libs/sequelize');

class TransactionService {
  constructor() {}

  async create(data) {
    data.forEach(async (element) => {
      const {
        name,
        price,
        image,
        category_id,
        value,
        stock,
        idProduct,
        creation_date,
        numberOfProducts,
      } = element;
      const query = `INSERT INTO saveTransaction (name, price, image, category_id, value, stock, idProduct, creation_date, numberOfProducts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`;
      await sequelize.query(query, {
        replacements: [
          name,
          price,
          image,
          category_id,
          value,
          stock,
          idProduct,
          creation_date,
          numberOfProducts,
        ],
      });
    });
    return { message: 'Transaction created' };
  }

  async delete(id) {
    const query = `DELETE FROM saveTransaction WHERE id = ${id}`;
    await sequelize.query(query, { replacements: [id] });
  }
  async find() {
    const query = 'SELECT * FROM saveTransaction';
    const [data] = await sequelize.query(query);
    return data;
  }
}

module.exports = TransactionService;
