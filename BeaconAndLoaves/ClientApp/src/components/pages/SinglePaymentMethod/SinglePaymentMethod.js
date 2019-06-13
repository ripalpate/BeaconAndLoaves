import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';
import paymentMethodRequests from '../../../helpers/data/paymentMethodRequests';
import PropTypes from 'prop-types';

import './SinglePaymentMethod.scss';

const defaultPaymentMethod = {
  accountName: '',
  userId: 0,
  paymentTypeId: 0,
  accountNumber: '',
  expirationDate: '',
  CVV: '',
  isActive: '',
};

class SinglePaymentMethodScreen extends React.Component {
  state = {
    currentUser: {},
    currentPaymentMethod: {},
    paymentTypes: [],
    userId: 0,
    modal: false,
  }

  toggleModal = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
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
    myPaymentMethod.paymentTypeId = this.state.selectedPaymentType * 1;
    this.setState({ newPaymentMethod: defaultPaymentMethod });
    paymentMethodRequests.createUserPayment(myPaymentMethod)
      .then(() => {
        this.props.history.push('/profile');
      });
  };

  selectPaymentType = (e) => {
    this.setState({ selectedPaymentType: e.target.value });
  }

  getUser = () => {
    const uid = authRequests.getCurrentUid();
    userRequests.getSingleUser(uid)
      .then((currentUser) => {
        this.setState({ currentUser: currentUser.data });
      });
  };

  getUserPaymentAccount = (e) => {
    const id = e.target.value;
    paymentMethodRequests.getSingleUserPayment(id)
      .then((paymentAccount) => {
        this.setState({ paymentAccount });
        console.log(paymentAccount);
      });
  };

  componentDidMount() {
    this.getUser();
    this.getUserPaymentAccounts();
  }

  render() {
    const {
      currentUser,
      currentPaymentMethod,
      paymentTypes,
      paymentAccount,
    } = this.state;

    const makeDropdowns = () => {
      let counter = 0;
      return (
          <div>
            <span>Payment Types:
              <select name="payment" required className="custom-select mb-2" onChange={this.selectPaymentType}>
              <option value="">Select Payment Type</option>
                {
                  paymentTypes.map(paymentType => (<option key={counter++}value={counter}>{paymentType}</option>))
                }
              </select>
            </span>
          </div>
      );
    };

    const makePaymentMethodCard = (currentPaymentMethod) => (
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
                        {makeDropdowns()}
                    </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="name" className="sr-only">Account Number</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Account Number</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="accountNumber"
                        placeholder="9876543212345678"
                        value={currentPaymentMethod.accountNumber}
                        onChange={this.accountNumberChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">Exp Date</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Exp Date</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="expDate"
                        placeholder="12/2020"
                        value={currentPaymentMethod.expirationDate}
                        onChange={this.expirationDateChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">CVV</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">CVV</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="CVV"
                        placeholder="987"
                        value={currentPaymentMethod.CVV}
                        onChange={this.CVVChange}
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

    return (
      <div className="paymentMethodDiv d-flex mx-auto">
        {makePaymentMethodCard()}
      </div>
    );
  }
}

export default SinglePaymentMethodScreen;
