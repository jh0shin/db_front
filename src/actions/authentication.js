import axios from 'axios';
import {
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE
} from './ActionTypes';

// Register
export function registerRequest(id, password, name, address, gender, phone, birth, role) {
    return (dispatch) => {
        // Register API starting
        dispatch(register());

        return axios.post(
            'http://localhost:3000/api/register/', {
                'userid': id,
                'password': password,
                'name': name,
                'address': address,
                'gender': gender,
                'phone': phone,
                'birth': birth,
                'role': role
        }).then((response) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            console.log(error);
            dispatch(registerFailure(error.response.data.code));
        });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}