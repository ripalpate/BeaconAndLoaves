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
            <div className="title-container">
              <p className="text-center">Beacon and Loaves</p>
              <h3 className="text-center">Vacation rentals for lighthouse enthusiasts</h3>
              <h6 className="text-center">***(Expanding soon to nuclear silo rentals)***</h6>
            </div>
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
