import React from 'react';
import authRequests from '../../../helpers/data/authRequests';
import './Auth.scss';


class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate()
      .then(() => {
        this.props.history.push('/register');
      })
      .catch(error => console.error('there was a problem with auth', error));
  }

  render() {
    return (
          <div className="Auth">
            <div className="btn-container">
              <button className="bttn-pill bttn-lg bttn-danger" onClick={this.authenticateUser}>
                <i className="fab fa-google"></i> Sign In w/Google
              </button>
            </div>
          </div>
    );
  }
}

export default Auth;
