import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firbase';

const Login = () => {
    const [err, setError] = useState(false);

    const navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
    
        try {
          const res=await  signInWithEmailAndPassword(auth, email, password)
          navigate('/')
        } catch (error) {
          setError(true);
        //   console.log(error.message);
        }
      };
  return (
    <div className='formContainer'>
    <div className='formWrapper'>
        <span className="logo">Chat Application</span>
        <span className="title">Login</span>
        <form className='form' onSubmit={handleSubmit}>
            <input type='email' placeholder='Enter Email' required/>
            <input type='password' placeholder='Enter Password' required/>
            <button>Sign In</button>
            {err && <span>Something Went Wrong..</span>}
        </form>
        <p>You Don't Have Account..<Link to='/register'>SignUp</Link></p>

    </div>

</div>
  )
}

export default Login