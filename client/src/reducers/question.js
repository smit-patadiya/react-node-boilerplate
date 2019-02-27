import {
    GET_QUESTIONS,
    SET_QUESTIONS_LOADING,
    SET_ADD_NEW_QUESTIONS_LOADING,
    DELETE_QUESTIONS,
    ADD_QUESTIONS
} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    data: [],
    loading: false,
    addNewLoading: false,
    isAddNewAction: false,
};

export default function (state = initialState, action) {

    switch (action.type) {
        case SET_QUESTIONS_LOADING:
            return {
                ...state,
                loading: true,
            }
        case SET_ADD_NEW_QUESTIONS_LOADING:
            return {
                ...state,
                addNewLoading: true,
            }
        case GET_QUESTIONS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            }
        case DELETE_QUESTIONS:
            return {
                ...state,
                data: state.data.filter(data => data._id !== action.payload)
            }
        case ADD_QUESTIONS:
            return {
                ...state,
                addNewLoading: false,
                data: action.payload,
                isAddNewAction: true,
            }
        default: return state;
    }
}
