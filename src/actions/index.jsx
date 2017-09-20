import axios from 'axios';
import { browserHistory } from 'react-router';
import * as Cookies from "js-cookie";
import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER,
         PROTECTED_TEST } from './types';

const API_URL = 'http://localhost:3000/api';

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  console.log(error)

  // if(error.data.error) {
  //   errorMessage = error.data.error;
  // } else if (error.data){
  //   errorMessage = error.data;
  // } else {
  //   errorMessage = error;
  // }
  //
  // if(error.status === 401) {
  //   dispatch({
  //     type: type,
  //     payload: 'You are not authorized to do this. Please login and try again.'
  //   });
  //   logoutUser();
  // } else {
  //   dispatch({
  //     type: type,
  //     payload: errorMessage
  //   });
  // }
}

export function loginUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/login`, { email, password })
    .then(response => {
      Cookies.set('token', response.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = CLIENT_ROOT_URL + '/dashboard';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
    }
  }

export function registerUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth`, {
      email,
      password,
      password_confirmation: password
    })
    .then(response => {
      console.log(response)
      Cookies.set('access-token', response.headers['access-token'], { path: '/' });
      Cookies.set('client', response.headers['client'], { path: '/' });
      Cookies.set('uid', response.headers['uid'], { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = CLIENT_ROOT_URL + '/dashboard';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response.data.errors, AUTH_ERROR)
    });
  }
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    Cookies.remove('token', { path: '/' });

    window.location.href = CLIENT_ROOT_URL + '/login';
  }
}

export function protectedTest() {
  return function(dispatch) {
    axios.get(`${API_URL}/todos`, {
      headers: {
        'access-token': Cookies.get('access-token'),
        'client': Cookies.get('client'),
        'uid': Cookies.get('uid')
      }
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}
