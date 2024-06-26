import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { errorToast, successToast } from '../Toast/index'
import { loginUser } from '../../Services/api'
import Loader from '../Loader/Loader'


const SignIn = () => {

  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const handleChange = (e) => {
    setData({...data,[e.target.name]: e.target.value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    console.log('load1',loading);
    try {
        const response = await loginUser(data);
        // console.log('user logged in: ',response);
        if (response.success) {
          successToast(`Welcome ${response.user.fname}`)
          localStorage.setItem('userId', response.user._id)
          localStorage.setItem('token', response.token)
          // setLoading(false);
          navigate('/')
        }   
      } catch (err) {
        // console.log(err);
        errorToast(err && err.response && err.response.data.message)
      } finally {
        setLoading(false);
        console.log('load2',loading);
    }
  }

  useEffect(() => {
    try{
      if (token) {
        navigate('/')
      }
    } catch (err) {
      console.log(err);
    }
  })

  return (
    <div>
      
      {loading &&  <Loader /> }
      
      <div className={`signup w-4/5 sm:w-3/5 md:w-3/6 lg:w-1/3 m-auto text-center text-white mt-20 p-3 sm:p-10 ${loading ? 'opacity-25' : ''} `}>
        <h1 className='text-4xl mb-16'>Sign In</h1>
        <form className='text-center' onSubmit={handleSubmit}>
          <input className='w-4/5' type="text" name='username' placeholder='Enter your username...' onChange={handleChange}/><br />
          <input className='w-4/5' type="password" name='password' placeholder='Enter your password...' onChange={handleChange}/><br />
          <input className='signup1-btn w-3/6 sm:w-2/6 mt-5 mb-10' type="submit" value="Sign In" />
        </form>
        <p>Don't have an account?  
          <Link to='/signup'><span className='ms-1 cursor-pointer'>Sign Up</span></Link>
        </p>
      </div>

       

    </div>
  )
}


export default SignIn