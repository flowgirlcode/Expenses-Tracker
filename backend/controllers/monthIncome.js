const Income= require("../models/IncomeModel");
const IncomeSchema = require("../models/IncomeModel")

exports.monthIncome = async (req, res) => {
    try {
        const incomes = await Income.aggregate([
            {
                $group: {
                    _id: { $month: "$date" },
                    incomes: { $push: "$$ROOT" }
                }
            }
        ]);
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//category


