import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import DisplayBook from "../../components/displayBook/DisplayBook";
import Footer from "../../components/footer/Footer";
import CartService from "../../services/CartService";
import WishlistService from "../../services/WishlistService";

function Home(props) {
    const cartservice = new CartService();
    const wishlistservice = new WishlistService();
    const [cart, setCart] = useState([]);
    const [wishlist, setWishList] = useState([]);

    useEffect(() => {
        getCart();
        getWishlist();
    }, []);
    const getCart= () => {
        cartservice.getCart()
        .then((res) => {
            console.log(res);
            setCart(res.data.result);
        }).catch((err) => {
            console.log(err);
        })
    }

    const getWishlist = () => {
        wishlistservice.getWishlists()
        .then(res=>{
            console.log(res)
            setWishList(res.data.result);
        
          })
          .catch(err=>{
            console.log(err)
          })
    }
    return <div>
        <Header cart={cart.length} wishlist={wishlist.length} getCart={getCart} getWishlist={getWishlist} />
        <DisplayBook cart={cart} wishlist={wishlist} getCart={getCart} getWishlist={getWishlist} />
        <Footer />
    </div>;
}

export default Home;