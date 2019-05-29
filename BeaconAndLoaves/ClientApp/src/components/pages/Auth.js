import React from 'react';
import authRequests from '../../helpers/data/authRequests';

class Auth extends React.Component {

    authenticateUser = (e) => {
      e.preventDefault();
      authRequests.authenticate()
        .then(() => {
          const uid = authRequests.getCurrentUid();
          // const users = 
          this.props.history.push('/home');
        })
        .catch(error => console.error('there was a problem with auth', error));
    }

    render() {
        return (
          <div className="Auth mx-auto">
            <div className="btn-container mt-5">
              <button className="bttn-pill bttn-lg bttn-danger" onClick={this.authenticateUser}>
                <i className="fab fa-google"></i> Sign In w/Google
              </button>
            </div>
          </div>
        );
    }
}

export default Auth;
