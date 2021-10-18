import { CLOSE_LOADER, COMMENTS, CREATE_ERRORS, POST_REQUEST, POST_RESET, REDIRECT_FALSE, REDIRECT_TRUE, REMOVE_ERRORS, REMOVE_MESSAGE, RESET_IMAGE_ERROR, RESET_UPDATE_ERRORS, SET_DETAILS, SET_LOADER, SET_MESSAGE, SET_POST, SET_POSTS, SET_UPDATE_ERRORS, UPDATE_IMAGE_ERROR } from "../types/PostTypes";

const initstate = {
    loading: false,
    redirect: false,
    postErrors: [],
    message: '',
    posts: [],
    count: 0,
    perPage: 0,
    post: {},
    postRequest: false,
    updateErrors: [],
    updateImageErrors: [],
    deleteMessage: '',
    postDetails: {},
    comments: []

}

export const PostReducer = (state=initstate, action) => {
    const {type, payload} = action;
    if(type === SET_LOADER){
        return {...state, loading: true}
    }else if(type === CLOSE_LOADER){
        return {...state, loading: false}
    }else if(type === CREATE_ERRORS){
        return {...state, postErrors: payload}
    }else if(type === REMOVE_ERRORS){
        return {...state, postErrors: []}
    }else if(type === SET_MESSAGE){
        return {...state, message: payload}
    }else if(type === REMOVE_MESSAGE){
        return {...state, message: ''}
    }else if(type === REDIRECT_TRUE){
        return {...state, redirect: true}
    }else if(type === REDIRECT_FALSE){
        return {...state, redirect: false}
    }else if(type === SET_DETAILS){
        return {...state, postDetails: payload}
    }else if(type === COMMENTS){
        return{...state, comments: payload}
    }
    else{
        return state;
    }
    
}
//get posts
export const fetchPostReducers = (state = initstate, action) => {
    const {type, payload} = action
    if(type === SET_POSTS){
        return {...state, posts: payload.response, count: payload.count, perPage: payload.limitPages}
    }else{
        return state
    }
}

//get post
export const fetchPostReducer = (state = initstate, action) => {
    const {type, payload} = action
    if(type === SET_POST){
        return {...state, post: payload}
    }else if(type === POST_REQUEST){
        return {...state, postRequest: true}
    }else if( type === POST_RESET){
        return {...state, postRequest: false}
    }
    else{
        return state;
    }
}

//update post reducer
export const updatePostReducers = (state = initstate, action) => {
    const {type, payload} = action
    if (type === SET_UPDATE_ERRORS){
        return {...state, updateErrors: payload}
    }else if(type === RESET_UPDATE_ERRORS){
        return {...state, updateErrors: []}

    }else{
        return state
    }
}


//update Image reducer
export const updateImageReducer = (state = initstate, action) => {
    const {type, payload} = action
    if(type === UPDATE_IMAGE_ERROR){
        return {...state, updateImageErrors: payload}
    }else if(type === RESET_IMAGE_ERROR){
        return {...state, updateImageErrors: []}
    }else{
        return state;
    }
}

//DELETE POST REDUCER
export const deletePostReducer = (state = initstate, action) => {
    const {type, payload} = action
    if(type === 'SET_DELETE_MESSAGE'){
        return {...state, deleteMessage: payload}
    }else if(type === 'RESET-DELETE-MESSAGE'){
        return {...state, deleteMessage: ''}
    }
    else{
        return state;
    }
}

 