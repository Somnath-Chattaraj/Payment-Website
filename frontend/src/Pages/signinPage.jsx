import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../footer';

export default function SigninPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('https://api-payment-website.somnathcodes.site/api/v1/user/signin', {
        username,
        password,
      });
      alert('Login Successful!');
      localStorage.setItem("token", response.data.token )
      window.location.replace("/dashboard");
    } catch (err) {
      alert('Login Failed!');
      console.error('Error logging in:', err);
    }
  };

  return (
    <>
    <div>
      <div className='flex justify-center items-center absolute inset-0 bg-gray-500'>
        <div className='flex flex-col justify-center bg-white shadow-300 h-50 w-80 shadow-white-300 rounded-lg'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold text-3xl pt-4'>Sign In</h1>
            <p className='text-gray-500 px-4 pt-2'>
              Enter your information to create an
            </p>
            <p className='text-gray-500 px-4 pb-2'>account</p>
          </div>
          <form action='' onSubmit={loginUser}>
            <div className='flex flex-col'>
              <h4 className='pl-4 pb-2'>Email</h4>
              <input
                type='email'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='jhondoe@gmail.com'
                className='border-2 border-gray-300 rounded-lg h-10 border-1 mx-4 bg-transparent pl-4 mb-4'
              />
            </div>
            <div className='flex flex-col'>
              <h4 className='pl-4 pb-2'>Password(minimum of 6 characters)</h4>
              <input
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=''
                className='border-2 border-gray-300 rounded-lg h-10 border-1 mx-4 bg-transparent pl-4 mb-6'
              />
              <button className='bg-black text-white h-10 rounded-lg mx-4 mb-4'>
                Sign In
              </button>
              <p className='text-black flex justify-center pb-4'>
                Don't have an account?{' '}
                <Link className='underline text-bn pl-1' to={'/signup'}>
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}




