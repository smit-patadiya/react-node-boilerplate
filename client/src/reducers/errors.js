import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        case CLEAR_ERRORS:
            return state;
        default: return state;
    }
}