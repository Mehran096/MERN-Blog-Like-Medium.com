import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BgImage from './BgImage'
import {Helmet} from "react-helmet";
import { userLoginAction } from '../../store/asyncMethods/AuthMethods';
import toast, { Toaster } from 'react-hot-toast';
 

const Login = () => {
    //useState
    const [state, setstate] = useState({
        email: '',
        password: ''
    })
    //useSelector
    const {loading, loginErrors} = useSelector((state) => state.AuthReducer)
    //handleChange
    const handleChange = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    //useEffect
    useEffect(() => {
        if(loginErrors.length > 0){
            loginErrors.map(error => (
           toast.error(error.msg)
           ))
        } 
   }, [loginErrors])
    //useDispatch
    const dispatch = useDispatch()
    //onSubmit
    const userLoginn = async (e) => {
        e.preventDefault();
        dispatch(userLoginAction(state))
    }
    //return
    return (
         <>
         <Helmet>
                <title>User Login</title>
                <meta
                    name="description"
                    content="User login form"
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
                            <form onSubmit={userLoginn}>
                                <div className="group">
                                    <h3 className="form-heading">Login</h3>
                                </div>
                                 
                                <div className="group">
                                    <input 
                                    type="email"
                                    name="email"
                                    className="group__control" 
                                    placeholder="Enter Email..."
                                    onChange={handleChange}
                                    value={state.email}   
                                    />
                                </div>
                                <div className="group">
                                    <input 
                                    type="password"
                                    name="password"
                                    className="group__control" 
                                    placeholder="Enter Password..."
                                    onChange={handleChange}
                                    value={state.password}   
                                    />
                                </div>
                                <div className="group">
                                    <input 
                                    type="submit"
                                    className="btn btn-default btn-block" 
                                    value={loading ? "..." : "Login"} 
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

export default Login
