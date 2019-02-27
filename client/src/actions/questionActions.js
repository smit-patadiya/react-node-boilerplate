import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import jwt_decode from 'jwt-decode';
import {
    CLEAR_ERRORS,
    GET_QUESTIONS,
    SET_QUESTIONS_LOADING,
    SET_ADD_NEW_QUESTIONS_LOADING,
    DELETE_QUESTIONS,
    ADD_QUESTIONS
} from './types';

export const getQuestionsByQuizId = ( quizId ) => dispatch => {
    dispatch(setLoading());
    axios
        .get('/api/dataLiteracy/fetch-questions-by-quiz-id/' + quizId)
        .then(res =>
            dispatch({
                type: GET_QUESTIONS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_QUESTIONS,
                payload: null
            })
        );
}


export const addQuestion = (data) => dispatch => {
    dispatch(setAddNewLoading());
    axios
        .post( '/api/dataLiteracy/add-question', data )
        .then( res =>
            dispatch({
                type: ADD_QUESTIONS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: ADD_QUESTIONS,
                payload: null
            })
        );
};



// Set loading state
export const setLoading = () => {
    return {
        type: SET_QUESTIONS_LOADING
    };
};

// Set Add new loading state
export const setAddNewLoading = () => {
    return {
        type: SET_ADD_NEW_QUESTIONS_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};