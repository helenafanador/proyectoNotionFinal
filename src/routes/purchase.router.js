const { getAll, create } = require('../controllers/purchase.controllers');
const verifyJWT = require('../utils/verifyJWT');
const express = require('express');

const purchaseRouter = express.Router();

purchaseRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);


module.exports = purchaseRouter;