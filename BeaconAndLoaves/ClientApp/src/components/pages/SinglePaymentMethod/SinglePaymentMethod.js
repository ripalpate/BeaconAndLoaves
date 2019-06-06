import React from 'react';
import PropTypes from 'prop-types';
import paymentMethodRequests from '../../../helpers/data/paymentMethodRequests';
import authRequests from '../../../helpers/data/authRequests';
import userRequests from '../../../helpers/data/userRequests';

const defaultPaymentMethod = {
    accountName: '',
    userId: 0,
    paymentTypeId: 0,
    accountNumber: '',
    expirationDate: '',
    CVV: '',
    isActive: ''
  };

class PaymentMethod extends React.Component {
    state = {
        newPaymentMethod : defaultPaymentMethod,
        paymentTypes: [],
        selectedPaymentType: '',
        currentUser: {},
      }

      getUser = () => {
        const uid = authRequests.getCurrentUid();
        userRequests.getSingleUser(uid)
          .then((currentUser) => {
            this.setState({ currentUser: currentUser.data });
          });
      };

      paymentTypes = () => {
        paymentMethodRequests.getAllPaymentTypes()
        .then((paymentTypes) => {
          this.setState({paymentTypes});
          this.getUser();
        })
      }

      formFieldStringState = (accountName, e) => {
        e.preventDefault();
        const tempPaymentMethod = { ...this.state.newPaymentMethod };
        tempPaymentMethod[accountName] = e.target.value;
        this.setState({ newPaymentMethod: tempPaymentMethod });
      }

      formFieldNumberState = (name, e) => {
        const tempPaymentMethod = { ...this.state.newPaymentMethod };
        tempPaymentMethod[name] = e.target.value * 1;
        this.setState({ newPaymentMethod: tempPaymentMethod });
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
  

      componentDidMount() {
        this.paymentTypes();        
      }
 
    render() {
        const {
          newPaymentMethod,
          paymentTypes
        } = this.state;

        const makeDropdowns = () => {
          let counter = 0;
            return (
              <div>
                <span>Payment Types:
                  <select name="payment" required className="custom-select mb-2" onChange={this.selectPaymentType}>
                  <option value="">Select Payment Type</option>
                    {
                      paymentTypes.map((paymentType) => (<option key={counter++}value={counter}>{paymentType}</option>))
                    }
                  </select>
                </span>
              </div>
            );
                  }

                  return (
                    <form className="row edit-form-container border border-dark rounded" onSubmit={this.formSubmit}>
                      <h3 className="mx-auto edit-profile-title">Edit Profile</h3>
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
                              value={currentUser.email}
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
}

export default PaymentMethod;