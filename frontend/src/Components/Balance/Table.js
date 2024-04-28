import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

  const Table = () => {
  const [transactionsByMonth, setTransactionsByMonth] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const [expensesResponse, incomesResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/v1/month-expense'),
        axios.get('http://localhost:5000/api/v1/month-incomes')
      ]);
      setTransactionsByMonth({
        expenses: expensesResponse.data,
        incomes: incomesResponse.data
      });
    } catch (error) {
      console.error('Error fetching transactions by month:', error);
    }
  };

  const handleMonthButtonClick = (month) => {
    setSelectedMonth(month);
  };

  const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
  };

  const calculateTotalExpense = (expenses) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateTotalIncome = (incomes) => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };
  const totalExpense = calculateTotalExpense(
    transactionsByMonth.expenses?.find(month => month._id === selectedMonth)?.expenses || []
);
const totalIncome = calculateTotalIncome(
    transactionsByMonth.incomes?.find(month => month._id === selectedMonth)?.incomes || []
);
  // Combine transactions with the same category
  const TransactionsByCategory = (transactions) => {
    const Transactions = {};
    transactions.forEach(transaction => {
      if (!Transactions[transaction.category]) {
        Transactions[transaction.category] = {
          category: transaction.category,
          amount: 0
        };
      }
    Transactions[transaction.category].amount += transaction.amount;
    });
    return Object.values(Transactions);
  };

  return (
    <MonthStyled>
      <div>
        {Array.from({ length: 12 }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleMonthButtonClick(index + 1)}
            style={{ marginRight: '10px' }}
          >
            {getMonthName(index + 1)}
          </button>
        ))}
      </div>
      {selectedMonth && (
        <div>
          <h2>{` ${getMonthName(selectedMonth)}`}</h2>
          
          <div className="transactions">
            <div className="expenses">
              <h3>Expenses</h3>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsByMonth.expenses && transactionsByMonth.expenses
                    .filter(month => month._id === selectedMonth)
                    .map(month => (
                      month.expenses.map(expense => (
                        <tr key={expense._id}>
                          <td>{expense.category}</td>
                          <td>₹{expense.amount.toFixed(2)}</td>
                        </tr>
                      ))
                    ))}
                </tbody>
              </table>
              <p>Total Expense: ₹{totalExpense}</p>
            </div>
            <div className="incomes">
              <h3>Incomes</h3>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsByMonth.incomes && transactionsByMonth.incomes
                    .filter(month => month._id === selectedMonth)
                    .map(month => (
                      TransactionsByCategory(month.incomes).map(income => (
                        <tr key={income.category}>
                          <td>{income.category}</td>
                          <td>₹{income.amount.toFixed(2)}</td>
                        </tr>
                      ))
                    ))}
                </tbody>
              </table>
              <p>Total Income: ₹{totalIncome}</p>
            </div>
          </div>
        </div>
      )}
    </MonthStyled>
  );
};
const MonthStyled = styled.div`
  margin: 20px;
  padding: 20px;

  * {
    margin: 0;
    padding: 0px;
    box-sizing: border-box;
  }

  table {
  
  width: 95%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 20px;
}
 

th {
  background-color: #ddd;
  text-align: left;
  padding: 8px;
  color: #222260;

}


td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
}

  button {
    margin: 10px;
    display: inline-block;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #ddd;
    color: black;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  button:hover {
    transform: translateY(-2px);
    background-color: lightgreen;
  }


  h2, h3, ul {
    margin: 10px;
  }

  .transactions {
    display: flex;
    gap: 20px;
    overflow: auto;
  }

  .expenses, .incomes {
    flex: 1;
  }

  .expenses {
    border-right: 1px solid #ccc;
  }
`;
export default Table;