import React from "react";
import '../checkout/CheckoutOrder.scss'
import { useHistory } from "react-router-dom";
import background from '../../assests/background.png'
import background2 from '../../assests/background2.png'
import Header from "../header/Header";
import Footer from "../footer/Footer";

function CheckoutOrder() {
    const history = useHistory()

    const navDashboard = () => {
        history.push('/home')
    }

    return (
        <>
            <Header />
            <div className='checkout-container'>
                <div className='image'>
                    <img src={background} alt="Add image" />
                </div>
                <div className='order-msg'>Order placed successfully</div>
                <div className='image2'>
                    <img src={background2} alt="Add image" />
                </div>
                <div className='message'>hurray!!! your order is confirmed the order id is #123456 save the order id for further communication..</div>


                <table className='information'>
                    <tr className='headi'>
                        <td className='email'>
                            Email us
                        </td>
                        <td className='contact'>Contact us</td>
                        <td className='add'>Address</td>
                    </tr>
                    <tr className='data'>
                        <td className='email'>admin@bookstore.com</td>
                        <td className='contact'>7003321213</td>
                        <td className='add'>42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034</td>
                    </tr>
                </table>
                <div className='bn'>
                    <button className='shopping-button' onClick={() => navDashboard()}>Continue Shopping</button>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default CheckoutOrder;