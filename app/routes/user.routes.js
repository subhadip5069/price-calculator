const express =require('express')
const router = express.Router();

const CalculatorOption = require('../model/calculator')

const calculator = require("../controller/user.calculator")

router.get('/',calculator.renderCreateForm)
router.get("/api/subcategories/:categoryId", async (req, res) => {
    try {
      const { categoryId } = req.params;
  
      const options = await CalculatorOption.find({ category: categoryId });
  
      // Extract unique subcategories
      const uniqueSubcategories = [...new Set(options.map(opt => opt.subCategory))];
  
      res.json(uniqueSubcategories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // 🔹 Get fields based on category and subcategory
  router.get("/api/calculator-options/:categoryId/:subCategory", async (req, res) => {
    try {
      const { categoryId, subCategory } = req.params;
  
      const option = await CalculatorOption.findOne({ category: categoryId, subCategory });
  
      if (!option) return res.status(404).json({ message: "No options found" });
  
      res.json(option.fields);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
module.exports =router