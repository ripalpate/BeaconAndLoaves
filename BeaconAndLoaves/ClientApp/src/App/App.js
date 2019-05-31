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
import Home from '../components/pages/Home/Home';
import Profile from '../components/pages/Profile/Profile';
import Properties from '../components/pages/Properties/Properties';
import LightHouses from '../components/pages/LightHouses/LightHouses';
import SiloNuclears from '../components/pages/SiloNuclears/SiloNuclears';
import MyNavbar from '../components/MyNavbar';
import authRequests from '../helpers/data/authRequests';
import connection from '../helpers/data/connection';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } {...rest} />)
    : (<Redirect to={{ pathname: '/properties', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

export default class App extends Component {
  displayName = App.name

  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
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
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false});
    };

    if (pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={ authed } logoutClickEvent={logoutClickEvent} />
                <Switch>
                  <PublicRoute path='/auth'
                    component={Auth}
                    authed={ authed }
                  />
                  <PrivateRoute path='/' exact component={Auth} authed={this.state.authed} />
                  <PrivateRoute path="/home" component={Home} authed={this.state.authed}/>
                  <PrivateRoute exact path="/profile" component={Profile} authed={this.state.authed}/>
                  <PrivateRoute exact path="/properties" component={Properties} authed={this.state.authed}/>
                  <PrivateRoute path="/properties/lightHouses"  component={LightHouses} authed={this.state.authed}/>
                  <PrivateRoute path="/properties/siloNuclears"  component={SiloNuclears} authed={this.state.authed}/>
                </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}
