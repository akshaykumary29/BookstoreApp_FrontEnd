import React, { useEffect, useState } from "react";
import BookService from "../../services/BookService";
import WishlistService from "../../services/WishlistService";
import Header from "../header/Header";

import Footer from "../footer/Footer";
import CartService from "../../services/CartService";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import dontmake from "../../assests/dontmake.png"
import '../wishlist/Wishlist.scss'

function Wishlist() {
    const service = new WishlistService();
    const cartservice = new CartService();
    const bookService = new BookService();
    const [cart, setCart] = useState([]);
    const [wishlist, setWishList] = useState([]);

    useEffect(() => {
        getCart();
        getWishlist();
    }, []);

    const getCart = () => {
        cartservice.getCart()
            .then((res) => {
                console.log(res);
                setCart(res.data.result);
            }).catch((err) => {
                console.log(err);
            })
    }

    const getWishlist = () => {
        service.getWishlists()
            .then((res) => {
                console.log(res);
                setWishList(res.data.result);
            }).catch((err) => {
                console.log(err);
            })
    }

    // const addToCart = (e, val) => {
    //     console.log(val);
    //     bookService.addToCart(val.product_id._id)
    //         .then((res) => {
    //             console.log(res);
    //             setCart(res.data.result)
    //             getCart();
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    // }

    const deleteFromWishlist = (val) => {
        service.removeWishlish(val.product_id._id)
            .then((res) => {
                console.log(res);
                setWishList(res.data.result)
                getWishlist()
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <Header wishlist={wishlist ? wishlist.length : 0} cart={cart ? cart.length : 0} />

            <div className='wishListMain'>
                <div className='wishListInner'>
                    <div className='header' style={{ paddingRight: "900px", marginTop: 80 }}>
                        {/* onClick={home} */}
                        <span
                            style={{
                                color: '#9D9D9D',
                                marginRight: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Home /
                        </span>
                        <span>My WishList</span>
                    </div>
                    <div className='wishlisthead' style={{ marginTop: 15 }}>
                        My WishList ( {wishlist.length} )
                    </div>
                    <div className='display'>
                        {
                            wishlist ? wishlist.map((item) => (
                                <div key={item.product_id._id} className='firstBook'>
                                    <div className='imgAndInfo'>
                                        <div className='bookImgCont'>
                                            <div className='bookImg'>
                                                <img className='theImage' src={dontmake}></img>
                                            </div>
                                        </div>
                                        <div className='bookInfo'>
                                            <div className='bookName'>
                                                {item.product_id.bookName}
                                            </div>
                                            <div className='bookAuthor'>
                                                by {item.product_id.author}
                                            </div>
                                            <div className='bookPrice'>
                                                <div className='newPrice'>
                                                    Rs. {item.product_id.discountPrice}
                                                </div>
                                                <div className='oldPrice'>
                                                    Rs. {item.product_id.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='buttonBox'>
                                        <div
                                            className='deleteButton'
                                            onClick={() => deleteFromWishlist(item)}
                                        >
                                            <DeleteOutlinedIcon
                                            // style={{ width: '100%', height: '100%' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )) : ''
                        }
                    </div>
                </div>
            </div>
            <br />
            <Footer />
        </div>
    )
}

export default Wishlist;