import axios from "axios";

export default axios.create({
  baseURL: "https://test.yobitrust.com:8443",
  headers: {
    "Content-type": "application/json"
  }
});