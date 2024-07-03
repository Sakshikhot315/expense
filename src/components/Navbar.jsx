import React from 'react'
import './Navbar.css';
import {  message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="/home">Expense Tracker</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          
            <div class="navbar-nav">

            <a onClick={() => {
                localStorage.removeItem('userdata')
                message.success('Logged out successfully');
                navigate('/')
              }} class="nav-link">Logout</a>

            </div>
          </div>
        </div>
      </nav>



    </>
  )
}

export default Navbar