import axios from 'axios'
import { CLOSE_LOADER, REDIRECT_TRUE, SET_LOADER, SET_MESSAGE } from '../types/PostTypes'
import { RESET_PROFILE_ERRORS, SET_PROFILE_ERRORS } from '../types/ProfileTypes'
import { SET_TOKEN } from '../types/UserTypes'
 

export const updateNameAction = (state) => {
    return async (dispatch, getState) => {
        const {AuthReducer:{token}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            dispatch({type: SET_LOADER})
            const {data:{msg, token}} = await axios.post('/updateName', state, config)
            dispatch({type: CLOSE_LOADER})
            localStorage.setItem('myToken', token)
            dispatch({type: REDIRECT_TRUE})
            dispatch({type: SET_TOKEN, payload: token})
            dispatch({type: SET_MESSAGE, payload: msg })
        } catch (error) {
            const {errors} = error.response.data
            dispatch({type: CLOSE_LOADER})
            dispatch({type: SET_PROFILE_ERRORS, payload: errors})
            dispatch({type: RESET_PROFILE_ERRORS})
            console.log(errors)
        }
    }
}
//change password action
export const updatePasswordAction = (state) => {
    return async (dispatch, getState) => {
        const {AuthReducer:{token}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            dispatch({type: CLOSE_LOADER})
            const {data:{msg}} = await axios.post('/updatePassword', state, config)
            dispatch({type: CLOSE_LOADER})
            dispatch({type: REDIRECT_TRUE})
            dispatch({type: SET_MESSAGE, payload: msg})
        } catch (error) {
            dispatch({type: CLOSE_LOADER})
            dispatch({type: SET_PROFILE_ERRORS, payload: error.response.data.errors})
            dispatch({type: RESET_PROFILE_ERRORS})
            console.log(error.response.data.errors)
        }
    }
}

