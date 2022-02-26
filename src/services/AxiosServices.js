import axios from "axios";

class AxiosService {
    postmethod(url, data, headers = null) {
        return axios.post(url, data, headers);
    }

    getmethod(url, data, headers = null) {
        return axios.get(url, data, headers);
    }

    putmethod(url, data, headers = null) {
        return axios.put(url, data, headers);
    }

    deletemethod(url, data, headers = null) {
        return axios.delete(url, data, headers);
    }
}

export default AxiosService;