import React from 'react'
import { Button, Input, Form, Col, Row, message } from 'antd';
import './Main.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const navigate = useNavigate()

    const onFinish = async(values)=>{
        try {
            const response = await axios.post('https://expensebackend-cevr.onrender.com/api/users/login', values)

            if(response.data.success){
                localStorage.setItem('userdata',JSON.stringify(response.data))
                message.success('Login Successfuliy');
                navigate('/home');
            }else{
                message.error('Invalid User ID or Password')
            }

        } catch (error) {
            message.error('Login Failed')
        }
    }
    return (
        <div className='auth'>
            <Row justify="center">
                <Col lg={8} xs={22}>
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1><b>Expense Tracker</b></h1>
                        <hr />
                        <h2>Login</h2>

                        <Form.Item
                            name='userid'
                            label='User ID'
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
                                Login
                            </Button>
                        </Form.Item>
                        <Link to='/register' className='link'>Click Here To Register</Link>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login