import axios from 'axios';
import { API_URL } from "../config/Constants"
const instance = (token, URL = API_URL) => {
  //console.log('====================================');
  // console.log(API_URL);
  //console.log('====================================');
  if (token) {
    return axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } else {
    return axios.create({
      baseURL: URL
    });
  }
};

module.exports = instance;
