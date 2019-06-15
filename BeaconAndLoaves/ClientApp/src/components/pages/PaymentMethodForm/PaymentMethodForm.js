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
        this.setState({ paymentTypes });
        this.getUser();
      });
  }

  formFieldStringState = (accountName, e) => {
    e.preventDefault();
    const tempPaymentMethod = { ...this.state.newPaymentMethod };
    tempPaymentMethod[accountName] = e.target.value;
    this.setState({ newPaymentMethod: tempPaymentMethod });
  }

  formFieldNumberState = (name, e) => {
    const tempPaymentMethod = { ...this.state.newPaymentMethod };
    tempPaymentMethod[name] = e.target.value;
    this.setState({ newPaymentMethod: tempPaymentMethod });
  }

  accountNameChange = e => this.formFieldStringState('accountName', e);

  paymentTypeIdChange = e => this.formFieldNumberState('paymentTypeId', e);

  accountNumberChange = e => this.formFieldStringState('accountNumber', e);

  expirationDateChange = e => this.formFieldStringState('expirationDate', e);

  CVVChange = e => this.formFieldNumberState('cvv', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { isEditingAccount } = this.props;
    const myPaymentMethod = { ...this.state.newPaymentMethod };
    if (isEditingAccount === false) {
      myPaymentMethod.isActive = true;
      myPaymentMethod.userId = this.state.currentUser.id;
      this.setState({ newPaymentMethod: defaultPaymentMethod });
      paymentMethodRequests.createUserPayment(myPaymentMethod)
        .then(() => {
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

    const { isEditingAccount, formatDate } = this.props;

    const makeButtons = () => {
      if (isEditingAccount === false) {
        return (
          <div>
              <button className="btn paymentMethod-add-btn btn-success my-auto mx-auto">
                <i className="fas fa-plus-circle" />
              </button>
          </div>
        );
      }

      return (
          <div>
              <button className="btn paymentMethod-add-btn btn-success my-auto mx-auto">
                <i className="fas fa-check-square" />
              </button>
          </div>
      );
    };

    const makeDropdowns = () => {
      const counter = 0;
      return (
              <div>
                <span>Payment Types:
                  <select name="payment" required className="custom-select mb-2" value={selectedPaymentType} onChange={(event) => { this.selectPaymentType(event); this.paymentTypeIdChange(event); }}>
                  <option value="">Select Payment Type</option>
                    {
                      paymentTypes.map(paymentType => (<option key={counter + 1}value={counter}>{paymentType}</option>))
                    }
                  </select>
                </span>
              </div>
      );
    };

    const makeExpDate = () => {
      if (isEditingAccount === true) {
        return formatDate(newPaymentMethod.expirationDate);
      }
      return newPaymentMethod.expirationDate;
    };

    return (
            <div>
                <form className="row form-container border border-dark rounded mt-5 mx-auto" onSubmit={this.formSubmit}>
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
                    <label htmlFor="link" className="sr-only">Account Number</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Account Number</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="accountNumber"
                        placeholder="987654321"
                        value={newPaymentMethod.accountNumber}
                        onChange={this.accountNumberChange}
                        required
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
                        id="expirationDate"
                        placeholder="12/11/2023"
                        value={newPaymentMethod.expirationDate}
                        onChange={this.expirationDateChange}
                        required
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
                        placeholder="333"
                        value={newPaymentMethod.cvv}
                        onChange={this.CVVChange}
                        required
                        />
                    </div>
                    </div>
                </div>
                  {makeButtons()}
                </form>
            </div>
    );
  }
}

export default PaymentMethodForm;
