import axios from "axios";

export default axios.create({
  baseURL: "http://4531c28949ef.ngrok.io",
  headers: {
    "Content-type": "application/json"
  }
});