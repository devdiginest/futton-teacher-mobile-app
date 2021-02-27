import React, { useContext } from 'react';
import {
  AUTH_ERR_LOG_IN,
  AUTH_ERR_LOG_OUT,
  AUTH_LOGGED_IN,
  AUTH_LOGGING_IN,
  AUTH_LOGGING_OUT,
  AUTH_LOGOUT,
  SET_PROFILE_DATA
} from '../constants/Auth';
import { AuthContext } from '../navigation/AuthProvider';
import { navigate } from '../services/NavRef';
import { userService } from '../services/UserService';

//***** LOGIN

export const loggingIn = (loggingIn) => ({
  type: AUTH_LOGGING_IN,
  payload: loggingIn
});

export const loggedIn = (data) => ({
  type: AUTH_LOGGED_IN,
  payload: data
});

export const errorLogIn = (errorMessage) => ({
  type: AUTH_ERR_LOG_IN,
  payload: errorMessage
});

export const login = (email, password) => (dispatch) => {
  dispatch(loggingIn(true));

  // const { firebaselogin } = useContext(AuthContext);

  userService.login(email, password).then(async (res) => {
    await dispatch(loggedIn(res.data));
    // await firebaselogin(email, password);
    await navigate('Home');
  }).catch((err) => {
    dispatch(errorLogIn('Wrong username or password'));
  }).finally(() => {
    dispatch(loggingIn(false));
  });
};

//***** LOGOUT

export const loggedOut = () => ({
  type: AUTH_LOGOUT
});

export const loggingOut = (lOut) => ({
  type: AUTH_LOGGING_OUT,
  payload: lOut
});

export const errorLogOut = (errorMessage) => ({
  type: AUTH_ERR_LOG_OUT,
  payload: errorMessage
});

export const setProfileData = (userData) => ({
  type: SET_PROFILE_DATA,
  payload: userData
});

export const logout = () => async (dispatch, getState) => {
  dispatch(loggingOut(true));

  // const { firebaselogout } = useContext(AuthContext);

  await userService.logout(getState).then((res) => {
    // firebaselogout();
    dispatch(loggedOut());
  }).catch((err) => {
    dispatch(errorLogOut('Error logging out.'));
  }).finally(() => {
    dispatch(loggingOut(false));
  });
};
