import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.init';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const auth=getAuth(app)

const Login = () => {
    const [error,setError]=useState('');
    const [user,setUser]=useState({})
    
    const handleSubmit =(event)=>{
        event.preventDefault()
        setError('')

        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password);

        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const user=result.user;
            setUser(user)
            console.log(user)
            toast.success('Login successfully')
        })
        .catch(error=>{
            console.error(error)
            setError(error.message)
           
        })
    }
   
    return (
        <div className='w-50 mx-auto shadow-lg p-3 mb-5 bg-body-tertiary rounded p-5'>
        <h2>Login</h2>
        <h3>{user.displayName}</h3>
        <img src={user.photoURL} alt="" />
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" />
                </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <p className='text-danger'>{error}</p>
            <ToastContainer/>
        </Form>
        <p>New to this website please  <Link  to='/'>Register</Link></p>
        <p>Forget password? please <Link  to='/reset'>Reset password</Link></p>
    </div>
    );
};

export default Login;

