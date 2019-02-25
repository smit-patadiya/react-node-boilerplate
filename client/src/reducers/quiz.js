import {
    GET_QUIZ, SET_QUIZ_LOADING, DELETE_QUIZ, ADD_QUIZ, SET_ADD_NEW_QUIZ_LOADING } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    data: [],
    loading: false,
    addNewLoading: false,
    isAddNewAction: false,
};

export default function (state = initialState, action) {

    switch (action.type) {
        case SET_QUIZ_LOADING:
            return {
                ...state,
                loading: true,
            }
        case SET_ADD_NEW_QUIZ_LOADING:
            return {
                ...state,
                addNewLoading: true,
            }
        case GET_QUIZ: 
            return {
                ...state,
                loading: false,
                data: action.payload,
            }
        case DELETE_QUIZ:
            return {
                ...state,
                data: state.data.filter(data => data._id !== action.payload)
            }
        case ADD_QUIZ:
            return {
                ...state,
                addNewLoading: false,
                data: action.payload,
                isAddNewAction: true,
            }
        default: return state;
    }
}
