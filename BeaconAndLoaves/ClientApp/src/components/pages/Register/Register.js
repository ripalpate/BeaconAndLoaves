import React from 'react';
import PropTypes from 'prop-types';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';
import userShape from '../../../helpers/propz/userShape';

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
  isOwner: '',
  isActive: '',
};

class Register extends React.Component {
    state = {
      users: [],
      currentUser: [],
      newUser: defaultUser,
    }

    static propTypes = {
      users: PropTypes.arrayOf(userShape.userShape),
      currentUser: userShape.userShape,
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
            this.props.history.push('/home');
          });
      };

      paymentView = () => {
        this.props.history.push('/paymentMethod');
      }

      paymentViewBTC = () => {
        this.props.history.push('/paymentMethodBTC');
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
        const { users } = this.state;
        const uid = authRequests.getCurrentUid();
        const currentUser = users.filter(user => user.firebaseId === uid);
        if (currentUser.length !== 0) {
          this.props.history.push('/home');
        } else {
          this.setState({ currentUser });
        }
      }

      componentDidMount() {
        this.getUsers();
      }

      render() {
        const {
          newUser,
        } = this.state;

        return (
          <div className="reg-container mx-auto">
              <form className="row form-container border border-dark rounded mt-5 mx-auto" onSubmit={this.formSubmit}>
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
                        value={newUser.name}
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
                        value={newUser.street}
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
                        value={newUser.city}
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
                        value={newUser.state}
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
                        value={newUser.zipCode}
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
                        value={newUser.phoneNumber}
                        onChange={this.phoneNumberChange}
                        />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn user-add-btn btn-success my-auto mx-auto" onClick={this.formSubmit}>
                  <i className="fas fa-plus-circle" />
              </button>
              </form>

                <div className="d-flex flex-row">                
                    <button type="button" className="btn payment-add-btn my-auto mx-auto d-flex justify-content-center" onClick={this.paymentView}>
                    <i className="fab fa-cc-visa"></i>
                </button>
                <button type="button" className="btn payment-add-btn my-auto mx-auto d-flex justify-content-center" onClick={this.paymentViewBTC}>
                    <i className="fab fa-bitcoin"></i>
                </button>
                </div>
            </div>
        );
      }
}

export default Register;
