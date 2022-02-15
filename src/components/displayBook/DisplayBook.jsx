import React, { useState } from "react";
import '../displayBook/DisplayBook.scss';
import BookService from "../../services/BookService";
import { Box } from "@material-ui/core";
import dontmake from "../../assests/dontmake.png"
import { Button } from "@material-ui/core";


function DisplayBook() {
    const service = new BookService();
    const [book, setBook] = useState([]);


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

    return <div>
        <Box className="book-container" component="main" sx={{ flexGrow: 1, p: 10 }} >
            <p>Books<p className="book-length">({book.length})</p></p>
            <div className="display-book" >
                {
                    book.map((item, index) => (
                        <div className="card" key={book._id} >
                            <div className="imageCard" >
                                <img src={dontmake} alt="book image" />
                            </div>
                            <div className="detail-card" >
                                <p id="name" >Book: {item.bookName} </p>
                                <p id="author" >Author: {item.author} </p>
                                <p id="price" >Rs.- {item.price} </p>
                            </div>
                            <div className="btnContainer" >
                                <Button id="update" variant="contained"  > ADD TO BAG </Button>
                                <Button id="delete" variant="outlined" > WISHLIST </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Box>
    </div>;
}

export default DisplayBook;