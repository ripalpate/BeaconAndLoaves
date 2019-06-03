import React from 'react';

class Profile extends React.Component {
  paymentView = () => {
    this.props.history.push('/paymentMethod');
  }
  render() {
    return (
      <div className="profile">
        <h3>Profile Page</h3>
        <button type="button" className="btn payment-add-btn my-auto mx-auto d-flex justify-content-center" onClick={this.paymentView}>
                    <i className="fab fa-cc-visa"></i>
                </button>
      </div>
    );
  }
}

export default Profile;