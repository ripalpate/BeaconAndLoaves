import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';

class Profile extends React.Component {
  state = {
    paymentAccounts: [],
    currentUser: {
      userPayments: [],
      properties: [],
    },
    accountId: '',
  }

  getUser = () => {
    const uid = authRequests.getCurrentUid();
    userRequests.getSingleUser(uid)
      .then((currentUser) => {
        this.setState({ currentUser: currentUser.data });
      });
  };

  setSelect = (selectedAccount) => {
    this.setState({ accountId: selectedAccount });
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { currentUser } = this.state;

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
          <span>Payment Accounts:
            <select className="custom-select mb-2">
            <option defaultValue>Select Payment Account</option>
              {
              currentUser.userPayments.map((account, i) => (<option key={i}>{account.accountName}</option>))
              }
            </select>
          </span>
          <span>My Properties:
            <select className="custom-select mb-2">
            <option defaultValue>Select Property</option>
              {
              currentUser.properties.map((property, i) => (<option key={i}>{property.propertyName}</option>))
              }
            </select>
          </span>
        </div>
      </div>
    );
  }
}

export default Profile;
