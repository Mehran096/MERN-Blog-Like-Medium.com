import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { fetchPost } from '../store/asyncMethods/PostMethods';
import toast, { Toaster } from 'react-hot-toast';
import { useParams, useHistory} from 'react-router-dom';
import {Helmet} from 'react-helmet'
import Loader from './Loader';
import { POST_RESET } from '../store/types/PostTypes';
import { updatePostAction } from '../store/asyncMethods/PostMethods';

const EditPost = () => {
    //react quill value
    const [value, setValue] = useState('');
    //state
    const [state, setState] = useState({
        title: '',
        description: ''
    })
    //useHistory
    const {push} = useHistory()
    //useSElector
    const {loading, redirect} = useSelector(state => state.PostReducer);
    const {post, postRequest} = useSelector(state => state.fetchPostReducer)
    const {updateErrors} = useSelector(state => state.updatePostReducers)
    //useParams
    const {id} = useParams()
    const dispatch = useDispatch()
    //useEffect for fetchpost
    useEffect(() => {
        if(postRequest){
            setState({
                title: post.title,
                description: post.description
            })
            setValue(post.body)
            dispatch({type: POST_RESET})
        }else{
            dispatch(fetchPost(id))
        }
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post])
     //useEffect for update errors
   useEffect(() => {
    if(updateErrors.length !== 0){
        updateErrors.map((err) => toast.error(err.msg));
         //dispatch({type: RESET_UPDATE_ERRORS})
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [updateErrors])
useEffect(() => {
    if(redirect){
        push('/dashboard');
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [redirect])

    //onSumbit
    const updatePost = (e) => {
            e.preventDefault();
            dispatch(updatePostAction({
                title: state.title,
                body: value,
                description: state.description,
                id: post._id,
            }))
    }
    return (
        !loading ? <div className="mt-100">
        <Helmet>
                <title>User Edit</title>
                <meta
                    name='description'
                    content='User Edit'
                 />
        </Helmet>
        <Toaster 
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            fontSize: "14px"
                        }
                    }}
                />
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="card">
                    <h3 className="card__h3">Edit Post</h3>
                    <form onSubmit={updatePost}>
                        <div className="group">
                            <label htmlFor="title">Post Title</label>
                            <input 
                            type="text" 
                            name="title"
                            value={state.title} 
                            onChange={(e) => setState({...state, title: e.target.value})}
                            id="title" 
                            className="group__control" 
                            placeholder="Post title"
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="body">
                            Post body
                            </label>
                            <ReactQuill theme="snow" id="body" placeholder="Post Body..." value={value} onChange={setValue}/>
                           
                        </div>
                        <div className="group">
                            <label htmlFor="description">Meta Description</label>
                            <textarea 
                            name="description" 
                            id="description" 
                            cols="30" 
                            rows="10" 
                            defaultValue={state.description}
                            onChange={(e) => setState({...state, description: e.target.value})}
                            onKeyUp={(e) => setState({...state, description: e.target.value})}
                            className="group__control"
                            placeholder="meta description..."
                            maxLength="150"
                            ></textarea>
                            <p className="length">{state.description ? state.description.length : 0}</p>
                        </div>
                        <div className="group">
                            <input type="submit" value="Edit"  className="btn btn-default btn-block" />
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
         </div> : <Loader/>
    )
}

export default EditPost
