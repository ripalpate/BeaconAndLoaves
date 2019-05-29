import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Auth from './components/pages/Auth';
import MyNavbar from './components/MyNavbar';
import authRequests from './helpers/data/authRequests';
import connection from './helpers/data/connection';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } {...rest} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

export default class App extends Component {
  displayName = App.name

  state = {
    authed: false,
    pendingUser: true,
    authBg: true,
  }

  setAuthBg = () => {
    this.setState({ authBg: false });
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
      authBg,
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false, authBg: true });
    };

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={ authed } logoutClickEvent={logoutClickEvent} />
                <Switch>
                  <PublicRoute path='/auth'
                    component={Auth}
                    authed={this.state.authed}
                    authBg={authBg}
                    setAuthBg={this.setAuthBg}
                    />
                </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}
