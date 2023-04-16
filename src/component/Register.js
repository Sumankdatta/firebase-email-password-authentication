import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updatePhoneNumber, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const auth = getAuth(app)

const Register = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isDisable,setIsDisable]=useState(true);
    const [toggle,setToggle]=useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        setSuccess(false)
        setError('')

        const form = event.target;
        const name = form.name.value;
        const url = form.url.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, url, email, password)

        if(!email){
            alert('fill out email')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset()
                updateUserProfile(name, url)
                emailVerification()
                setSuccess(true)
                toast.success('User create successfully')
            })
            .catch(error => {
                console.error(error)
                setError('Email already in use')
            })
    }

    const updateUserProfile = (name, url) => {
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: url
        })
            .then(() => {
                console.log('user profile updated')
            })
            .catch(error => {
                console.error(error)
            })
    }

    const emailVerification = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                toast('email verification email send check your email ')
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className='w-50 p-5 mx-auto shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter your Name" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Photo url</Form.Label>
                    <Form.Control type="url" name='url' placeholder="Enter your url" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                    <Form.Label>Password </Form.Label>
                    <Form.Control 
                    type={toggle?'text':'password'}
                    name='password' 
                    placeholder="Password "  
                    required/>
               
             <FontAwesomeIcon className='position-absolute top-50 start-50 ms-5 z-3' onClick={()=>setToggle(!toggle)} icon={toggle?faEye:faEyeSlash}></FontAwesomeIcon>


                </Form.Group>
                {success && <p className='text-success'>User create successfully</p>}
                <p className='text-danger'>{error}</p>

                <Form.Group onClick={()=>setIsDisable(!isDisable)} className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button disabled={isDisable} variant="primary" type="submit">
                    Submit
                </Button>
                <ToastContainer />
            </Form>
            <p>Have an account please  <Link to='/login'>Login</Link></p>

        </div>
    );
};

export default Register;
