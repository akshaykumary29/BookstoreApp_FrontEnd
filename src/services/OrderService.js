import AxiosService from "./AxiosServices";

let baseUrl = "https://bookstore.incubation.bridgelabz.com/bookstore_user/";

let headerConfig = {
    headers: {
        'x-access-token': localStorage.getItem("token")
    }
}
const axios = new AxiosService();

class OrderService {
    order(data) {
        return axios.postmethod(`${baseUrl}add/order`, data, headerConfig);
    }
}

export default OrderService;