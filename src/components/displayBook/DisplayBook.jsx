import React, { useState } from "react";
import '../displayBook/DisplayBook.scss';
import BookService from "../../services/BookService";
import { Box } from "@material-ui/core";
import dontmake from "../../assests/dontmake.png"
import { Button } from "@material-ui/core";


function DisplayBook() {
    const service = new BookService();
    const [book, setBook] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);


    const getAllBooks = () => {
        service.getBooks()
            .then((res) => {
                console.log(res);
                setBook(res.data.result);
            }).catch((err) => {
                console.log(err);
            })
    }

    React.useEffect(() => {
        getAllBooks();
    }, [])

    const addBookToCart = (book) => {
        service.addToCart(book._id)
            .then((res) => {
                console.log(res);
                setCart(res.data.result);
                getAllBooks();
            }).catch((err) => {
                console.log(err);
            })
    }

    const addBookToWishList = (book) => {
        console.log(book._id);
        service.addBookToWishList(book._id)
        .then((res) => {
            console.log(res);
            setWishlist(res.data.result);
            getAllBooks();
        }).catch((err) => {
            console.log(err);
        })
    }

    const getbutton = (item) => {
        let btn = '';
            let x = cart.filter(x => x._id === item._id);
            console.log(x);
        if(x) {
            btn = <Button>ADDED TO BAG</Button>
        }
        if(wishlist.indexOf(item._id)>-1) {
            btn = <Button>ADDED TO WISHLIST</Button>
        }
        else {
            btn = (
                <div>
                    <Button onClick={() => addBookToCart(item)} >ADD TO BAG</Button>
                    <Button onClick={() => addBookToWishList(item)} >WISHLIST</Button>
                </div>
            )
        }
        return btn;
    }

    return <div>
        <Box className="book-container" component="main" sx={{ flexGrow: 1.5, p: 8 }} >
            <p className="books" >Books</p>
            <p className="item">({book.length})</p>
            <select className='select-menu'>
                <option name="">Sort by relevance</option>
                <option name="hightolow">Price:High to Low</option>
                <option name="lowtohigh">Price:Low to High</option>
                <option name="newarrival">Nweest Arrivals</option>
            </select>
            <div className="display-book" >
                {
                    book.map((item, index) => (
                        <div className="card" key={index} >
                            <div className="imageCard" >
                                <img src={dontmake} alt="book image" />
                            </div>
                            <div className="detail-card" >
                                <p id="name" >Book: {item.bookName} </p>
                                <p id="author" >Author: {item.author} </p>
                                <p id="price" >Rs.- {item.price} </p>
                            </div>
                            <div className="btnContainer" >
                                <Button variant="contained" onClick={() => addBookToCart(item)} >ADD TO BAG</Button>
                                <Button variant="outlined" className="wishlist" onClick={() => addBookToWishList(item)} > WISHLIST </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Box>
    </div>;
}

export default DisplayBook;