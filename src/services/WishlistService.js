import AxiosService from "./AxiosServices";

let baseUrl = "https://bookstore.incubation.bridgelabz.com/bookstore_user/";

let headerConfig = {
    headers: {
        'x-access-token': localStorage.getItem("token")
    }
}
const axios = new AxiosService();

class WishlistService {
    getWishlists() {
        return axios.getmethod(`${baseUrl}get_wishlist_items`, headerConfig);
    }
    removeWishlish(product_id) {
        return axios.deletemethod(`${baseUrl}remove_wishlist_item/${product_id}`, headerConfig)
    }
}

export default WishlistService;