import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';

class Profile extends React.Component {
  state = {
    paymentAccounts: [],
    currentUser: [],
  }

  // getUserPayments = (id) => {
  //   userRequests.getSingleUserPayment(id)
  //     .then((paymentAccounts) => {
  //       this.setState({ paymentAccounts });
  //     });
  // }

  getUser = () => {
    const uid = authRequests.getCurrentUid();
    userRequests.getSingleUser(uid)
      .then((currentUser) => {
        this.setState({ currentUser: currentUser.data })
          // .then(() => {
          //   const id = currentUser.Id;
          //   console.log(id);
          //   this.getUserPayments(id);
          // });
      });
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { currentUser, paymentAccounts } = this.state;

    console.log(currentUser.userPayments);

    return (
      <div className="profileDiv d-flex align-center">
        <div id="profile">
          <h3>{currentUser.name}</h3>
          <div>{currentUser.email}</div>
          <div>{currentUser.street}</div>
          <div>{currentUser.city}</div>
          <div>{currentUser.state}</div>
          <div>{currentUser.zipcode}</div>
          <div>{currentUser.phonenumber}</div>
          <select className="custom-select mb-2">
              <option defaultValue>Payment Accounts</option>
              {/* {paymentDropdownItems} */}
          </select>
        </div>
      </div>
    );
  }
}

export default Profile;
