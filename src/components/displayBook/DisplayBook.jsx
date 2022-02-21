import React, { useState } from "react";
import '../displayBook/DisplayBook.scss';
import BookService from "../../services/BookService";
import { Box } from "@material-ui/core";
import dontmake from "../../assests/dontmake.png"
import { Button } from "@material-ui/core";
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'


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
        props.getCart();
        props.getWishlist();
    }, [])

    const addBookToCart = (book) => {
        setOpen(true);
        service.addToCart(book._id)
            .then((res) => {
                console.log(res);
                setCart(res.data.result);
                props.getCart()
                getAllBooks();
                setMsg("Added To Bag")
            }).catch((err) => {
                console.log(err);
                setMsg("Added Failed")
            })
    }

    const addBookToWishList = (book) => {
        setOpen(true);
        console.log(book._id);
        service.addBookToWishList(book._id)
            .then((res) => {
                console.log(res);
                setWishlist(res.data.result);
                props.getWishlist()
                getAllBooks();
                setMsg("Wishlist Added")
            }).catch((err) => {
                console.log(err);
                setMsg("Wishlist Faild")
            })
    }

    const getbutton = (item) => {
        let btn = '';
        let cartItem = (props.cart).find((data) => data.product_id.bookName === item.bookName);
        let wishItem = (props.wishlist).find((data) => data.product_id.bookName === item.bookName);
        console.log(cartItem);
        if (cartItem) {
            btn = <Button variant="contained" className="addedBtn">ADDED TO BAG</Button>
        }
        else if (wishItem) {
            btn = <Button variant="contained" className="addedBtn" >ADDEDTOWISHLIST</Button>
        }
        else {
            btn =
                <div>
                    <Button variant="contained" onClick={() => addBookToCart(item)} >ADD TO BAG</Button>
                    <Button variant="contained" className="blackFont" onClick={() => addBookToWishList(item)} >WISHLIST</Button>
                </div>

        }
        return btn;
    }

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
      const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

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
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={msg}
                action={action}
            />
        </Box>
    </div>;
}

export default DisplayBook;