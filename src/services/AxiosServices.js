import axios from "axios";

class AxiosService {
    postmethod(url, data, header=null) {
        return axios.post(url, data, header);
    }

    getmethod(url, data, header=null) {
        return axios.get(url, data, header);
    }
}

export default AxiosService;