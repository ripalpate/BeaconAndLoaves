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
      <div className="profileDiv d-flex align-center">
        <div id="profile">
          <h3>{currentUser.name}</h3>
          <div>{currentUser.email}</div>
          <div>{currentUser.street}</div>
          <div>{currentUser.city}</div>
          <div>{currentUser.state}</div>
          <div>{currentUser.zipcode}</div>
          <div>{currentUser.phonenumber}</div>
          <div>
            {makeDropdowns()}
          </div>
          <div>
            {makeButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
