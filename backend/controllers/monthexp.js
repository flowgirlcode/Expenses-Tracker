const Expense = require("../models/ExpenseModel");
const ExpenseSchema = require("../models/ExpenseModel")

exports.monthExpense = async (req, res) => {
    try {
        const expenses = await Expense.aggregate([
            {
                $group: {
                    _id: { $month: "$date" 
                  
                },
                    expenses: { $push: "$$ROOT" }
                }
            }
        ]);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//category
exports.expCategory = async (req, res) =>{
    try {
        const category = await ExpenseSchema.find({"category": "clothing"})
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
};
