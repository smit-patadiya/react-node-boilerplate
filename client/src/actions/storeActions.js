import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import jwt_decode from 'jwt-decode';
import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_STORE, CLEAR_CURRENT_STORE } from './types';



export const createStore = (userData) => dispatch => {

    axios.post('/api/store/create', userData)
        .then((response) => dispatch({
            type: SET_CURRENT_STORE,
            payload: response.data
        }))
        .catch((err) => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};


export const fetchStore = (userId) => dispatch => {

    axios.get(`/api/store/byuser/${userId}`)
        .then((response) => dispatch({
            type: SET_CURRENT_STORE,
            payload: response.data
        }))
        .catch((err) => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};




