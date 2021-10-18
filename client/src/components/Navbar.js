import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import { LOGOUT } from '../store/types/UserTypes';


const Navbar = () => {
    //useSelector
    const {user} = useSelector(state => state.AuthReducer)
    //useDispatch
    const dispatch = useDispatch()
    //onClick
    const logOut = () => {
        const confirm = window.confirm("Do you really want to Logout")
        if(confirm){
            if(user){
          
                localStorage.removeItem("myToken")
                dispatch({type: LOGOUT })
            } 
        }
   
   }
 
   

    //links
    const Links = user ? (<div className="navbar__right">
    <li>
        <Link to="/create">Create Post</Link>
    </li>
    <li>
        <Link to="/dashboard">{user.name}</Link>
    </li>
    <li>
        <span onClick={logOut}>Logout</span>
    </li>
</div>) : (<div className="navbar__right">
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </div>)

    //return
    return (
        <nav className="navbar"> 
            <div className="container">
                <div className="navbar__row">
                    <div className="navbar__left">
                        <Link to="/"><img src="/images/AVO.jpg" alt="" /></Link>
                    </div>
                     {Links}
                </div>
            </div>
         </nav>
    )
}

export default Navbar
