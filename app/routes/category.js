const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');

router.get('/', categoryController.getAllCategories);
router.post('/categories', categoryController.createCategory);
router.get("/categories/delete/:id", categoryController.deleteCategory);

module.exports = router;
