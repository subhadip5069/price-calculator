const category =require("../model/category");


class CategoryController {
    // Create a new category
    async createCategory(req, res) {
        try {
            const { name } = req.body;
            const newCategory = new category({ name });
            await newCategory.save();
            res.redirect("/admin/cat")
        } catch (error) {
           res.redirect("/admin/cat")
        }
    }
   deleteCategory = async (req, res) => {
        try {
          await category.findByIdAndDelete(req.params.id);
          res.redirect("/admin/cat");
        } catch (err) {
          res.status(500).send("Error deleting category");
        }
      };
    // Get all categories
    async getAllCategories(req, res) {
        try {
            const categories = await category.find();
           res.render('admin/category',{
            title:"category",
            categories
           })
        } catch (error) {
           res.redirect("/admin/cat")
        }
    }
    // Get a category by ID
   
}

module.exports = new CategoryController();