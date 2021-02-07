import axios from "axios";

class Request {

    static init(options) {
        return axios(options);
    }

}

export default Request;
