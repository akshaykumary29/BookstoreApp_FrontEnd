import AxiosService from "./AxiosServices";

let baseUrl = "https://new-bookstore-backend.herokuapp.com/bookstore_user/";

let headerConfig = {
    headers: {
        'x-access-token' : localStorage.getItem("token")
    }
}
const axios = new AxiosService();

class BookService {
    getBooks() {
        return axios.getmethod(`${baseUrl}get/book`)
    }
}

export default BookService;