import axios from "axios";
import { CLOSE_LOADER, LOGIN_ERRORS, REGISTER_ERRORS, SET_LOADER, SET_TOKEN } from "../types/UserTypes";

export const userRegister = (state) => {
     return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            dispatch({type: SET_LOADER})
            const {data} = await axios.post('/register', state, config)
            dispatch({type: CLOSE_LOADER})
            localStorage.setItem('myToken', data.token)
            dispatch({type: SET_TOKEN, payload: data.token})
            console.log(data)
           
        } catch (error) {
            dispatch({type: CLOSE_LOADER})
            dispatch({type: REGISTER_ERRORS, payload: error.response.data.errors})
            console.log(error.response)
        }
     }
}

///login action
export const userLoginAction = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'content-type': 'application/json' 
            },
        };
        try {
            dispatch({type: SET_LOADER})
            const {data} = await axios.post('/login', state, config);
            dispatch({type: CLOSE_LOADER})
            localStorage.setItem('myToken', data.token);
            dispatch({type: SET_TOKEN, payload: data.token})
        } catch (error) {
            dispatch({type: CLOSE_LOADER})
            dispatch({type: LOGIN_ERRORS, payload: error.response.data.errors});
            console.log(error.response)
        }
    }
}