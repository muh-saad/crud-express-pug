const Router = require('express').Router;

const productRouter = require('./product/router');

const router = new Router();

router.use('/product', productRouter);

module.exports = router;