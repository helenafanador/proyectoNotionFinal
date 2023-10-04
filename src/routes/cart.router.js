const { getAll, create, getOne, remove, update } = require('../controllers/cart.controllers');
const verifyJWT = require('../utils/verifyJWT');
const express = require('express');

const cartRouter = express.Router();

cartRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

cartRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = cartRouter;