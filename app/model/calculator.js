const mongoose = require("mongoose");

const calculatorOptionSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  fields: [
    {
      key: {
        type: String,
        required: true,
      },
      values: [
        {
          name: { type: String },
          price: { type: Number }
        }
      ]
    }
  ]
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("CalculatorOption", calculatorOptionSchema);
