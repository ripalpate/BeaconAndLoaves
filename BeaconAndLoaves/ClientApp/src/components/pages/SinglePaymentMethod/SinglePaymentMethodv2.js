import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';
import paymentMethodRequests from '../../../helpers/data/paymentMethodRequests';

import './Profile.scss';


class SinglePaymentMethodScreen extends React.Component {

  state = {
    currentUser: {},
    currentPaymentMethod: {},
    paymentTypes: [],
    isEditing: false,
    userId: 0,
  }

  formFieldStringState = (accountName, e) => {
    const tempPaymentMethod = { ...this.state.currentPaymentMethod };
    tempPaymentMethod[accountName] = e.target.value;
    this.setState({ currentPaymentMethod: tempPaymentMethod });
  }

  accountNameChange = e => this.formFieldStringState('accountName', e);
    
  paymentTypeIdChange = e => this.formFieldNumberState('paymentTypeId', e);

  accountNumberChange = e => this.formFieldStringState('accountNumber', e);

  expirationDateChange = e => this.formFieldStringState('expirationDate', e);

  CVVChange = e => this.formFieldStringState('CVV', e);

  formSubmit = (e) => {
    e.preventDefault();
    const myPaymentMethod = { ...this.state.newPaymentMethod };
    myPaymentMethod.isActive = true;
    myPaymentMethod.userId = this.state.currentUser.id;
    myPaymentMethod.paymentTypeId = this.state.selectedPaymentType*1;
    this.setState({ newPaymentMethod: defaultPaymentMethod });
    paymentMethodRequests.createUserPayment(myPaymentMethod)
    .then(() => {
        this.props.history.push('/home');
    })
  };

  selectPaymentType = (e) => {
    this.setState({selectedPaymentType: e.target.value})
  }

  editPaymentMethod = (e) => {
    const { currentPaymentMethod } = this.state;
    this.setState({ isEditing: true });
    this.setState({ userId: currentUser.id });
  }

  cancel = () => {
    this.setState({ isEditing: false });
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
        this.getUserPaymentAccounts();
        this.getUserProperties();
      });
  };

  getUserPaymentAccounts = () => {
    const { currentUser } = this.state;
    const uid = currentUser.id;
    userRequests.getUserPaymentAccounts(uid)
      .then((paymentAccounts) => {
        this.setState({ paymentAccounts });
      });
  };

  formSubmit = (e) => {
    e.preventDefault();
    const { currentPaymentMethod } = this.state;
    const userId = currentUser.id;
    paymentMethodRequests.updateUserPayment(userId, currentPaymentMethod)
      .then(() => {
        this.setState({ isEditing: false });
      });
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const {
      currentUser,
      currentPaymentMethod,
      isEditing,
      paymentTypes,
    } = this.state;

    const makePaymentMethodCard = () => {
      if (isEditing) {
        return (
              <form className="row edit-form-container border border-dark rounded" onSubmit={this.formSubmit}>
                <h3 className="mx-auto edit-paymentMethod-title">Edit Payment Method</h3>
                <div className="form col-11 mt-2">
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">Account Name</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Account Name</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="accountName"
                        placeholder="My Card"
                        value={currentPaymentMethod.accountName}
                        onChange={this.accountNameChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Name</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Sumatra Wet Process Gunung Tujuh"
                        value={currentUser.name}
                        onChange={this.nameChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">Street</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Street</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="street"
                        placeholder="123 Main St."
                        value={currentUser.street}
                        onChange={this.streetChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">City</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">City</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Springfield"
                        value={currentUser.city}
                        onChange={this.cityChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">State</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">State</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="TN"
                        value={currentUser.state}
                        onChange={this.stateChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">Zip Code</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Zip Code</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        placeholder="12345"
                        value={currentUser.zipCode}
                        onChange={this.zipCodeChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">Phone Number</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Phone Number</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        placeholder="615-333-4444"
                        value={currentUser.phoneNumber}
                        onChange={this.phoneNumberChange}
                        />
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn user-add-btn m-5" onClick={this.formSubmit}>
                      <i className="fas fa-check-square fa-2x"/>
                    </button>
                    <button id='cancel' type="button" className="btn back-btn m-5" onClick={this.cancel}>
                      <i className="far fa-window-close fa-2x"/>
                    </button>                    
                  </div>
                </div>
              </form>
        );
      }
      return (
        <div className="paymentMethod-card border border-dark rounded" id={currentUser.id}>
          <h3 className="text-center">{currentUser.name}</h3>
          <div className="ml-1">Email: {currentUser.email}</div>
          <div className="ml-1">Street: {currentUser.street}</div>
          <div className="ml-1">City: {currentUser.city}</div>
          <div className="ml-1">State: {currentUser.state}</div>
          <div className="ml-1">Zipcode: {currentUser.zipCode}</div>
          <div className="ml-1">Phone Number: {currentUser.phoneNumber}</div>
          <div className="ml-1">
            {makeDropdowns()}
          </div>
          <div className="text-center">
            {makeHistoryButtons()}
          </div>
        </div>
      );
    };

    const makeDropdowns = () => {
      if (currentUser.isOwner === true) {
        return (
          <div>
            <span>Payment Accounts:
              <select id="account" className="custom-select mb-2" onChange={this.dropdownSelect}>
              <option defaultValue>Select Payment Account</option>
                {
                paymentAccounts.map((account, i) => (<option value={account.id} key={i}>{account.accountName}</option>))
                }
              </select>
            </span>
            <span>My Properties:
              <select className="custom-select mb-2" id="property" onChange={this.dropdownSelect}>
              <option defaultValue>Select Property</option>
                {
                properties.map((property, i) => (<option value={property.id} key={i}>{property.propertyName}</option>))
                }
              </select>
            </span>
          </div>
        );
      }
      return (<div>
           <span>Payment Accounts:
              <select className="custom-select mb-2" id="account" onChange={this.dropdownSelect}>
              <option defaultValue>Select Payment Account</option>
                {
                paymentAccounts.map((account, i) => (<option id="account" value={account.id} key={i}>{account.accountName}</option>))
                }
              </select>
            </span>
          </div>);
    };

    const makeHistoryButtons = () => {
      if (currentUser.isOwner === true) {
        return (
          <div>
            <button id='renting' type="button" className="btn renter-history-btn btn-outline-dark m-1" onClick={this.changeView}>
              See My Renting History
            </button>
            <button id='rental' type="button" className="btn renter-history-btn btn-outline-dark m-1" onClick={this.changeView}>
              See My Rentals' History
            </button>
            <button id='profile-edit' type="button" className="btn profile-edit-btn m-1" onClick={this.editProfile}>
              <i className="far fa-edit fa-2x"/>
            </button>
            <button type="button" className="btn payment-add-btn m-1" onClick={this.paymentView}>
                <i class="far fa-credit-card fa-2x"></i>
            </button>
          </div>
        );
      }
      return (
        <div>
            <button id='renting' type="button" className="btn renter-history-btn btn-outline-dark m-1" onClick={this.changeView}>
              See My Renting History
            </button>
            <button id='profile-edit' type="button" className="btn profile-edit-btn m-1" onClick={this.editProfile}>
              <i className="far fa-edit fa-2x"/>
            </button>
            <button type="button" className="btn payment-add-btn m-1" onClick={this.paymentView}>
                <i class="far fa-credit-card fa-2x"></i>
            </button>
        </div>
      );
    };

    return (
      <div className="paymentMethodDiv d-flex mx-auto">
        {makeProfileCard()}
      </div>
    );
  }
}

export default Profile;
