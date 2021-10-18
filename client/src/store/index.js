import {combineReducers, createStore, applyMiddleware} from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';
import AuthReducer from "./reducers/AuthReducer"
import {fetchPostReducers, PostReducer, fetchPostReducer, updatePostReducers, updateImageReducer, deletePostReducer} from "./reducers/PostReducer";
import { ProfileUpdateReducer } from "./reducers/ProfileReducer";
const rootReducers = combineReducers({
        AuthReducer,
        PostReducer,
        fetchPostReducers,
        fetchPostReducer,
        updatePostReducers,
        updateImageReducer,
        deletePostReducer,
        ProfileUpdateReducer
        
})
const middleWares = [thunkMiddleware]
const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middleWares)))

export default store;