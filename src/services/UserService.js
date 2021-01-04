import axios                     from 'axios';
import { API_URL }               from '../config/Constants';
import { resetAuthAsyncStorage } from './GetAuthAsyncStorage';
import { setAuthAsyncStorage }   from './GetAuthAsyncStorage';

function login(email, password) {
  // console.log('[XXX] Email: ' + email);
  // console.log('[XXX] Password: ' + password);

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/login`, {
        email    : email,
        password : password
      })
      .then(async (response) => {
        // console.log('[XXX] Response: ');
        // console.log(response);

        try {
          await setAuthAsyncStorage(response);
          resolve(response);
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        // console.log('[XXX] Then-Catch: ');
        // console.log(err);

        reject(err);
      });
  });
}

function forgotPassword(email) {
  // console.log('[XXX] Email: ' + email);

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/fpassword`, {
        email : email
      })
      .then(async (response) => {
        // console.log('[XXX] Response: ');
        // console.log(response);

        try {
          // DO WHATEVER IS REQUIRED
          resolve(response);
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        // console.log('[XXX] Then-Catch: ');
        // console.log(err);

        reject(err);
      });
  });
}

function resetPassword(password, confirmPassword) {
  // console.log('[XXX] Password: ' + password);
  // console.log('[XXX] Confirm Password: ' + confirmPassword);

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/rpassword`, {
        password : password,
        password_confirmation : confirmPassword
      })
      .then(async (response) => {
        // console.log('[XXX] Response: ');
        // console.log(response);

        try {
          // DO WHATEVER IS REQUIRED
          resolve(response);
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        // console.log('[XXX] Then-Catch: ');
        // console.log(err);

        reject(err);
      });
  });
}

async function logout(getState) {
  return new Promise((resolve, reject) => {
    const currentState = getState();
    const { token } = currentState.auth;

    axios
      .post(`${API_URL}/logout`, {
        token : `${token}`
      })
      .then(async (response) => {
        resolve(response);
        await resetAuthAsyncStorage();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const userService = { login, forgotPassword, resetPassword, logout };
