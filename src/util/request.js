import axios from "axios";
class Request {

    static init(options) {
        options.baseURL = "https://amirsaleem.in";
        if (options.headers == null) {
            options.headers = {};
        }
        options.headers["Content-Type"] = "application/json";
        options.headers["x-api-key"] = "6dbb951682c7c81cc30a06fc311227be";
        return axios(options);

    }

}

export default Request;
