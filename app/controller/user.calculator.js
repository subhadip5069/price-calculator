const category = require("../model/category");
const CalculatorOption = require("../model/calculator")


class usercalculato{
      renderCreateForm = async (req, res) => {
        try {
          const categories = await category.find();
          const options = await CalculatorOption.find();
          const uniqueSubCategories = [...new Set(options.map(o => o.subCategory))];
          
          res.render('user/index', { categories, uniqueSubCategories });
        } catch (err) {
          console.error(err);
          res.status(500).send('Error loading form');
        }
      };
}
module.exports= new usercalculato()