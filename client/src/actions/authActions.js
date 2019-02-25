import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// jwt-decode module is used to decode the user data from auth token
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER, CLEAR_CURRENT_USER } from './types';

/**
 * Register User: registerUser()
 * Note this is being exported as registerUser const in App.js
 * @param userData
 * @param history
 * @return {function(*)}
 */
export const registerUser = (userData, history) => dispatch => {

    axios.post('/api/user/register', userData)
        .then((res) => {

            dispatch({ type: CLEAR_ERRORS });
            window.location.href = '/';
        })
        .catch((err) => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

// Login - Get User Token. This is loginUser() Action
export const loginUser = (userData) => dispatch => {

    axios.post('/api/user/login', userData)
        .then((result) => {
            
			/**
			 * Once you get the response , save the data received from result.data to localStorage
			 * We are using object destructuring here, below code is equivalent to const token = result.data.token
			 */
            const { token } = result.data;

            // Store token in localStorage
            localStorage.setItem('jwtToken', token);

            // Set token to Auth Header using a custom function setAuthToken
            setAuthToken(token);

            // Use jwt-decode to decode the auth token and get the user data from it( install jwt-decode in clients dir )
            const decoded = jwt_decode(token);
            
            
            dispatch(setCurrentUser(decoded));


        })
        .catch((err) => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

// Login - Get User Token. This is loginUser() Action
export const loginCustomer = (userData) => dispatch => {

    axios.post('/api/customer/login', userData)
        .then((result) => {

			/**
			 * Once you get the response , save the data received from result.data to localStorage
			 * We are using object destructuring here, below code is equivalent to const token = result.data.token
			 */
            const token = result.data;

            // Store token in localStorage
            localStorage.setItem('jwtToken', token);

            // Set token to Auth Header using a custom function setAuthToken
            setAuthToken(token);

            // Use jwt-decode to decode the auth token and get the user data from it( install jwt-decode in clients dir )
            const decoded = jwt_decode(token);
            
            dispatch(setCurrentUser(decoded));
            
            
        })
        .catch((err) => {

            if( err.response ){
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            }
            
            
            
    });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

// Log User Out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');

    // When we pass the token value as false, setAuthToken() removes the Authorization token from the header of http request because user is logged out,
    setAuthToken(false);

    // Set the current user to an empty object, which will set the isAuthenticated state of redux store to false.
    dispatch(setCurrentUser({}));
};

// Clear Current Profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_USER
	}
};



