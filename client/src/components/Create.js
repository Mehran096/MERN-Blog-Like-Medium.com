import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Helmet} from 'react-helmet';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postMethod } from '../store/asyncMethods/PostMethods';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import Loader from './Loader';
 
const Create = () => {
    const [currentImage, setCurrentImage] = useState('Choose Image');
    const [imagePreview, setImagePreview] = useState('');
    const [slug, setSlug] = useState('');
    const [slugButton, setSlugButton] = useState(false);
    //usehistory
    const {push} = useHistory()
    //handleClick for slugButton
    const handleClick = (e) => {
        e.preventDefault();
        setSlug(slug.trim().split(' ').join('-'));
        setSlugButton(false)
        
    }
    //slugHandle for slug
    const slugHandle = (e) => {
        setSlugButton(true)
        setSlug(e.target.value);
    }
    //state
    const [state, setstate] = useState({
        title: '',
        image: '',
        description: ''
    })
    //useSelector
    const {user: {_id, name}} = useSelector(state => state.AuthReducer);
    const {postErrors, redirect, loading } = useSelector(state => state.PostReducer)
    //handleDescription for description
    const handleDescription = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    //fileHandle for image
    const fileHandle = (e) => {
        const file = e.target.files[0].name
    if(e.target.files.length !== 0){
        setCurrentImage(file)
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setstate({
            ...state,
            [e.target.name]: e.target.files[0]
        })
    }
    }
    //handleChange for title
    const handleChange = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
        setSlug(e.target.value.trim().split(' ').join('-'))
    }


    //reactQuill value
    const [value, setValue] = useState('');
    //useDispatch
    const dispatch = useDispatch()
    //useEffect
    useEffect(() => {
       if(postErrors.length > 0){
        postErrors.map((err) => (toast.error(err.msg)))
       }
    },  [postErrors])
    //useEffect for redirect
    useEffect(() => {
        if(redirect){
            push('/dashboard');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [redirect])
    //onsubmit
    const postSubmit = (e) => {
        const {title, description, image} = state;
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', value);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('slug', slug);
        formData.append('name', name);
        formData.append('id', _id);
        dispatch(postMethod(formData))
        
    }
    //return
    return (
        !loading ? <div className="create mt-100">
        <Helmet>
                <title>Create Post</title>
                <meta
                    name='description'
                    content='User Create Post'
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
            <form onSubmit={postSubmit}>
                <div className="row mr-minus-15 ml-minus-15">
                    <div className="col-6 p-15">
                        <div className="card">
                            <h3 className="card__h3">Create a new Post</h3>
                            <div className="group">
                            <label htmlFor="title">Post Title</label>
                            <input 
                            type="text" 
                            name="title"
                            value={state.title}
                            id="title" 
                            onChange={handleChange}
                            className="group__control" 
                            placeholder="Post title..."

                            />
                        </div>
                        <div className="group">
                            <label htmlFor="image" className="image__label">{currentImage}</label>
                            <input 
                            type="file" 
                            name="image"
                            id="image" 
                            onChange={fileHandle}
                            
                                
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
                            onChange={handleDescription}
                            className="group__control"
                            placeholder="meta description..."
                            maxLength="150"
                            ></textarea>
                            <p className="length">{state.description ? state.description.length : 0}</p>
                        </div>


                        </div>
                    </div>
                    <div className="col-6 p-15">
                    <div className="card">
                        <div className="group">
                            <label htmlFor="slug">Post URL</label>
                            <input 
                            type="text" 
                            name="slug"
                            value={slug}
                            onChange={slugHandle}
                            //onBlur={() => setSlug(slug.trim().split(' ').join('-'))}
                            id="slug"
                            className="group__control"
                            placeholder="Post URL..."

                            />
                        </div>
                        <div className="group">
                            {slugButton ? ( <button className="btn btn-default" onClick={handleClick}>Update Slug</button>) : ''}
                        </div>
                        <div className="group">
                            <div className="imgPreview">
                                {imagePreview ? (<img src={imagePreview} alt="currentImage"/>) : ''}
                            </div>
                        </div>
                        
                        <div className="group">
                            <input type="submit" value="Create Post"  className="btn btn-default btn-block" />
                        </div>
                    </div>
                    </div>
                </div>
            </form>
        </div>
            
        </div> : <Loader/>
    )
}

export default Create
