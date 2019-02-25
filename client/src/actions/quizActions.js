import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import jwt_decode from 'jwt-decode';
import { GET_ERRORS, CLEAR_ERRORS, GET_QUIZ, SET_QUIZ_LOADING, DELETE_QUIZ, ADD_QUIZ, SET_ADD_NEW_QUIZ_LOADING } from './types';


export const getAllQuiz = () => dispatch => {
    dispatch(setLoading());
    axios
        .get('/api/dataLiteracy/fetch-all-quiz')
        .then(res =>
            dispatch({
                type: GET_QUIZ,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_QUIZ,
                payload: null
            })
        );
};

export const getSingleQuizById = ( quizId ) => dispatch => {
    dispatch(setLoading());
    axios
        .get('/api/dataLiteracy/fetch-single-quiz-by-id/' + quizId )
        .then(res =>
            dispatch({
                type: ADD_QUIZ,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_QUIZ,
                payload: null
            })
        );
};

export const getSingleQuizByShortname = (shortname) => dispatch => {
    dispatch(setLoading());
    axios
        .get('/api/dataLiteracy/fetch-single-quiz-by-shortname' + shortname)
        .then(res =>
            dispatch({
                type: GET_QUIZ,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_QUIZ,
                payload: null
            })
        );
};

export const addQuiz = ( data ) => dispatch => {
    dispatch(setAddNewLoading());
    axios
        .post('/api/dataLiteracy/add-quiz', data)
        .then(res =>
            dispatch({
                type: ADD_QUIZ,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_QUIZ,
                payload: null
            })
        );
};




// Set loading state
export const setLoading = () => {
    return {
        type: SET_QUIZ_LOADING
    };
};

// Set Add new loading state
export const setAddNewLoading = () => {
    return {
        type: SET_ADD_NEW_QUIZ_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};