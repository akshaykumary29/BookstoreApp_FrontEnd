import AxiosService from "./AxiosServices";

let baseUrl = "https://bookstore.incubation.bridgelabz.com/bookstore_user/";

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
    
    customerDetails(data) {
        return axios.putmethod(`${baseUrl}edit_user`, data, headerConfig)
    }
}

export default UserService;