import AxiosService from "./AxiosServices";

let baseUrl = "https://new-bookstore-backend.herokuapp.com/bookstore_user/";

let headerConfig = {
    headers: {
        'x-access-token' : localStorage.getItem("token")
    }
}
const axios = new AxiosService();

class WishlistService {
    getWishlists() {
        return axios.getmethod(`${baseUrl}get_wishlist_items`, headerConfig);
    }
}

export default WishlistService;