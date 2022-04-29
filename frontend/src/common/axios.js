
import axios from "axios";

const axios_api = axios.create({
  baseURL: "http://ec2-44-201-9-16.compute-1.amazonaws.com:8080/api",
});

export default axios_api;
