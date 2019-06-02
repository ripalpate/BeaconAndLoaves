import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';

import './Profile.scss';

class Profile extends React.Component {
  state = {
    currentUser: {
      userPayments: [],
      properties: [],
    },
  }

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
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

    const makeDropdowns = () => {
      if (currentUser.isOwner === true) {
        return (
          <div>
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
        );
      }
      return (<div>
           <span>Payment Accounts:
              <select className="custom-select mb-2">
              <option defaultValue>Select Payment Account</option>
                {
                currentUser.userPayments.map((account, i) => (<option key={i}>{account.accountName}</option>))
                }
              </select>
            </span>
          </div>);
    };

    const makeButtons = () => {
      if (currentUser.isOwner === true) {
        return (
          <div>
          <button id='renting' type="button" className="btn renter-history-btn btn-success m-5" onClick={this.changeView}>
            See My Renting History
          </button>
          <button id='rental' type="button" className="btn rental-history-btn btn-success m-5" onClick={this.changeView}>
            See My Renting History
          </button>
          </div>
        );
      }
      return (<div>
            <button id='renting' type="button" className="btn renter-history-btn btn-success m-5" onClick={this.changeView}>
              See My Renting History
            </button>
          </div>);
    };

    return (
      <div className="profileDiv d-flex mx-auto">
        <div className="card" id="profile">
          <h3 className="text-center">{currentUser.name}</h3>
          <div className="ml-1">Email: {currentUser.email}</div>
          <div className="ml-1">Street: {currentUser.street}</div>
          <div className="ml-1">City: {currentUser.city}</div>
          <div className="ml-1">State: {currentUser.state}</div>
          <div className="ml-1">Zipcode: {currentUser.zipcode}</div>
          <div className="ml-1">Phone Number: {currentUser.phonenumber}</div>
          <div className="ml-1">
            {makeDropdowns()}
          </div>
          <div className="ml-1">
            {makeButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
