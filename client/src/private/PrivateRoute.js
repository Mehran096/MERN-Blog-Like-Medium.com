import React from 'react'
import {Route, Redirect} from "react-router-dom";
import { useSelector } from 'react-redux'

const PrivateRoute = (props) => {
    //useSelector
    const { user } = useSelector((state) => state.AuthReducer)
    //return
    return (
         user ? ( <Route path={props.path} exact={props.exact} component={props.component} /> ) : ( <Redirect to='/login' /> )
    )
}

export default PrivateRoute
