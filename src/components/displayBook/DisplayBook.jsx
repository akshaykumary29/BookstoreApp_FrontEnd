import React, { useState } from "react";
import '../displayBook/DisplayBook.scss';
import BookService from "../../services/BookService";
import { Box } from "@material-ui/core";
import dontmake from "../../assests/dontmake.png"
import { Button } from "@material-ui/core";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Pagination from '@mui/material/Pagination';
import usePagination from "../pagination/Pagination";


function DisplayBook(props) {
    const service = new BookService();
    const [books, setBooks] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [sortBy, setSortBy] = useState("")


    // Pagination
    let [page, setPage] = useState(0);
    const PER_PAGE = 8;

    const count = Math.ceil(books.length / PER_PAGE);
    const _DATA = usePagination(books, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    React.useEffect(() => {
        getAllBooks();
        props.getCart();
        props.getWishlist();
    }, [props.searchText])

    const getAllBooks = () => {
        service.getBooks()
            .then((res) => {
                setBooks(res.data.result);
            }).catch((err) => {
                console.log(err);
            })
    }

    const addBookToCart = (book) => {
        // setOpen(true);
        service.addToCart(book._id)
            .then((res) => {
                console.log(res);
                setCart(res.data.result);
                props.getCart()
                setOpen(true);
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
        if (cartItem) {
            btn = <Button variant="outlined" className="addedBtn">ADDED TO BAG</Button>
        }
        else if (wishItem) {
            btn = <Button variant="outlined" className="addedBtn1" >ADDED TO WISHLIST</Button>
        }
        else {
            btn = <div className="btnContainer" >
                <div>
                    <Button variant="contained" className="cart-btn" onClick={() => addBookToCart(item)} >ADD TO BAG</Button>
                </div>

                <div>
                    <Button variant="outlined" className="wishlist-btn" onClick={() => addBookToWishList(item)} >WISHLIST</Button>
                </div>
            </div>
        }
        return btn;
    }

    //sort the books
    const handleSorting = (e) => {
        console.log(e.target.value);
        let val = e.target.value;
        switch (val) {
            case "hightolow":
                highToLow();
                break;
            case "lowtohigh":
                lowToHigh();
                break;
            case "newarrival":
                aToz();
                break;
            default:
                console.log("Invalid");
        }
    }

    const highToLow = () => {
        let htol = books.sort((a, b) => a.price - b.price).reverse();
        console.log(htol);
        setSortBy(htol);
    }

    const lowToHigh = () => {
        let ltoh = books.sort((a, b) => a.price - b.price);
        console.log(ltoh);
        setSortBy(ltoh);
    }

    const aToz = () => {
        let atoz = books.sort((a, b) => a.bookName.localeCompare(b.bookName));
        console.log(atoz);
        setSortBy(atoz);
    }

    // for snackbar
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <>
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
        </>
    );


    return <div>
        <Box className="bookContain" component="main" sx={{ flexGrow: 1, p: 8 }} >
            <p className="books" >Books</p>
            <p className="book-len">({books.length})</p>
            <select className='select-menu' name="sortBy" value="sortBy" onChange={handleSorting}>
                <option value="">Sort by relevance</option>
                <option value="hightolow">Price:High to Low</option>
                <option value="lowtohigh">Price:Low to High</option>
                <option value="newarrival">Newest Arrivals</option>
            </select>
            <div className="displayCard" >
                {
                    // books.map((book, index) => (
                    _DATA.currentData().filter(x => x.bookName.toLowerCase().includes(props.searchText)).map((book, index) => (
                        <div className="card" key={book._id} >
                            <div className="imageCard" >
                                <img src={dontmake} alt="book image" />
                            </div>
                            <div className="detailsCard" >
                                <p id="name" >Book: {book.bookName} </p>
                                <p id="author" >Author: {book.author} </p>
                                <p id="price" >Rs.- {book.price} </p>
                            </div>

                            {getbutton(book)}

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

            <div className='pagination'>
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                />
            </div>
        </Box>
    </div>;
}

export default DisplayBook;