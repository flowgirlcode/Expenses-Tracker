import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import moment from 'moment'
const ExpenseTable = () => {
    const [expenses, setExpenses] = useState()


    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/query-expense')
            .then(reponse => {
                setExpenses(reponse.data)
            })
            .catch(err => {console.log(err)});

           

    }, [])
   


 const dateFormat = (date) =>{
    return moment(date).format('DD-MM-YYYY')
}
    
    return (
        <TableStyled className='container'>
            <div className='scroll'>
            <table className='table  table-hover  table-condensed p-3'>
                <thead>
                    <tr>
                        <th>
                            title
                        </th>
                        <th>
                            amount
                        </th>
                        <th>
                            date
                        </th>
                        <th>
                            type
                        </th>
                        <th>
                            category
                        </th>
                        <th>
                            description
                        </th>

                    </tr>
                </thead>
                <tbody>
                {Array.isArray(expenses) && expenses.map(expense => (
                        <tr key={expense._id}>
                            <td>{expense.title}</td>
                            <td>{expense.amount}</td>
                            <td>{dateFormat(expense.date)}</td>
                            <td>{expense.type}</td>
                            <td>{expense.category}</td>
                            <td>{expense.description}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            </div>
        </TableStyled>
    )
}

const TableStyled=styled.div` 
.scroll{
    overflow-x: hidden;
    overflow-y: scroll;
    max-height: 700px;
}
table {
    overflow: auto;
 width: max-content;
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

`


export default ExpenseTable