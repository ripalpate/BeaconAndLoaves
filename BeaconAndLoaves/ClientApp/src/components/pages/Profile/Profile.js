import React from 'react';
import PropTypes from 'prop-types';
import accountShape from '../../../helpers/propz/accountShape';
import userRequests from '../../../helpers/data/userRequests';
import WarningModal from '../../WarningModal/WarningModal';
import paymentMethodRequests from '../../../helpers/data/paymentMethodRequests';
import SinglePaymentMethodModal from '../../SinglePaymentMethodModal/SinglePaymentMethodModal';
import propertiesRequests from '../../../helpers/data/propertiesRequests';

import './Profile.scss';

class Profile extends React.Component {
  profileMounted = false;

  static propTypes = {
    paymentAccount: accountShape,
    currentUser: PropTypes.object,
  }

  state = {
    paymentAccounts: [],
    properties: [],
    isEditing: false,
    isAddingAccount: false,
    isEditingAccount: false,
    isRegistering: false,
    userId: 0,
    selectedAccount: 0,
    selectedProperty: '',
    modal: false,
    paymentModal: false,
    paymentAccount: {},
    editedUser: {},
    isDeletingProfile: false,
  }

  paymentAccount = {
    accountName: '',
    userId: 0,
    paymentTypeId: 0,
    accountNumber: '',
    expirationDate: '',
    cvv: '',
    isActive: '',
  };

  toggleModal = () => {
    const { modal, isDeletingProfile } = this.state;
    this.setState({
      modal: !modal,
      isDeletingProfile: !isDeletingProfile,
    });
  }

  togglePaymentDetailModal = (e) => {
    const { paymentModal } = this.state;
    const dropDown = document.getElementById('account');
    this.setState({
      paymentModal: !paymentModal,
    });
    dropDown.selectedIndex = 0;
  }

  toggleAddPaymentModal = () => {
    const { paymentModal } = this.state;
    this.setState({
      isAddingAccount: true,
      paymentModal: !paymentModal,
    });
  }

  toggleEditPaymentModal = () => {
    this.setState({
      isEditingAccount: true,
    });
  }

  cancelPaymentModal = () => {
    const { paymentModal } = this.state;
    this.setState({
      paymentModal: !paymentModal,
      isAddingAccount: false,
      isEditingAccount: false,
    }, this.getUserPaymentAccounts());
  }

  formFieldStringState = (name, e) => {
    const tempUser = { ...this.props.currentUser };
    tempUser[name] = e.target.value;
    this.setState({ editedUser: tempUser });
  }

  emailChange = e => this.formFieldStringState('email', e);

  nameChange = e => this.formFieldStringState('name', e);

  streetChange = e => this.formFieldStringState('street', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  zipCodeChange = e => this.formFieldStringState('zipCode', e);

  phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

  editProfile = (e) => {
    const { currentUser } = this.props;
    this.setState({ isEditing: true });
    this.setState({ userId: currentUser.id });
  }

  deletePropertiesAssociatedWithOwner = () => {
    const { properties } = this.state;
    const propertyIds = properties.map(prop => prop.id);
    propertyIds.forEach((propertyId) => {
      propertiesRequests.deleteProperty(propertyId)
        .then(() => {
        });
    });
  }

  deleteProfile = (e) => {
    const { currentUser } = this.props;
    userRequests.deleteUser(currentUser.id)
      .then(() => {
        this.deletePropertiesAssociatedWithOwner();
        this.props.history.push('/register');
      });
    this.props.history.push('/register');
  }

  cancel = () => {
    this.setState({ isEditing: false });
  }

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  changeEditView = () => {
    this.props.history.push('/profile');
  }

  getUserPaymentAccounts = () => {
    const { currentUser } = this.props;
    const uid = currentUser.id;
    userRequests.getUserPaymentAccounts(uid)
      .then((paymentAccounts) => {
        this.setState({ paymentAccounts });
      });
  };

  getUserProperties = () => {
    const { currentUser } = this.props;
    const uid = currentUser.id;
    userRequests.getUserProperties(uid)
      .then((properties) => {
        this.setState({ properties });
      });
  };

  dropdownSelect = (e) => {
    if (e.target.id === 'account') {
      const selectedAccount = e.target.value;
      this.setState({ selectedAccount }, this.togglePaymentDetailModal());
    } else if (e.target.id === 'property') {
      const selectedProperty = e.target.value;
      this.setState({ selectedProperty });
      const convertIdtoNumber = parseInt(selectedProperty, 10);
      const getSingleProperty = this.state.properties.find(prop => prop.id === convertIdtoNumber);
      if (getSingleProperty.type === 0) {
        this.props.history.push(`/lightHouses/${selectedProperty}`);
      } else {
        this.props.history.push(`/siloNuclears/${selectedProperty}`);
      }
    }
  }

  paymentView = () => {
    this.props.history.push('/paymentMethod');
  }

  getUserPaymentAccount = (e) => {
    const id = e.target.value;
    paymentMethodRequests.getSingleUserPayment(id)
      .then((paymentAccount) => {
        this.setState({ paymentAccount: paymentAccount.data });
      });
  };

  formSubmit = (e) => {
    e.preventDefault();
    const { editedUser } = this.state;
    const userId = editedUser.id;
    userRequests.updateUser(userId, editedUser)
      .then(() => {
        this.setState({ isEditing: false }, this.props.getUser);
      });
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.profileMounted = !!currentUser.id;
    if (this.profileMounted) {
      this.getUserPaymentAccounts();
      this.getUserProperties();
      this.setState({ editedUser: currentUser });
    }
  }

  componentWillUnmount() {
    this.profileMounted = false;
  }

  render() {
    const {
      isEditing,
      properties,
      paymentAccounts,
      modal,
      paymentModal,
      paymentAccount,
      isAddingAccount,
      isEditingAccount,
      isRegistering,
      editedUser,
      isDeletingProfile,
    } = this.state;

    const {
      currentUser,
    } = this.props;

    const makeProfileCard = () => {
      if (isEditing) {
        return (
              <form className="row edit-form-container border border-dark rounded animated fadeIn" onSubmit={this.formSubmit}>
                <h3 className="mx-auto edit-profile-title">Edit Profile</h3>
                <div className="form col-11 mt-2">
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only profile-form-label">Email</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Email</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="bob@xxx.com"
                        value={editedUser.email}
                        onChange={this.emailChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="name" className="sr-only profile-form-label">Name</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Name</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Sumatra Wet Process Gunung Tujuh"
                        value={editedUser.name}
                        onChange={this.nameChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only profile-form-label">Street</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Street</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="street"
                        placeholder="123 Main St."
                        value={editedUser.street}
                        onChange={this.streetChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only profile-form-label">City</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">City</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Springfield"
                        value={editedUser.city}
                        onChange={this.cityChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only profile-form-label">State</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">State</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="TN"
                        value={editedUser.state}
                        onChange={this.stateChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only profile-form-label">Zip Code</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Zip Code</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        placeholder="12345-6789"
                        pattern="[0-9]{5}(?:-[0-9]{4})?"
                        value={editedUser.zipCode}
                        onChange={this.zipCodeChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only profile-form-label">Phone Number</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Phone Number</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        placeholder="615-333-4444"
                        pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
                        value={editedUser.phoneNumber}
                        onChange={this.phoneNumberChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="bttn-pill user-add-btn m-2" title="Submit">
                      <i className="user-add-btn far fa-check-square fa-1x"/>
                    </button>
                    <button id='cancel' type="button" className="bttn-pill back-btn m-2" onClick={this.cancel} title="Cancel">
                      <i className="back-btn far fa-window-close fa-1x"/>
                    </button>
                  </div>
                </div>
              </form>
        );
      }
      return (
        <div className="profile-card border border-dark rounded animated fadeIn" id={currentUser.id}>
          <h3 className="text-center profile-header">{currentUser.name}</h3>
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
            <p>Payment Accounts:
              <select id="account" className="custom-select mb-2 ml-2" onChange={(event) => { this.getUserPaymentAccount(event); this.dropdownSelect(event); }}>
              <option defaultValue>Select Payment Account</option>
                {
                paymentAccounts.map((account, i) => (<option value={account.id} key={i}>{account.accountName}</option>))
                }
              </select>
            </p>
            <p>My Properties:
              <select id="property" className="custom-select mb-2 ml-2" onChange={this.dropdownSelect}>
              <option defaultValue>Select Property</option>
                {
                properties.map((property, i) => (<option value={property.id} key={i}>{property.propertyName}</option>))
                }
              </select>
            </p>
          </div>
        );
      }
      return (<div>
           <p>Payment Accounts:
           <select id="account" className="custom-select mb-2" onChange={(event) => { this.getUserPaymentAccount(event); this.dropdownSelect(event); }}>
              <option defaultValue>Select Payment Account</option>
                {
                paymentAccounts.map((account, i) => (<option id="account" value={account.id} key={i}>{account.accountName}</option>))
                }
              </select>
            </p>
          </div>);
    };

    const makeHistoryButtons = () => {
      if (currentUser.isOwner === true) {
        return (
          <div>
            <button id='rentingHistory' type="button" className="bttn-pill mb-3 renter-history-btn ml-2 mr-2" onClick={this.changeView}>
             View Trips
            </button>
            <button id='viewRentals' type="button" className="bttn-pill renter-history-btn ml-2 " onClick={this.changeView}>
             View Rentals
            </button>
            <button id='profile-edit' type="button" className="bttn-pill profile-edit-btn ml-2" onClick={this.editProfile} title="Edit Profile">
              <i className="far fa-edit fa-1x"/>
            </button>
            <button type="button" className="bttn-pill payment-add-btn ml-2" onClick={this.toggleAddPaymentModal} title="Add Payment Account">
                <i className="far fa-credit-card fa-1x"></i>
            </button>
            <button id='profile-delte' type="button" className="bttn-pill profile-delete-btn ml-2 mr-2" onClick={this.toggleModal} title="Delete Profile">
              <i className="profile-delete-btn fas fa-trash fa-1x"></i>
            </button>
          </div>
        );
      }
      return (
        <div>
            <button id='rentingHistory' type="button" className="bttn-pill renter-history-btn ml-2 mr-2" onClick={this.changeView}>
              View Trips
            </button>
            <button id='profile-edit' type="button" className="bttn-pill profile-edit-btn ml-2" onClick={this.editProfile} title="Edit Profile">
              <i className="far fa-edit fa-1x"/>
            </button>
            <button type="button" className="bttn-pill payment-add-btn ml-2" onClick={this.toggleAddPaymentModal} title="Add Payment Account">
                <i className="far fa-credit-card fa-1x"></i>
            </button>
            <button id='profile-delete' type="button" className="bttn-pill profile-delete-btn ml-2 mr-2" onClick={this.toggleModal} title="Delete Profile">
              <i className="profile-delete-btn fas fa-trash fa-1x"></i>
            </button>
        </div>
      );
    };

    return (
      <div>
      <div>
        <WarningModal
        isEditing={isEditing}
        modal={modal}
        toggleModal={this.toggleModal}
        deleteProfile={this.deleteProfile}
        isDeletingProfile={isDeletingProfile}
         />
      </div>
      <div>
      <SinglePaymentMethodModal
      paymentModal={paymentModal}
      paymentAccount={paymentAccount}
      changeEditView={this.changeEditView}
      isAddingAccount={isAddingAccount}
      isEditingAccount={isEditingAccount}
      isRegistering={isRegistering}
      cancelPaymentModal={this.cancelPaymentModal}
      toggleEditPaymentModal={this.toggleEditPaymentModal}
      currentUser={currentUser}
      getUserPaymentAccounts={this.getUserPaymentAccounts}
      />
      </div>
      <div className="profileDiv d-flex mx-auto">
        {makeProfileCard()}
      </div>
      </div>

    );
  }
}

export default Profile;
