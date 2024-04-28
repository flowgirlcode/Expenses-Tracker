const Expense = require("../models/ExpenseModel");

exports.monthExpense = async (req, res) => {
    try {
        const expenses = await Expense.aggregate([
            {
                $group: {
                    _id: { $year: "$date" 
                  
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

