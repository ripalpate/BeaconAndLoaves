import React from 'react';
import PropTypes from 'prop-types';
import paymentMethodRequests from '../../helpers/data/paymentMethodRequests';
import formatDate from '../../helpers/formatDate';

import './PaymentMethodForm.scss';

const defaultPaymentMethod = {
  accountName: '',
  userId: 0,
  paymentTypeId: 0,
  accountNumber: '',
  expirationDate: '',
  cvv: '',
  isActive: '',
};

class PaymentMethodForm extends React.Component {
  static propTypes = {
    isEditingAccount: PropTypes.bool,
  }

  state = {
    newPaymentMethod: defaultPaymentMethod,
    paymentTypes: [],
    selectedPaymentType: '',
    formattedDate: '',
  }

  paymentTypes = () => {
    paymentMethodRequests.getAllPaymentTypes()
      .then((paymentTypes) => {
        this.setState({ paymentTypes });
      });
  }

  formFieldStringState = (accountName, e) => {
    e.preventDefault();
    const tempPaymentMethod = { ...this.state.newPaymentMethod };
    tempPaymentMethod[accountName] = e.target.value;
    this.setState({ newPaymentMethod: tempPaymentMethod });
  }

  formFieldDateState = (accountName, e) => {
    e.preventDefault();
    let tempExpirationDate = this.state.formattedDate;
    tempExpirationDate = e.target.value;
    this.setState({ formattedDate: tempExpirationDate });
  }

  formFieldNumberState = (name, e) => {
    const tempPaymentMethod = { ...this.state.newPaymentMethod };
    tempPaymentMethod[name] = e.target.value;
    this.setState({ newPaymentMethod: tempPaymentMethod });
  }

  accountNameChange = e => this.formFieldStringState('accountName', e);

  paymentTypeIdChange = e => this.formFieldNumberState('paymentTypeId', e);

  accountNumberChange = e => this.formFieldStringState('accountNumber', e);

  expirationDateChange = e => this.formFieldDateState('expirationDate', e);

  CVVChange = e => this.formFieldStringState('cvv', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { isEditingAccount, isRegistering } = this.props;
    const myPaymentMethod = { ...this.state.newPaymentMethod };
    myPaymentMethod.expirationDate = this.state.formattedDate;
    if (isEditingAccount === false) {
      myPaymentMethod.isActive = true;
      myPaymentMethod.userId = this.props.currentUser.id;
      this.setState({ newPaymentMethod: defaultPaymentMethod });
      paymentMethodRequests.createUserPayment(myPaymentMethod)
        .then(() => {
          if (isRegistering) {
            this.props.getAllUserPayments();
            this.props.cancelPaymentModalEvent();
          }
          this.props.cancelPaymentModalEvent();
        });
    } else {
      paymentMethodRequests.updateUserPayment(myPaymentMethod.id, myPaymentMethod)
        .then(() => {
          this.props.cancelPaymentModalEvent();
        });
    }
  };

  selectPaymentType = (e) => {
    const myPaymentMethod = { ...this.state.newPaymentMethod };
    myPaymentMethod.paymentTypeId = e.target.value;
    this.setState({ selectedPaymentType: e.target.value });
  }

  componentDidMount(prevProps) {
    this.paymentTypes();
    const { isEditingAccount, paymentAccount } = this.props;
    if (prevProps !== this.props && isEditingAccount) {
      this.setState({
        formattedDate: formatDate.formatMYDate(paymentAccount.expirationDate),
        newPaymentMethod: paymentAccount,
        selectedPaymentType: paymentAccount.paymentTypeId,
      });
    }
  }

  render() {
    const {
      newPaymentMethod,
      paymentTypes,
      selectedPaymentType,
    } = this.state;

    const { isEditingAccount } = this.props;

    const makeButtons = () => {
      if (isEditingAccount === false) {
        return (
          <div className="text-center">
          <button className="bttn-pill paymentMethod-add-btn mx-auto mb-2" title="Submit">
                <i className="fas fa-plus-circle" />
              </button>
          </div>
        );
      }

      return (
        <div className="text-center">
        <button className="bttn-pill edit-payment-submit-btn mx-auto mb-2" title="Submit">
                <i className="far fa-check-square edit-payment-submit-btn" />
              </button>
          </div>
      );
    };

    const makeDropdowns = () => {
      let counter = 0;
      return (
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                <div className="paymentType-label input-group-text">Payment Types:</div>
                </div>
                  <select name="payment" required className="custom-select" value={selectedPaymentType} onChange={(event) => { this.selectPaymentType(event); this.paymentTypeIdChange(event); }}>
                  <option value="">Select Payment Type</option>
                    {
                      paymentTypes.map(paymentType => (<option key={counter++}value={counter}>{paymentType}</option>))
                    }
                  </select>
              </div>
      );
    };

    return (
            <div>
                  <form className="row form-container border border-dark rounded mx-auto" onSubmit={this.formSubmit}>
                  <div className="form col-11 mt-2">
                    <div className="col-auto form-lines p-0">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Account Name</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="accountName"
                        placeholder="My card"
                        value={newPaymentMethod.accountName}
                        onChange={this.accountNameChange}
                        required
                        />
                    </div>
                    </div>
                    <div className="col-auto form-lines p-0">
                        {makeDropdowns()}
                    </div>
                    <div className="col-auto form-lines p-0">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Account Number</div>
                        </div>
                        <input
                        type="text"
                        pattern="[0-9]*"
                        title="Please enter in a 16 digit credit card number."
                        minLength="16"
                        maxLength="16"
                        className="form-control card-js"
                        id="accountNumber"
                        placeholder="987654321"
                        value={newPaymentMethod.accountNumber}
                        onChange={this.accountNumberChange}
                        required
                        />
                    </div>
                    </div>
                    <div className="col-auto form-lines p-0">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Exp Date</div>
                        </div>
                        <input
                        pattern="[0-9]{2}/[0-9]{4}"
                        className="form-control"
                        id="expirationDate"
                        placeholder="MM/YYYY"
                        value={this.state.formattedDate}
                        onChange={this.expirationDateChange}
                        required
                        />
                    </div>
                    </div>
                    <div className="col-auto form-lines p-0">
                     <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">CVV</div>
                        </div>
                        <input
                        type="text"
                        pattern="[0-9]*"
                        title="Please enter in a 3 digit credit card CVV number located on the back of the card."
                        minLength="3"
                        maxLength="3"
                        className="form-control"
                        id="CVV"
                        placeholder="333"
                        value={newPaymentMethod.cvv}
                        onChange={this.CVVChange}
                        required
                        />
                    </div>
                    </div>
                    {makeButtons()}
                </div>
                </form>
            </div>
    );
  }
}

export default PaymentMethodForm;
