import React from 'react';
import PropTypes from 'prop-types';
import SinglePaymentMethodModal from '../SinglePaymentMethodModal/SinglePaymentMethodModal';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';

import './Register.scss';

const defaultUser = {
  email: '',
  firebaseId: '',
  name: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  phoneNumber: '',
};

class Register extends React.Component {
  static propTypes = {
    getUser: PropTypes.func,
  }

  state = {
    users: [],
    currentUser: [],
    newUser: defaultUser,
    paymentModal: false,
    isAddingAccount: true,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempUser = { ...this.state.newUser };
    tempUser[name] = e.target.value;
    this.setState({ newUser: tempUser });
  }

  emailChange = e => this.formFieldStringState('email', e);

  nameChange = e => this.formFieldStringState('name', e);

  streetChange = e => this.formFieldStringState('street', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  zipCodeChange = e => this.formFieldStringState('zipCode', e);

  phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

  formSubmit = (e) => {
    e.preventDefault();
    const myUser = { ...this.state.newUser };
    myUser.isActive = true;
    myUser.isOwner = false;
    myUser.firebaseId = authRequests.getCurrentUid();
    this.setState({ newUser: defaultUser });
    userRequests.createUser(myUser)
      .then(() => {
        this.props.getUser();
      });
  };

  toggleAddPaymentModal = (e) => {
    e.preventDefault();
    const { paymentModal } = this.state;
    this.setState({
      paymentModal: !paymentModal,
    });
  }

  cancelPaymentModal = () => {
    const { paymentModal } = this.state;
    this.setState({
      paymentModal: !paymentModal,
    });
  }

  getUsers = () => {
    userRequests.getAllUsers()
      .then((users) => {
        this.setState({ users });
      })
      .then(() => {
        this.checkRegistration();
      });
  };

  checkRegistration = () => {
    const { isRegistered } = this.props;
    if (isRegistered) {
      this.props.history.push('/home');
    }
  }

  componentDidMount() {
    this.checkRegistration();
  }

  render() {
    const {
      newUser,
      paymentModal,
      isAddingAccount,
    } = this.state;

    return (
          <div className="reg-container d-flex">
              <form className="row form-container border border-dark rounded mt-5 mx-auto" onSubmit={this.toggleAddPaymentModal}>
                <h3 className="reg-title mx-auto">Please Register:</h3>
                <div className="form col-11 mt-2">
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">Email</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Email</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="bob@xxx.com"
                        value={newUser.email}
                        onChange={this.emailChange}
                        required
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
                        placeholder="First Last"
                        value={newUser.name}
                        onChange={this.nameChange}
                        required
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
                        value={newUser.street}
                        onChange={this.streetChange}
                        required
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
                        value={newUser.city}
                        onChange={this.cityChange}
                        required
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
                        value={newUser.state}
                        onChange={this.stateChange}
                        required
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
                        value={newUser.zipCode}
                        onChange={this.zipCodeChange}
                        required
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
                        value={newUser.phoneNumber}
                        onChange={this.phoneNumberChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="btn user-add-btn btn-success my-auto mx-auto">
                      <i className="fas fa-plus-circle" />
                    </button>
                  </div>
                </div>
              </form>
              <SinglePaymentMethodModal
                paymentModal={paymentModal}
                isAddingAccount={isAddingAccount}
                formSubmit={this.formSubmit}
              />
            </div>
    );
  }
}

export default Register;
