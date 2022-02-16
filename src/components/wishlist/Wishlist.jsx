import React, { useEffect, useState } from "react";
import BookService from "../../services/BookService";
import WishlistService from "../../services/WishlistService";
import Header from "../header/Header";
import { Box } from "@mui/material";
import { Button } from "@material-ui/core";

function Wishlist() {
    const service = new WishlistService();
    const bookService = new BookService();
    const [cart, setCart] = useState([]);
    const [wishlist, setWishList] = useState([]);

    useEffect(() => {
        getWishlist();
    }, []);

    const getWishlist = () => {
        service.getWishlists()
            .then((res) => {
                console.log(res);
                setWishList(res.data.result);
            }).catch((err) => {
                console.log(err);
            })
    }

    const addToCart = (val) => {
        console.log(val);
        bookService.addToCart(val._id)
            .then((res) => {
                console.log(res);
                setCart(res.data.result)
            }).catch((err) => {
                console.log(err);
            })
    }

    return <div>
        <Header wishlistLen={wishlist.length} />
        <Box className="bookContain" component="main" sx={{ flexGrow: 1, p: 8 }} >
            <h1> MyWishList <p className="book-len" > {wishlist.length} </p></h1>
            <div className="displayCard" >
                {
                    wishlist.map((list, index) => (
                        <div key={list.product_id._id} className="card" >
                            <div className="imageCard" >
                                <img src={list.product_id.dontmake} alt="img" />
                            </div>
                            <div className="detailsCard" >
                                <p id="name" > {list.product_id.bookName} </p>
                                <p id="author" >by {list.product_id.author} </p>
                                <p id="price" >Rs. {list.product_id.price} </p>
                            </div>
                            <div className="btnContainer" >
                                <Button variant="contained" onClick={() => addToCart(list)} > AddToBag </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Box>
    </div>;
}

export default Wishlist;