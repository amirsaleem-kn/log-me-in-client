import axios from "axios";
class Request {

    static init(options) {

        options.baseUrl = process.env.APIURL;
        if (options.headers) {
            options.headers = {
                "Content-Type": "application/json",
                "x-api-key": process.env.APIKEY,
            }
        } else {
            options.headers["Content-Type"] = "application/json";
            options.headers["x-api-key"] = process.env.APIKEY;
        }
        return axios(options);

    }

}

export default Request;
