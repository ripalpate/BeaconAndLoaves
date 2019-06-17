import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Auth from '../components/pages/Auth/Auth';
import Register from '../components/pages/Register/Register';
import Home from '../components/pages/Home/Home';
import Profile from '../components/pages/Profile/Profile';
import Properties from '../components/pages/Properties/Properties';
import LightHouses from '../components/pages/LightHouses/LightHouses';
import SiloNuclears from '../components/pages/SiloNuclears/SiloNuclears';
import LightHouseDetail from '../components/pages/LightHouseDetail/LightHouseDetail';
import SiloNuclearDetail from '../components/pages/SiloNuclearDetail/SiloNuclearDetail';
import AddEditProperty from '../components/pages/AddEditProperty/AddEditProperty';
import EditProperty from '../components/pages/EditProperty/EditProperty';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import LikedProperties from '../components/pages/LikedProperties/LikedProperties';
import Rental from '../components/pages/Rental/Rental';
import authRequests from '../helpers/data/authRequests';
import userRequests from '../helpers/data/userRequests';
import connection from '../helpers/data/connection';
import OwnerProperties from '../components/pages/OwnerProperties/OwnerProperties';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } {...rest} />)
    : (<Redirect to={{ pathname: '/register', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

export default class App extends Component {
  state = {
    authed: false,
    pendingUser: true,
    isRegistered: false,
    currentUser: {},
  }

  // setIsRegistered = () => {
  //   this.setState({ isRegistered: true });
  // }

  getUser = () => {
    const uid = authRequests.getCurrentUid();
    userRequests.getSingleUser(uid)
      .then((currentUser) => {
        if (currentUser.data.isActive === true) { this.setState({ currentUser: currentUser.data, isRegistered: true }); }
      });
  };

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        }, this.getUser());
        authRequests.getCurrentUserJwt();
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const {
      authed,
      pendingUser,
      currentUser,
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={ authed } currentUser={currentUser} logoutClickEvent={logoutClickEvent} />
                <Switch>
                  <PublicRoute path='/auth'
                    component={Auth}
                    authed={ authed }
                  />
                  <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                  <PrivateRoute path='/register' exact component={props => <Register getUser={this.getUser} isRegistered={this.state.isRegistered} {...props} />} authed={this.state.authed} />
                  <PrivateRoute path="/home" component={Home} authed={this.state.authed}/>
                  <PrivateRoute exact path="/profile" component={Profile} authed={this.state.authed}/>
                  <PrivateRoute exact path="/properties" component={Properties} authed={this.state.authed}/>
                  <PrivateRoute path="/properties/lightHouses" component={LightHouses} authed={this.state.authed}/>
                  <PrivateRoute exact path="/lightHouses/:id" authed={this.state.authed} component={LightHouseDetail}/>
                  <PrivateRoute path="/properties/siloNuclears" component={SiloNuclears} authed={this.state.authed}/>
                  <PrivateRoute exact path="/siloNuclears/:id" authed={this.state.authed} component={SiloNuclearDetail}/>
                  <PrivateRoute path="/likedProperties" authed={this.state.authed} component={LikedProperties}/>
                  <PrivateRoute path="/addProperty" authed={this.state.authed} component={AddEditProperty}/>
                  <PrivateRoute path="/editProperty/:id" authed={this.state.authed} component={EditProperty}/>
                  <PrivateRoute exact path="/rental/:id" authed={this.state.authed} component={Rental}/>
                  <PrivateRoute exact path="/ownerProperties/:id" component={OwnerProperties} authed={this.state.authed}/>
                </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}
