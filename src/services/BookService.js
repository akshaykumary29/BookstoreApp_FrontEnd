import AxiosService from "./AxiosServices";

let baseUrl = "https://bookstore.incubation.bridgelabz.com/bookstore_user/";

let headerConfig = {
    headers: {
        'x-access-token' : localStorage.getItem("token")
    }
}
const axios = new AxiosService();

class BookService {
    getBooks() {
        return axios.getmethod(`${baseUrl}get/book`, headerConfig)
    }
    addToCart(product_id) {
        return axios.postmethod(`${baseUrl}add_cart_item/${product_id}`,{}, headerConfig)
    }
    addBookToWishList(product_id) {
        return axios.postmethod(`${baseUrl}add_wish_list/${product_id}`,{}, headerConfig)
    }
}

export default BookService;