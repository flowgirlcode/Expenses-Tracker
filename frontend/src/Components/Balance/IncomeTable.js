import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import moment from 'moment'
const IncomeTable = () => {
    const [incomes, setIncomes] = useState()


    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/query-incomes')
            .then(reponse => {
                setIncomes(reponse.data)
            })
            .catch(err => { console.log(err) });



    }, [])

    const dateFormat = (date) =>{
        return moment(date).format('DD-MM-YYYY')
    }
    return (
        <TableStyled >
            <div className='scroll'>

                <table className='table  ' >
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
                        {Array.isArray(incomes) && incomes.map(income => (
                            <tr key={income._id}>
                                <td>{income.title}</td>
                                <td>{income.amount}</td>
                                <td>{dateFormat(income.date)}</td>
                                <td>{income.type}</td>
                                <td>{income.category}</td>
                                <td>{income.description}</td>
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
 
  width: 95%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 20px;
  overflow-y: scroll;
  max-height: 500px;
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


export default IncomeTable