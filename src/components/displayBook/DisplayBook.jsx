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
import { book } from '../../redux/actions/bookAction';
import { useDispatch, useSelector } from "react-redux";


function DisplayBook(props) {
    const service = new BookService();
    const [books, setBooks] = useState([]);
    const [sortBy, setSortBy] = useState("")
    const bookData = useSelector(state => state.getBookItem)
    const dispatch = useDispatch();


    // Pagination
    let [page, setPage] = useState(0);
    const PER_PAGE = 8;

    const count = Math.ceil(bookData.books.length / PER_PAGE);
    const _DATA = usePagination(bookData.books, PER_PAGE);

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
                // setBooks(res.data.result);
                dispatch(book(res.data.result))
            }).catch((err) => {
                console.log(err);
            })
    }

    const addBookToCart = (book) => {
        service.addToCart(book._id)
            .then((res) => {
                console.log(res);
                props.getCart() //getting cartitem count the item
                setOpen(true);
                getAllBooks();//calling book item
                setMsg("Added To Bag")
            }).catch((err) => {
                console.log(err);
                setOpen(true);
                setMsg("Added Failed")
            })
    }

    const addBookToWishList = (book) => {
        service.addBookToWishList(book._id)
            .then((res) => {
                props.getWishlist() //getting wishitem count the item
                setOpen(true);
                getAllBooks();
                setMsg("Wishlist Added")
            }).catch((err) => {
                setOpen(true);
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
        let val = e.target.value;
        switch (val) {
            case "hightolow":
                highToLow();
                break;
            case "lowtohigh":
                lowToHigh();
                break;
            case "newarrival":
                aToZ();
                break;
            default:
                console.log("Invalid");
        }
    }

    const highToLow = () => {
        let htol = bookData.books.sort((a, b) => a.price - b.price).reverse();
        // setSortBy(htol);
        dispatch(book(htol))
    }

    const lowToHigh = () => {
        let ltoh = bookData.books.sort((a, b) => a.price - b.price);
        // setSortBy(ltoh);
        dispatch(book(ltoh))
    }

    const aToZ = () => {
        let atoz = bookData.books.sort((a, b) => a.bookName.localeCompare(b.bookName));
        // setSortBy(atoz);
        dispatch(book(atoz))
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
        <Box className="bookContain" component="main" sx={{ flexGrow: 1, p: 12 }} >
            <p className="books" >Books</p>
            <p className="book-len">({bookData.books.length})</p>
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
                                <img src={dontmake} alt="book image" width={100} />
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