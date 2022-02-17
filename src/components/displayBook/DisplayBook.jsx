import React, { useState } from "react";
import '../displayBook/DisplayBook.scss';
import BookService from "../../services/BookService";
import { Box } from "@material-ui/core";
import dontmake from "../../assests/dontmake.png"
import { Button } from "@material-ui/core";


function DisplayBook(props) {
    const service = new BookService();
    const [books, setBooks] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);


    const getAllBooks = () => {
        service.getBooks()
            .then((res) => {
                console.log(res);
                setBooks(res.data.result);
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
                props.getCart()
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
            props.getWishlist()
            getAllBooks();
        }).catch((err) => {
            console.log(err);
        })
    }

    const getbutton = (item) => {
        let btn = '';
        let cartItem=(props.cart).find((data)=>data.bookName===item.bookName);
        let wishItem=(props.wishlist).find((data)=>data.bookName===item.bookName);
        console.log(cartItem);
        if(cartItem) {
            btn = <Button variant="contained" >ADDED TO BAG</Button>
        }
        else if(wishItem){
            btn=<Button variant="contained"  >ADDEDTOWISHLIST</Button>
        }
        else {
            btn =
                <div>
                    <Button variant="contained" onClick={() => addBookToCart(item)} >ADD TO BAG</Button>
                    <Button variant="contained" onClick={() => addBookToWishList(item)} >WISHLIST</Button>
                </div>
            
        }
        return btn;
    }

    return <div>
        <Box className="bookContain" component="main" sx={{ flexGrow: 1.5, p: 8 }} >
            <p className="books" >Books</p>
            <p className="book-len">({books.length})</p>
            <select className='select-menu'>
                <option name="">Sort by relevance</option>
                <option name="hightolow">Price:High to Low</option>
                <option name="lowtohigh">Price:Low to High</option>
                <option name="newarrival">Nweest Arrivals</option>
            </select>
            <div className="displayCard" >
                {
                    books.map((book, index) => (
                        <div className="card" key={book._id} >
                            <div className="imageCard" >
                                <img src={dontmake} alt="book image" />
                            </div>
                            <div className="detailsCard" >
                                <p id="name" >Book: {book.bookName} </p>
                                <p id="author" >Author: {book.author} </p>
                                <p id="price" >Rs.- {book.price} </p>
                            </div>
                            <div className="btnContainer" >
                                {getbutton(book)}
                                {/* <Button variant="contained" onClick={() => addBookToCart(item)} >ADD TO BAG</Button>
                                <Button variant="outlined" className="wishlist" onClick={() => addBookToWishList(item)} > WISHLIST </Button> */}
                            </div>
                        </div>
                    ))
                }
            </div>
        </Box>
    </div>;
}

export default DisplayBook;