import React, { useState } from "react";
import '../login/Login.scss'
import { Button, TextField } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import UserService from '../../services/UserService';

function Login() {
    const service = new UserService();
    const history = useHistory();

    const [inputField, setInputField] = useState({
        email: '',
        password: '',
        emailError: false,
        passError: false
    })

    const inputsHandler = (e) => {
        setInputField({
            // return { [e.target.name]: e.target.value }
            // console.log(e.target.value);
            ...inputField, [e.target.name]: e.target.value
        })
    }

    const validation = () => {
        let emailIdError = inputField.email === '' ? true : false;
        let passwordError = inputField.password === '' ? true : false;

        setInputField(() => {
            return { emailError: emailIdError, passError: passwordError }
        })

        return emailIdError || passwordError;
    }

    const next = () => {
        var validated = validation()
        if (!validated) {
            let data = {
                "email": inputField.email,
                "password": inputField.password
            }
            service.login(data)
                .then((res) => {
                    console.log(res);
                    let token = res.data.result.accessToken;
                    localStorage.setItem("token", token)

                    history.push('/home')
                }).catch((err) => {
                    console.log(err);
                })
        }
    }



    return (
        <div className="login">

            <TextField
                name="email"
                id="outlined-email"
                className="emailInput"
                type="text"
                label="Email Id"
                variant="outlined"
                // onChange={inputsHandler}
                onChange={(e) => inputsHandler(e)}
                // value={inputField.email}
                error={inputField.emailError}
            >

            </TextField><br></br>

            <TextField
                name="password"
                className="passInput"
                id="outlined-password"
                label="Password"
                type="password"
                variant="outlined"
                // onChange={inputsHandler}
                onChange={(e) => inputsHandler(e)}
                // value={inputField.password}
                error={inputField.passError}
            >

            </TextField>
            <br />
            <Button className="loginButton" style={{ backgroundColor: '#A03037' }} onClick={() => next()} > Login </Button>

            <p className="midBar">OR</p>

            <div className="twoButton">
                <Button className="fdButton" style={{ backgroundColor: "#4266B2" }} variant="contained" >Facebook</Button>
                <Button className="googleButton" variant="contained" >Google</Button>
            </div>
        </div>
    );
}
export default Login;