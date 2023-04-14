import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from '../firebase/firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const auth = getAuth(app)

const ResetPassword = () => {
    const [userEmail,setUserEmail]=useState('');
    const [error,setError]=useState('')

    const handleEmail=(event)=>{
        const form=event.target;
        const email=form.value;
        setUserEmail(email)
      
    }
    const handleClick=()=>{
        setError('')
        if(!userEmail){
            setError('fill email')
            return;
        }
        sendPasswordResetEmail(auth,userEmail)
        .then(()=>{
            console.log('resend');
            toast.success('Email send')
           
        })
        .catch(error=>{
            console.error(error)
            setError('email not match')
        })
    }
   
    return (
        <div className='w-50 mx-auto shadow-lg p-3 mb-5 bg-body-tertiary rounded p-5'>
            <h2>Reset Password</h2>
           
           <Form.Group onBlur={handleEmail} className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" />
            </Form.Group>
            <p className='text-danger'>{error}</p>

            <Button onClick={handleClick} variant="primary" type="submit">
                Submit
            </Button>
            <ToastContainer />
        
        </div>
    );
};

export default ResetPassword;


