import React from "react";
import logo from '../../assests/logo.png'
import '../mainPage/MainPage.scss'
import Login from "../login/Login";
import Signup from "../signup/Signup";

export default function MainPage() {
    const [update, setUpdate] = React.useState(true)

    const register = () => {
        setUpdate(!update)
    }

    return (
        <div className='mainPageContainer' >
            <div className='midBackground' >
                <img className='mainLogo' src={logo} alt="this is logo" />
                <p className='logoname' >ONLINE BOOK SHOPPING</p>
                <div className='loginSignin' >
                    <span className='directLogin' onClick={register} >
                        LOGIN
                    </span>
                    <span className='directSignup' onClick={register} >
                        SIGNUP
                    </span>
                </div>
                <div className='loginSignupContainer' >
                    {update ? <Login /> : <Signup />}
                </div>
            </div>
        </div>
    )
}