const CalculatorOption = require('../model/calculator');
const Category = require('../model/category');

class Calculator {
  // Render the form
  renderCreateForm = async (req, res) => {
    try {
      const categories = await Category.find();
      const options = await CalculatorOption.find();
      const uniqueSubCategories = [...new Set(options.map(o => o.subCategory))];
      
      res.render('admin/index', { categories, uniqueSubCategories });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error loading form');
    }
  };
  getFieldsByCategoryAndSubcategory = async (req, res) => {
    const { categoryId, subCategory } = req.query;
  
    try {
      const result = await CalculatorOption.findOne({ category: categoryId, subCategory });
      
      if (!result) return res.status(404).json({ message: 'No data found' });
  
      res.status(200).json(result.fields);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching fields' });
    }
  };
  
  
//   createCalculatorOption = async (req, res) => {
//     try {
//       const { category, subCategory, keys, names, prices } = req.body;
  
//       console.log('Received keys:', keys);
//       console.log('Received names:', names);
//       console.log('Received prices:', prices);
  
//       // Ensure keys is an array
//       const parsedKeys = Array.isArray(keys) ? keys : [keys];
//       const parsedNames = Array.isArray(names[0]) ? names : [names];
//       const parsedPrices = Array.isArray(prices[0]) ? prices : [prices];
  
//       const fields = [];
  
//       for (let i = 0; i < parsedKeys.length; i++) {
//         const key = parsedKeys[i];
  
//         if (!key || typeof key !== 'string' || key.trim() === '') {
//           console.log('Key is empty, skipping...');
//           continue;
//         }
  
//         const values = [];
//         for (let j = 0; j < parsedNames[i].length; j++) {
//           const name = parsedNames[i][j];
//           const price = parseFloat(parsedPrices[i][j]);
  
//           if (name && !isNaN(price)) {
//             values.push({ name, price });
//           }
//         }
  
//         fields.push({
//           key: key.trim(),
//           values
//         });
//       }
  
//       const calculatorOption = new CalculatorOption({
//         category,
//         subCategory,
//         fields
//       });
  
//       const saved = await calculatorOption.save();
//       console.log('Saved calculator option:', saved);
//       res.redirect('/admin/calculator-options'); // Adjust redirection as needed
//     } catch (error) {
//       console.error('Error creating calculator option:', error);
//       res.status(500).send('Internal server error');
//     }
//   };


createCalculatorOption = async (req, res) => {
    try {
      const options = Array.isArray(req.body.options) ? req.body.options : [req.body];
  
      const docsToInsert = options.map(opt => {
        const parsedFields = opt.fields.map(field => ({
          key: field.key,
          values: field.values.map(v => ({
            name: v.name,
            price: parseFloat(v.price)
          }))
        }));
  
        return {
          category: opt.category,
          subCategory: opt.subCategory,
          fields: parsedFields
        };
      });
  
      await CalculatorOption.insertMany(docsToInsert);
      res.redirect('/admin/calculator');
    } catch (err) {
      console.error(err);
      res.status(400).send("Error creating calculator options.");
    }
  };
  
}
module.exports = new Calculator();
