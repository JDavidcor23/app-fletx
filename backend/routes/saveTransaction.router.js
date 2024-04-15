const express = require('express');
const TransactionService = require('../services/transaction.service');

const router = express.Router();
const service = new TransactionService();

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const resp = await service.create(body);
    res.status(201).json(resp);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json('Data deleted');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
