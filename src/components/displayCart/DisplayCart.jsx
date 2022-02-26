import React, { useEffect, useState } from "react";
import '../displayCart/DisplayCart.scss'
import Header from "../header/Header";
import CartService from "../../services/CartService";
import WishlistService from "../../services/WishlistService";
import OrderService from "../../services/OrderService";
import Footer from "../footer/Footer";
import dontmake from '../../assests/dontmake.png';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Radio, TextField, RadioGroup, FormControl, FormLabel, FormControlLabel } from "@mui/material";
import UserService from "../../services/UserService";
import { useHistory } from "react-router-dom";


function DisplayCart() {
    const history = useHistory();
    const service = new CartService();
    const wishservice = new WishlistService();
    const orderService = new OrderService();
    const userservice = new UserService();
    const [cart, setCart] = useState([]);
    const [wishlist, setWishList] = useState([])
    // const [ordersumm, setOrderSumm] = useState([])
    const [orderbutton, setOrderbutton] = useState(true)
    const [checkout, setCheckout] = useState(true)
    const [fields, setFields] = useState({
        fullAddress: "",
        city: "",
        state: "",
        addressType: ""

        // fullAddress: localStorage.getItem("fullAddress"),
        // city: localStorage.getItem("city"),
        // state: localStorage.getItem("state"),
        // addressType: localStorage.getItem("addressType")
    })

    const [continuebutton, setContinuebutton] = useState(true)

    const changebutton = () => {
        setOrderbutton(false)
        placeOrder();
    }

    const orderSummary = () => {
        setContinuebutton(false)
        setCheckout(false)
    }

    useEffect(() => {
        getCart();
        getWishlist();
        customerDetails();
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

    const getWishlist = () => {
        wishservice.getWishlists()
            .then((res) => {
                console.log(res);
                setWishList(res.data.result)
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
                getCart()
            }).catch((err) => {
                console.log(err);
            })
    }

    const decrement = (val) => {
        let data = {
            "quantityToBuy": val.quantityToBuy - 1
        }
        service.cartItemQuantity(val._id, data)
            .then((res) => {
                getCart()
            }).catch((err) => {
                console.log(err);
            })
    }

    const removeCart = (val) => {
        service.removeCart(val._id)
            .then((res) => {
                console.log(res);
                // setCart(res.data.result)
                getCart()
            }).catch((err) => {
                console.log(err);
            })
    }

    const placeOrder = (val) => {
        console.log(val);
        let data;
        val.map((order) => {
            console.log(order);
            data = {
                "order": [
                    {
                        "product_id": order.product_id._id,
                        "product_name": order.product_id.bookName,
                        "product_quantity": order.product_id.quantityToBuy,
                        "product_price": order.product_id.price
                    }
                ]
            }
            console.log(data);
            orderService.order(data)
                .then((res) => {
                    console.log(res);
                    // setOrderSumm(res.data.result)
                }).catch((err) => {
                    console.log(err);
                })
        })
    }

    const changefield = (e) => {
        setFields(fields => {
            return { ...fields, [e.target.name]: e.target.value }
        })
    }

    const customerDetails = () => {
        console.log(fields.addressType);
        let data = {
            "addressType": fields.addressType,
            "fullAddress": fields.fullAddress,
            "city": fields.city,
            "state": fields.state
        }
        console.log(data);
        userservice.customerDetails(data)
            .then((res) => {
                console.log(res);
                localStorage.setItem("addressType", res.data.result.address[1].addressType)
                localStorage.setItem("fullAddress", res.data.result.address[1].fullAddress)
                localStorage.setItem("city", res.data.result.address[1].city)
                localStorage.setItem("state", res.data.result.address[1].state);
            }).catch((err) => {
                console.log(err);
            })
    }

    const callfunctions = () => {
        customerDetails()
        orderSummary()
    }

    const checkoutorder = () => {
        // service.removeCart()
        //     .then(() => {
        //         getCart()
        //     }).catch(() => {

        //     })
        history.push('/checkout')
    }

    return <div>
        <Header cart={cart ? cart.length : 0} wishlist={wishlist ? wishlist.length : 0} />
        {/* wishlist ? wishItem.length : 0 */}

        <div className='maincart-container'>
            <h3 className='heading'>Home/ My cart</h3>
            <div className='cart-container'>
                <h3 className='my-cart'>My Cart({cart ? cart.length : 0})</h3>
                {
                    cart ? cart.map((cart) => {
                        return <div >
                            <div className='content-container'>
                                <div className='image-cart'><img src={dontmake} alt="image" style={{ height: "105px" }, { width: "100 px" }} /></div>
                                <div className='cart-description'>
                                    <div className='book-nam'>{cart.product_id.bookName}</div>
                                    <div className='author-nam'>by: {cart.product_id.author}</div>
                                    <div className='pricetage'>Rs. {cart.product_id.price}</div>
                                </div>
                            </div>
                            <div className='update-cart'>
                                <RemoveCircleOutlineOutlinedIcon htmlColor="grey" onClick={() => { decrement(cart) }} />
                                <div className='cart-quantity'>{cart.quantityToBuy}</div>
                                <AddCircleOutlineOutlinedIcon htmlColor="grey" onClick={() => { increament(cart) }} />
                                <div className='remove' onClick={() => removeCart(cart)}>Remove</div>
                            </div>
                        </div>
                    }) : ''
                }
                {
                    orderbutton ? <button className='button-order' onClick={() => changebutton()} >Place order</button>
                        : ""
                }
            </div>
            {
                orderbutton ? <div className='customer-details'>
                    <div className='inside-details'>Customer Details</div></div>
                    :
                    <div className='customer-detail'>
                        <div className='inside-customerdetails'>
                            <h3 className='heading'>Customer Details</h3>

                            <div className='text-fields'>
                                <div className='name-field'>
                                    <TextField required size="medium" name="fullname" id="outlined-basic" label="Full Name" variant="outlined" style={{ width: "250px" }} onChange={(e) => changefield(e)} />
                                </div>
                                <div className='mobile-num'>
                                    <TextField name="mobilenumber" id="outlined-basic" label="Mobile Number" variant="outlined" style={{ width: "250px" }} onChange={(e) => changefield(e)} />
                                </div>
                            </div>
                            <div className='text-fields'>
                                <div className='name-field'>
                                    <TextField name="pincode" size="medium" id="outlined-basic" label="Pin code" variant="outlined" style={{ width: "250px" }} onChange={(e) => { changefield(e) }} />
                                </div>
                                <div className='mobile-num'>
                                    <TextField name="locality" id="outlined-basic" label="Locality" variant="outlined" style={{ width: "250px" }} onChange={(e) => changefield(e)} />
                                </div>
                            </div>
                            <div className='Address'>
                                <TextField required name="fullAddress" id="outlined-basic" label="fullAddress" variant="outlined" style={{ width: "532px" }} multiline="true" rows="4" onChange={(e) => { changefield(e) }} value={fields.fullAddress} />
                            </div>
                            <div className='text-fields'>
                                <div className='name-field'>
                                    <TextField required name="city" size="medium" id="outlined-basic" label="City/town" variant="outlined" style={{ width: "250px" }} onChange={(e) => { changefield(e) }} value={fields.city} />
                                </div>
                                <div className='mobile-num'>
                                    <TextField name="landmark" id="outlined-basic" label="Landmark" variant="outlined" style={{ width: "250px" }} onChange={(e) => { changefield(e) }} />
                                </div>
                            </div>

                            <div className='radio'>

                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label" style={{ marginTop: "5%", marginLeft: "-265%" }}>Type</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        style={{ marginTop: "5%", marginLeft: "-85%" }}
                                    >

                                        <FormControlLabel required name="addressType" value="Home" control={<Radio />} label="Home" onClick={(e) => { changefield(e) }} />
                                        <FormControlLabel required name="addressType" value="Work" control={<Radio />} label="Work" onClick={(e) => { changefield(e) }} />
                                        <FormControlLabel required name="addressType" value="other" control={<Radio />} label="Other" onClick={(e) => { changefield(e) }} />

                                    </RadioGroup>
                                </FormControl>

                            </div>
                            {
                                continuebutton ? <button className='continue-button' onClick={() => callfunctions()} >Continue</button>
                                    : ""
                            }
                        </div>

                    </div>

            }


            {
                checkout ?

                    <div className='customer-details'>
                        <div className='inside-details'>Order Summary</div>
                    </div>
                    :
                    <div className='order-details'>
                        <div className='inside-orderdetails'>Order Summary</div>
                        {
                            cart ? cart.map((cart) => {
                                return <div >
                                    <div className='content-containers'>
                                        <div className='image-carts'>
                                            <img src={dontmake} alt="image" style={{ height: "105px", width: "100 px" }} /></div>
                                        <div className='cart-descriptions'>
                                            <div className='book-nams'>{cart.product_id.bookName}</div>
                                            <div className='author-nams'>{cart.product_id.author}</div>
                                            <div className='pricetages'>Rs. {cart.product_id.price}</div>
                                        </div>

                                    </div>

                                </div>
                            }) : ''

                        }
                        <button className='checkout-button' onClick={() => checkoutorder()}>checkout</button>
                    </div>
            }

        </div>

        <div>
            <Footer />
        </div>
    </div>;
}

export default DisplayCart;