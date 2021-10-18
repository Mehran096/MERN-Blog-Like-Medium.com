import { RESET_PROFILE_ERRORS, SET_PROFILE_ERRORS } from "../types/ProfileTypes"

const initState = {
    profileErrors: []
}

export const ProfileUpdateReducer = (state = initState, action) => {
    const {type, payload} = action
    if(type === SET_PROFILE_ERRORS){
        return {...state, profileErrors: payload}
    }else if(type === RESET_PROFILE_ERRORS){
        return {...state, profileErrors: []}
    }else{
        return state
    }
}