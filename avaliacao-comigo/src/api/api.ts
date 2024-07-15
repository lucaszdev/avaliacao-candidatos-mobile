import axios from "axios";

const Api = axios.create({
    baseURL: "http://192.168.0.4:3000",
    timeout: 15000,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
});

export default Api;
