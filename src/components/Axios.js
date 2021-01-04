import axios from 'axios';

const instance = (token) => {
  if (token) {
    return axios.create({
      baseURL : 'https://qleap.co.in/futton-api/api/v1/admin/',
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
  } else {
    return axios.create({
      baseURL : 'https://qleap.co.in/futton-api/api/v1/admin/'
    });
  }
};

module.exports = instance;
