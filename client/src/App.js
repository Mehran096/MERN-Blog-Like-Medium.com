import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import "./main.scss";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {Provider} from "react-redux";
import store from "./store";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./private/PrivateRoute";
import RouteLinks from "./private/RouteLinks";
import Create from "./components/Create";
import NotFound from "./components/NotFound";
import EditPost from "./components/EditPost";
import EditImage from "./components/EditImage";
import UpdateName from "./components/UpdateName";
import ChangePassword from "./components/ChangePassword";
import Details from "./components/Details";
 
 
function App() {
  return (
    <>
    <Provider store={store}>
     <Router>
     <Navbar/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path="/home/:page?" exact component={Home} />
          <PrivateRoute path='/create' exact component={Create} />
          <PrivateRoute path='/dashboard/:page?' exact component={Dashboard} />
          <PrivateRoute path='/edit/:id' exact component={EditPost} />
          <PrivateRoute path='/details/:id' exact component={Details} />
          <PrivateRoute path='/editImage/:id' exact component={EditImage} />
          <PrivateRoute path='/changePassword' exact component={ChangePassword} />
          <PrivateRoute path='/updateName' exact component={UpdateName} />
          <RouteLinks path='/register' exact component={Register} />
          <RouteLinks path='/login' exact component={Login} />
          <Route component={NotFound} />
        </Switch>
     </Router>
     </Provider>
     </>
  );
}

export default App;
