import React, { useState } from "react";
import '../signup/Signup.scss'
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import UserService from "../../services/UserService";

function Signup() {
    const service = new UserService();
    const history = useHistory();

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
        setInputField({ ...inputField, [e.target.name]: e.target.value })
    }

    const validation = () => {
        const nameError = inputField.fullName === '' ? true : false;
        const mailError = inputField.email === '' ? true : false;
        const passError = inputField.password === '' ? true : false;
        const numError = inputField.number === '' ? true : false;

        setInputField(() => {
            return { fullNameError: nameError, emailError: mailError, passwordError: passError, numberError: numError }
        })

        return nameError || mailError || passError || numError
    }

    const next = () => {
        let validated = validation();
        if (!validated) {

            let data = {
                "fullName": inputField.fullName,
                "email": inputField.email,
                "password": inputField.password,
                "phone": inputField.number
            }
            service.register(data)
                .then((res) => {
                    console.log(res);

                    history.push('/login')
                }).catch((err) => {
                    console.log(err);
                })
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
                name="fullName"
                onChange={(e) => { changeHandle(e) }}
                error={inputField.fullNameError}
            >

            </TextField>

            <TextField
                className='emailInput'
                id='outlined-required'
                type="email"
                name="email"
                label="EmaiId"
                variant='outlined'
                onChange={(e) => { changeHandle(e) }}
                error={inputField.emailError}
            >

            </TextField>

            <TextField
                className='passwordSignup'
                id='outlined-password'
                type="password"
                label="Password"
                name="password"
                variant='outlined'
                onChange={(e) => { changeHandle(e) }}
                error={inputField.passwordError}
            >

            </TextField>

            <TextField
                className='numSignup'
                id='outlined-required'
                label="MobileNumber"
                type="number"
                name="number"
                variant='outlined'
                onChange={(e) => { changeHandle(e) }}
                error={inputField.numberError}
            >

            </TextField>

            <Button className='signupButton' style={{ backgroundColor: '#A03037' }} onClick={() => next()} > SignUp </Button>
        </div>
    </div>;
}

export default Signup;