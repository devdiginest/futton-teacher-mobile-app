import axios from 'axios';
import { API_URL } from "../config/Constants"
const instance = (token) => {
  if (token) {
    return axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } else {
    return axios.create({
      baseURL: API_URL
    });
  }
};

module.exports = instance;
