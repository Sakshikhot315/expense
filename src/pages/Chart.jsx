import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import axios from 'axios';
import './Main.css';
const Chart = () => {

    const [transactionData, setTransactionData] = useState([]);

    const getTransaction = () => {
        axios.get('https://expensebackend-cevr.onrender.com/api/transactions/get-transactions').then((res) => {
            setTransactionData(res.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getTransaction();
    }, []);

    const barChartData = transactionData.reduce((acc, transaction) => {
        const categoryIndex = acc.findIndex(item => item.category === transaction.category);
        if (categoryIndex > -1) {
            if (transaction.type === 'Income') {
                acc[categoryIndex].income += transaction.amount;
            } else if (transaction.type === 'Expense') {
                acc[categoryIndex].expense += transaction.amount;
            }
        } else {
            acc.push({
                category: transaction.category,
                income: transaction.type === 'Income' ? transaction.amount : 0,
                expense: transaction.type === 'Expense' ? transaction.amount : 0
            });
        }
        return acc;
    }, []);

    // Prepare data for the pie chart
    const pieChartData = transactionData.reduce((acc, transaction) => {
        const typeIndex = acc.findIndex(item => item.type === transaction.type);
        if (typeIndex > -1) {
            acc[typeIndex].value += transaction.amount;
        } else {
            acc.push({
                type: transaction.type,
                value: transaction.amount
            });
        }
        return acc;
    }, []);

    const colors = ['#82ca9d', '#8884d8'];

  return (
   <>
   <Navbar/>
    <div className='chart-container d-flex' style={{marginTop:'10%'}}>
                <div style={{ flex: '1 1 50%' }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={barChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="income" fill="#82ca9d" />
                            <Bar dataKey="expense" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ flex: '1 1 50%' }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} label>
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                </div>
   </>
  )
}

export default Chart