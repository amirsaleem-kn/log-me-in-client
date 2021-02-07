import axios from "axios";
class Request {

    static init(options) {

        options.baseUrl = `https://amirsaleem.in`; // This should come from .env file
        if (options.headers) {
            options.headers = {
                "Content-Type": "application/json",
                "x-api-key": `6dbb951682c7c81cc30a06fc311227be`, // this should not be exposed to version controler, due to less time, doing this.
            }
        } else {
            options.headers["Content-Type"] = "application/json";
            options.headers["x-api-key"] = `6dbb951682c7c81cc30a06fc311227be`;
        }
        return axios(options);

    }

}

export default Request;
