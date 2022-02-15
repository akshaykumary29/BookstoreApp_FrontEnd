import React, { useState } from "react";
import '../signup/Signup.scss'
import { Button, TextField } from "@material-ui/core";

function Signup() {
    const [inputField, setInputField] = useState({
        fullName: '',
        email: '',
        password: '',
        number: '',
        fullNameError: '',
        emailError: '',
        passwordError: '',
        numberError: ''
    })


    const changeHandle = (e) => {
        setInputField({ ... inputField, [e.target.name]: e.target.value })
        console.log(e.target.value);
    }

    const validation = () => {
        // let isError = false;
        const nameError = inputField.fullName === '' ? true : false;
        const mailError = inputField.email === '' ? true : false;
        const passError = inputField.password === '' ? true : false;
        const numError = inputField.number === '' ? true : false;

        setInputField(() => {
            return { fullNameError: nameError, emailError: mailError, passwordError: passError, numberError: numError}
        })

        return nameError || mailError || passError || numError
    }

    const next=() => {
        let validated = validation();
        if (!validated) {
            console.log("validated");
        }
    }

    return <div>
        <div className='signup' >
            <TextField
                className='fullName'
                id='outlined-required'
                type="text"
                label="Full Name"
                variant='outlined'
                onChange={(e) => {changeHandle(e)}}
                // value={inputField.fullName}
                error={inputField.fullNameError}
                // helpertext={error.fullNameError ? "fullname is required" : " "} 
                >

            </TextField>

            <TextField
                className='emailInput'
                id='outlined-required'
                type="email"
                name="email"
                label="EmaiId"
                variant='outlined'
                onChange={(e) => {changeHandle(e)}}
                // value={inputField.email}
                error={inputField.emailError}
                // helpertext={error.emailError ? "email required" : " "} 
                >

            </TextField>

            <TextField
                className='passwordSignup'
                id='outlined-password'
                type="password"
                label="Password"
                variant='outlined'
                onChange={(e) => {changeHandle(e)}}
                // value={inputField.password}
                error={inputField.passwordError}
                // helpertext={error.passwordError ? "password required" : " "} 
                >

            </TextField>

            <TextField
                className='numSignup'
                id='outlined-required'
                label="MobileNumber"
                type="number"
                variant='outlined'
                onChange={(e) => {changeHandle(e)}}
                // value={inputField.number}
                error={inputField.numberError}
                // helpertext={error.numberError ? "phonenumber required" : " "} 
                >

            </TextField>

            <Button className='signupButton' style={{ backgroundColor: '#A03037' }} onClick={() => next()} > SignUp </Button>
        </div>
    </div>;
}


export default Signup;