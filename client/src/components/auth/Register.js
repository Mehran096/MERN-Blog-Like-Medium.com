import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BgImage from './BgImage'
import {Helmet} from "react-helmet";
import { userRegister } from '../../store/asyncMethods/AuthMethods';
import toast, { Toaster } from 'react-hot-toast';
 
 

const Regsiter = () => {
    //useState
    const [state, setstate] = useState({
        name: '',
        email: '',
        password: ''
    })
    //handleChange
    const handleChange = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    //useSelector
    const {loading, registerErrors} = useSelector((state) => state.AuthReducer)
    //useDispatch
    const dispatch = useDispatch();
    //useEffect
    useEffect(() => {
        if(registerErrors.length > 0){
           registerErrors.map(error => (
           toast.error(error.msg)
           ))
        }  
   }, [registerErrors])
    //onSubmit
    const submitUser = (e) => {
        e.preventDefault();
        dispatch(userRegister(state));
        
    }

    //return
    return (
         <>
         <Helmet>
                <title>User Registration</title>
                <meta
                    name="description"
                    content="User registration form"
                />
            </Helmet>  
            <div className="row mt-80">
                <div className="col-8">
                    <BgImage/>
                    <Toaster 
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            fontSize: "14px"
                        }
                    }}
                />
                </div>
                <div className="col-4">
                    <div className="account">
                        <div className="account__section">
                            <form onSubmit={submitUser}>
                                <div className="group">
                                    <h3 className="form-heading">Register</h3>
                                </div>
                                <div className="group">
                                    <input 
                                    type="text"
                                    name="name"
                                    className="group__control" 
                                    placeholder="Enter Name..."
                                    value={state.name}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="group">
                                    <input 
                                    type="email"
                                    name="email"
                                    className="group__control" 
                                    placeholder="Enter Email..."
                                    value={state.email}
                                    onChange={handleChange}   
                                    />
                                </div>
                                <div className="group">
                                    <input 
                                    type="password"
                                    name="password"
                                    className="group__control" 
                                    placeholder="Enter Password..."
                                    value={state.password}
                                    onChange={handleChange}   
                                    />
                                </div>
                                <div className="group">
                                    <input 
                                    type="submit"
                                    className="btn btn-default btn-block" 
                                    value={loading ? '...' : 'Register'} 
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         </>
    )
}

export default Regsiter
