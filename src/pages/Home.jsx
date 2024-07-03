import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Button, Form, Modal, message, Input, Table, Select, DatePicker } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Main.css';
import { Link } from 'react-router-dom';

const { RangePicker } = DatePicker;

const Home = () => {
    const [transactionData, setTransactionData] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [type, setType] = useState('all');
    const [filteredData, setFilteredData] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);

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

    const createTransaction = (values) => {
        if (editData === null) {
            axios.post('https://expensebackend-cevr.onrender.com/api/transactions/create-transactions', values).then((res) => {
                message.success('Transaction Added Successfully');
                getTransaction();
                setAddModal(false);
            }).catch((error) => {
                console.log(error);
                message.error('Something Went Wrong');
            });
        } else {
            axios.put(`https://expensebackend-cevr.onrender.com/api/transactions/edit-transactions/${editData._id}`, values).then((res) => {
                message.success('Transaction Edited Successfully');
                getTransaction();
                setEditData(null);
                setAddModal(false);
            }).catch((error) => {
                console.log(error);
                message.error('Something Went Wrong');
            });
        }
    };

    const deleteTransaction = (record) => {
        axios.delete(`https://expensebackend-cevr.onrender.com/api/transactions/delete-transactions/${record._id}`).then((res) => {
            message.success('Transaction Deleted Successfully');
            getTransaction();
        }).catch((error) => {
            console.log(error);
            message.error('Something Went Wrong');
        });
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Action',
            dataIndex: '_id',
            render: (id, record) => (
                <div className='d-flex'>
                    <DeleteOutlined className='mx-2' onClick={() => deleteTransaction(record)} />
                    <EditOutlined className='mx-2' onClick={() => {
                        setEditData(record);
                        setAddModal(true);
                    }} />
                </div>
            ),
        },
    ];

    const filterData = () => {
        let filtered = transactionData;

        if (type !== 'all') {
            filtered = filtered.filter(transaction => transaction.type === type);
        }

        if (searchKey) {
            filtered = filtered.filter(transaction =>
                transaction.category.toLowerCase().includes(searchKey.toLowerCase())
            );
        }

        if (dateRange[0] && dateRange[1]) {
            filtered = filtered.filter(transaction => {
                const transactionDate = new Date(transaction.date);
                const startDate = new Date(dateRange[0]);
                const endDate = new Date(dateRange[1]);
                return transactionDate >= startDate && transactionDate <= endDate;
            });
        }

        setFilteredData(filtered);
    };

    useEffect(() => {
        filterData();
    }, [searchKey, type, dateRange, transactionData]);

  

    return (
        <>
            <Navbar />

            <div className="d-flex mt-4 main">
                <div className="container">
                    <input type="text" placeholder='Search Here' value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        className='search' />
                </div>
                <div className="select">
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="all">All</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                <div className="date-picker">
                    <RangePicker className='date'
                        onChange={(dates) => setDateRange(dates ? [dates[0], dates[1]] : [null, null])}
                    />
                </div>
                <div className="control d-flex">
              <Link to={'/chart'}> <Button className='mx-2' type='primary'>
                        Charts
                    </Button></Link> 
                    <Button  className='mx-2' type='primary' onClick={() => setAddModal(true)}>
                        Add Transaction
                    </Button>
                </div>
            </div>

            <div className='table-container'>
                <Table columns={columns} dataSource={filteredData} bordered></Table>
            </div>

           

            {addModal && (
                <Modal title={'EXPENSE TRACKER'} open={addModal} footer={null} onCancel={() => {
                    setAddModal(false);
                    setEditData(null);
                }}>
                    <Form initialValues={editData} layout='vertical' onFinish={createTransaction}>
                        <Form.Item name='amount' label='Amount'>
                            <Input />
                        </Form.Item>
                        <Form.Item name='type' label='Type'>
                            <Select>
                                <Select.Option value='Income'>Income</Select.Option>
                                <Select.Option value='Expense'>Expense</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name='category' label='Category'>
                            <Select>
                                <Select.Option value='Salary'>Salary</Select.Option>
                                <Select.Option value='Freelance'>Freelance</Select.Option>
                                <Select.Option value='Investment'>Investment</Select.Option>
                                <Select.Option value='Education'>Education</Select.Option>
                                <Select.Option value='Travel'>Travel</Select.Option>
                                <Select.Option value='Entertainment'>Entertainment</Select.Option>
                                <Select.Option value='Food'>Food</Select.Option>
                                <Select.Option value='Medicine'>Medicine</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name='date' label='Date'>
                            <Input type='date' />
                        </Form.Item>
                        <Form.Item name='description' label='Description'>
                            <Input.TextArea rows={2} />
                        </Form.Item>
                        <div className='d-flex justify-content-end'>
                            <Button htmlType='submit' type='primary'>
                                {editData ? 'Edit' : 'Add'}
                            </Button>
                        </div>
                    </Form>
                </Modal>
            )}
        </>
    );
};

export default Home;
