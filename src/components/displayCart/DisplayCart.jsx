import React, { useEffect, useState } from "react";
import '../displayCart/DisplayCart.scss'

import Header from "../header/Header";
import { Button } from "@material-ui/core";
import { Box } from "@mui/material";
import CartService from "../../services/CartService";

function DisplayCart() {
    const service = new CartService();

    const [cart, setCart] = useState([]);
    const [wishlist, setWishList] = useState([])
    

    useEffect(() => {
        getCart();
    }, []);


    const getCart = () => {
        service.getCart()
            .then((res) => {
                console.log(res);
                setCart(res.data.result);
            }).catch((err) => {
                console.log(err);
            })
    }

    const increament = (val) => {
        console.log("cartid", val._id);
        console.log("quantity", val.quantityToBuy);
        let data = {
            "quantityToBuy": val.quantityToBuy + 1
        }
        console.log(data);
        service.cartItemQuantity(val._id, data)
            .then(() => {
                service.getCart()
                .then((res) => {
                    console.log(res);
                    setCart(res.data.result);
                }).catch((err) => {
                    console.log(err);
                })
                getCart()
            }).catch((err) => {
                console.log(err);
            })
    }

    const decrement= (val) => {
        let data = {
            "quantityToBuy": val.quantityToBuy - 1
        }
        service.cartItemQuantity(val._id, data)
        .then((res) => {
            service.getCart()
            .then(() => {
                console.log(res);
                setCart(res.data.result);
            }).catch((err) => {
                console.log(err);
            })
            getCart()
        }).catch((err) => {
            console.log(err);
        })
    }

    const removeCart = (val) => {
        service.removeCart(val._id)
        .then((res) => {
            console.log(res);
            setCart(res.data.result)
            getCart()
        }).catch((err) => {
            console.log(err);
        })
    }

    return <div>
        <Header cartLen={cart.length ? cart.length : 0} />
        <Box className='cartContain' component="main" sx={{ flexGrow: 1, p: 8 }}>
            <h1>MyCart<p className='book-len'> {cart.length}</p></h1>

            <div className='displayCard'>
                {
                    cart.map((cart, index) => (
                        <div key={cart.product_id._id} className='card1'>
                            <div className='imageCard'>
                                <img src={cart.product_id.dontmake} alt="img" />
                            </div>
                            <div className='detailsCard'>
                                <p id="name">{cart.product_id.bookName}</p>
                                <p id="author">by {cart.product_id.author}</p>
                                <p id="price" >Rs.{cart.product_id.price}</p>
                            </div>
                            <div className="btnContainer">
                                {/* <Button variant="contained" onClick={() => addToWishlist(list)} >AddToWishlist</Button> */}
                                <Button variant="contained" onClick={() => increament(cart)} >+</Button>
                                <p className='cartQnt'>{cart.quantityToBuy}</p>
                                <Button variant="outlined" className="blackFont" onClick={() => decrement(cart)} >-</Button>
                                <Button variant="outlined" className="blackFont" onClick={() => removeCart(cart)} > Remove</Button>
                            </div>
                        </div>
                    ))}
            </div>
        </Box>
    </div>;
}

export default DisplayCart;