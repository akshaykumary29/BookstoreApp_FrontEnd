import AxiosService from "./AxiosServices";

let baseUrl = "https://new-bookstore-backend.herokuapp.com/bookstore_user/";
let headerConfig = {
    headers: {
        'x-access-token' : localStorage.getItem("token")
    }
}

const axios = new AxiosService();

class UserService {
    register(data) {
        return axios.postmethod(`${baseUrl}registration`, data)
    }

    login(data) {
        return axios.postmethod(`${baseUrl}login`, data)
    }
}

export default UserService;