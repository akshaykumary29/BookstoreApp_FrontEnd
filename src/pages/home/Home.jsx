import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import DisplayBook from "../../components/displayBook/DisplayBook";
import Footer from "../../components/footer/Footer";
import CartService from "../../services/CartService";
import WishlistService from "../../services/WishlistService";

function Home() {
    const cartservice = new CartService();
    const wishlistservice = new WishlistService();
    const [cart, setCart] = useState([]);
    const [wishlist, setWishList] = useState([]);
    const [x, setX] = useState('');

    const search = (val) => {
        setX(val)
    }

    useEffect(() => {
        getCart();
        getWishlist();
    }, []);

    const getCart = () => {
        cartservice.getCart()
            .then((res) => {
                setCart(res.data.result);
            }).catch((err) => {
                console.log(err);
            })
    }

    const getWishlist = () => {
        wishlistservice.getWishlists()
            .then((res) => {
                setWishList(res.data.result);
            })
            .catch(err => {
                console.log(err)
            })
    }
    return <div className="home">
        <Header search={search} cart={cart.length} wishlist={wishlist.length} getCart={getCart} getWishlist={getWishlist} />
        <DisplayBook searchText={x} cart={cart} wishlist={wishlist} getCart={getCart} getWishlist={getWishlist} />
        <Footer />
    </div>;
}

export default Home;