import AxiosService from "./AxiosServices";

let baseUrl = "https://new-bookstore-backend.herokuapp.com/bookstore_user/";

let headerConfig = {
    headers: {
        'x-access-token' : localStorage.getItem("token")
    }
}

const axios = new AxiosService();
class CartService {

    getCart() {
        return axios.getmethod(`${baseUrl}get_cart_items`, headerConfig)
    }

    cartItemQuantity(cartItem_id, data) {
        return axios.putmethod(`${baseUrl}cart_item_quantity/${cartItem_id}`, data, headerConfig)
    }
    removeCart(cartItem_id) {
        return axios.deletemethod(`${baseUrl}remove_cart_item/${cartItem_id}`, headerConfig)
    }
}

export default CartService;