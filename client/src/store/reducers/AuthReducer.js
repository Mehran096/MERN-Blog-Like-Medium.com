import { CLOSE_LOADER, LOGIN_ERRORS, LOGOUT, REGISTER_ERRORS, SET_LOADER, SET_TOKEN } from "../types/UserTypes";
import jwt_decode from 'jwt-decode';

const initState = {
    loading: false,
    registerErrors: [],
    loginErrors: [],
    token: '',
    user: ''

}

//verify token
const verifyToken = (token) => {
    const decodeToken = jwt_decode(token);
    const expiresIn = new Date(decodeToken * 1000);
    if(new Date() > expiresIn){
        localStorage.removeItem('myToken');
        return null;
    }else{
        return decodeToken;
    }
}
//get token
const token = localStorage.getItem('myToken')
if(token){
     const decoded = verifyToken(token);
     if(decoded){
        initState.token = token;
        const {user} = decoded
        initState.user = user
     }
    
}

const AuthReducer = (state = initState,  action) => {
    const {type, payload} = action;
    if(type === SET_LOADER){
        return {...state, loading: true}
    }else if(type === CLOSE_LOADER){
        return {...state, loading: false}
    }else if(type === REGISTER_ERRORS){
        return {...state, registerErrors: payload}
    }else if(type === SET_TOKEN){
            const decoded = verifyToken(payload);
            const {user} = decoded;
        return{...state, token: payload, user: user, registerErrors: [], loginErrors: []}
    }else if(type === LOGIN_ERRORS){
        return{...state, loginErrors: payload}
    }else if(type === LOGOUT){
        return {...state, token: '', user: ''}
    }
    else{
        return state;
    }
    
}

export default AuthReducer;