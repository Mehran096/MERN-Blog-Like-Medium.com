import axios from 'axios'
import { 
    CLOSE_LOADER, 
    CREATE_ERRORS, 
    REDIRECT_TRUE, 
    REMOVE_ERRORS, 
    SET_LOADER, 
    SET_MESSAGE, 
    SET_POSTS, 
    SET_POST, 
    POST_REQUEST, 
    SET_UPDATE_ERRORS, 
    RESET_UPDATE_ERRORS, 
    UPDATE_IMAGE_ERROR,
    RESET_IMAGE_ERROR, 
    SET_DETAILS,
    COMMENTS
} from '../types/PostTypes'

//const token = localStorage.getItem('myToken')
export const postMethod = (state) => {
    return async (dispatch, getState) => {
        const {AuthReducer: {token}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

         try {
             dispatch({type: SET_LOADER})
             const {data:{msg}} = await axios.post('/post_create', state, config)
             dispatch({type: CLOSE_LOADER})
             dispatch({type: REDIRECT_TRUE})
             dispatch({type: REMOVE_ERRORS})
             dispatch({type: SET_MESSAGE, payload: msg})
             //dispatch({type: REMOVE_MESSAGE})
             //dispatch({type: REDIRECT_FALSE})
              
             
         } catch (error) {
             const {errors} = error.response.data
             dispatch({type: CLOSE_LOADER})
             console.log(errors)
             dispatch({type: CREATE_ERRORS, payload: errors})
             dispatch({type: REMOVE_ERRORS})
         }
    }

}
//get posts action
export const fetchPosts =  (id, page) => {
        return async (dispatch, getState) => {
            const {AuthReducer:{token}} = getState()
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                dispatch({type: SET_LOADER})
                const {data:{response, count, limitPages}} = await axios.get(`/posts/${id}/${page}`, config)
                 
                dispatch({type: CLOSE_LOADER})
                dispatch({type: SET_POSTS, payload: {response, count, limitPages}})
                // console.log(response)
            } catch (error) {
                dispatch({type: CLOSE_LOADER})
            }
        }
}

//get single post action
export const fetchPost = (id) => {
    return async (dispatch, getState) => {
        const {AuthReducer: {token}} = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }

        try {
            dispatch({type: SET_LOADER})
            const {data:{singlePost}} = await axios.get(`/post/${id}`, config)
            dispatch({type: CLOSE_LOADER})
            dispatch({type: SET_POST, payload: singlePost })
            dispatch({type: POST_REQUEST})
        } catch (error) {
            dispatch({type: CLOSE_LOADER})
            console.log(error)
        }
    }
}

//update post
export const updatePostAction = (state) => {
        return async (dispatch, getState) => {
            const {AuthReducer: {token}} = getState()
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                dispatch({type: SET_LOADER})
                const {data:{msg}} = await axios.post('/updatePost', state, config)
                dispatch({type: CLOSE_LOADER})
                dispatch({type: REDIRECT_TRUE})
                dispatch({type: SET_MESSAGE, payload: msg})
                console.log(msg)
            } catch (error) {
                dispatch({type: CLOSE_LOADER})
                dispatch({type: SET_UPDATE_ERRORS, payload: error.response.data.errors})
                dispatch({type: RESET_UPDATE_ERRORS})
            }
        }
}

//update Image action
export const updateImageAction = (state) => {
        return async (dispatch, getState) => {
                const{AuthReducer:{token}} = getState()
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                try {
                    dispatch({type: SET_LOADER})
                    const {data: {msg}} = await axios.post('/updateImage', state, config)
                    dispatch({type: CLOSE_LOADER})
                    console.log(msg)
                    dispatch({type: REDIRECT_TRUE})
                    dispatch({type: SET_MESSAGE, payload: msg })
                } catch (error) {
                    const {errors} = error.response.data
                    dispatch({type: CLOSE_LOADER})
                    dispatch({type: UPDATE_IMAGE_ERROR, payload: errors})
                    dispatch({type: RESET_IMAGE_ERROR})
                }
        }
}

//home post action
export const homePost = (page) => {
	return async (dispatch) => {
		dispatch({ type: SET_LOADER });
		try {
			const {
				data: { response, count, limitPages },
			} = await axios.get(`/home/${page}`);
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: SET_POSTS, payload: { response, count, limitPages } });
		} catch (error) {
			dispatch({ type: CLOSE_LOADER });
			console.log(error);
		}
	};
};

//home post single action
export const homeDetailsAction = (id) => {
    return async (dispatch) => {
        try {
            dispatch({type: SET_LOADER})
            const {data:{post, comments}} = await axios.get(`/explore/${id}`)
            console.log(post)
            dispatch({type: SET_DETAILS, payload: post})
            dispatch({type: COMMENTS, payload: comments})
            dispatch({type: CLOSE_LOADER})
        } catch (error) {
            dispatch({type: CLOSE_LOADER})
            console.log(error)
        }
    }
}

//comment create action
export const postComment = (commentData) => {
    return async (dispatch, getState) => {
        const {AuthReducer: {token}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }    
        }
        try {
            dispatch({type: SET_LOADER})
            const {data:{msg}} = await axios.post('/comment', commentData, config)
             
            dispatch({type: CLOSE_LOADER})
            dispatch({type: SET_MESSAGE, payload: msg})
             
        } catch (error) {
            dispatch({type: CLOSE_LOADER})
            console.log(error)
        }
    }
}