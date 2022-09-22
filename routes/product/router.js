const {check, validationResult} = require("express-validator");
const Router = require('express').Router;
const {getProduct, addProduct, updateProduct, deleteProduct} = require('./handler');
const router = new Router();

// Route to get product
router.get('/', async (req, res) => {
  try {
    let products = await getProduct();

    res.render('product/index', {title: 'Product List', products});
  } catch (e) {
    res.send('Sorry! Something went wrong.');
  }
});

// Route to save product
router.post('/save', [
  check('productName')
    .isAlphanumeric()
    .isLength({min: 3})
    .not().isEmpty().trim().escape(),
  check('productPrice')
    .isFloat({gt: 0})
    .isLength({min: 1})
    .not().isEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      await addProduct(req);
      req.flash('success', 'Product added successfully')
    } else {
      errors.array().forEach((error) => {
        req.flash('error', `${error.msg} in ${error.param}: ${error.value}`)
      })
    }
  } catch (e) {
    req.flash('error', e.message);
  }

  res.redirect('/product')
});

// Route to update product
router.post('/update', [
  check('productName')
    .isAlphanumeric()
    .isLength({min: 3})
    .not().isEmpty().trim().escape(),
  check('productPrice')
    .isFloat({gt: 0})
    .isLength({min: 1})
    .not().isEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      await updateProduct(req);
      req.flash('success', 'Product updated successfully')
    } else {
      errors.array().forEach((error) => {
        req.flash('error', `${error.msg} in ${error.param}: ${error.value}`)
      })
    }
  } catch (e) {
    req.flash('error', e.message);
  }

  res.redirect('/product')
});

// Route to delete product
router.post('/delete', async (req, res) => {
  try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      await deleteProduct(req);
      req.flash('success', 'Product deleted successfully')
    } else {
      errors.array().forEach((error) => {
        req.flash('error', error.msg)
      })
    }
  } catch (e) {
    req.flash('error', e.message);
  }

  res.redirect('/product')
});

module.exports = router;