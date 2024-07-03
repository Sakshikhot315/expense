import React from 'react'
import { Button, Input, Form, Col, Row, message } from 'antd';
import './Main.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
    const navigate = useNavigate()

    const onFinish = async(values)=>{
        try {
            const response = await axios.post('https://expensebackend-cevr.onrender.com/api/users/register',values)

            if(response.data.success){
                message.success('Registered Successfully')
                navigate('/')
            }else{
                message.error('User Already Exists')
            }
        } catch (error) {
            message.error('Registration Failed');
        }
    }
  return (
    <div className='auth'>
        <Row justify="center">
    <Col lg={8} xs={22}>
        <Form layout='vertical' onFinish={onFinish}>
            <h1><b>Expense Tracker</b></h1>
            <hr />
            <h2>Register</h2>
            <Form.Item
                name='name'
                label='Name'
                rules={[{ required: true, message: 'Please enter your name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='userid'
                label='User Id'
                rules={[{ required: true, message: 'Please enter your user ID' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='password'
                label='Password'
                rules={[{ required: true, message: 'Please enter your password' }]}
            >
                <Input type='password' />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit' className='primary'>
                    Register
                </Button>
            </Form.Item>
            <Link to='/' className='link'>Click Here To Login</Link>
        </Form>
    </Col>
</Row>
</div>
  )
}

export default Register