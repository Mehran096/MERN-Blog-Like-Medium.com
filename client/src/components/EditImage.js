import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { fetchPost, updateImageAction } from '../store/asyncMethods/PostMethods';
import  toast, { Toaster } from 'react-hot-toast';
import Loader from './Loader';
 
 
 


const EditImage = () => {
    const [state, setstate] = useState({
        image: '',
        imagePreview: '',
        imageName: 'Choose Image'
    })
   
     
    //useParams
    const {id} = useParams();
    //useHistory
    const {push} = useHistory();
    //useDispatch
    const dispatch = useDispatch();
    //useSelector
     const {loading, redirect} = useSelector(state => state.PostReducer);
     const { updateImageErrors } = useSelector(state => state.updateImageReducer)
     const {post} = useSelector(state => state.fetchPostReducer)
    // console.log(post)
    //useEffect for fetching the image
    useEffect(() => {
            dispatch(fetchPost(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

//file handle 
const fileHandle = (e) => {
    if(e.target.files.length !== 0){
         
    
    const reader = new FileReader();
    reader.onloadend = () => {
        setstate({...state, imagePreview: reader.result, image: e.target.files[0], imageName: e.target.files[0].name})
    };
    reader.readAsDataURL(e.target.files[0]);
}
     
}

//useEffect for updateImage Errors
useEffect(() => {
    if(updateImageErrors.length > 0 ){
        updateImageErrors.map((err) => toast.error(err.msg))
    }
}, [updateImageErrors])
//useEffect
useEffect(() => {
    if(redirect){
        push('/dashboard');
    }
//eslint-disable-next-line react-hooks/exhaustive-deps
}, [redirect])

//updateImage Onsubmit
const updateImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id)
    formData.append('image', state.image)
    dispatch(updateImageAction(formData))
}
    //return
    return (
        !loading ? (
            <div className="container mt-100">
        <Helmet>
                <title>Edit Image</title>
                <meta
                    name='description'
                    content='Edit Image Post'
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
        <div className="row mr-minus-15 ml-minus-15">
            <div className="col-6 p-15">
                <div className="card">
                    <h3 className="card__h3">Update Post Image</h3>
                    <form onSubmit= {updateImage}>
                         
                        <div className="group">
                            <label htmlFor="image" className="image__label">{state.imageName}</label>
                            <input 
                            type="file" 
                            name="image"
                            id="image" 
                            onChange={fileHandle}  
                            />
                        </div>
                        <div className="group">
                            <div className="imgPreview">
                                {state.imagePreview ? <img src={state.imagePreview} alt="currentImage"/> : ''}
                            </div>
                        </div>
                        <div className="group">
                            <input type="submit" value="Update Image"  className="btn btn-default btn-block" />
                        </div>
                      
                    </form>
                </div>
            </div>
            <div className="col-6 p-15">
            <div className="group">
                            <div className="imgPreview" key={post._id}>
                                 <img src={`/images/${post.image}`} alt="currentImage"/>  
                            </div>
                        </div>
            </div>
        </div>
        </div>

        ) : (<Loader/>)
    )
}

export default EditImage
