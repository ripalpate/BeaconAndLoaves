import React from 'react';
import PropTypes from 'prop-types';
import paymentMethodRequests from '../../../helpers/data/paymentMethodRequests';
import authRequests from '../../../helpers/data/authRequests';

const defaultPaymentMethod = {
    accountName: '',
    userId: 1,
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
        selectedPaymentType: ''
      }

      paymentTypes = () => {
        paymentMethodRequests.getAllPaymentTypes()
        .then((paymentTypes) => {
          this.setState({paymentTypes})
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
        this.setState({ newPaymentMethod: defaultPaymentMethod });
        // console.log(myPaymentMethod)
        paymentMethodRequests.createUserPayment(myPaymentMethod)
        .then(() => {
            this.props.history.push('/home');
        })
      };

      selectPaymentType = (e) => {
        this.setState({selectedPaymentType: e.target.value})
        console.log(e.target.value)
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
                  <select className="custom-select mb-2" onChange={this.selectPaymentType}>
                  <option defaultValue>Select Payment Type</option>
                    {
                      paymentTypes.map((paymentType) => (<option key={counter++}value={counter}>{paymentType}</option>))
                    }
                  </select>
                </span>
              </div>
            );
                  }

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
                        value={newPaymentMethod.CVV}
                        onChange={this.CVVChange}
                        />
                    </div>
                    </div>
                </div>
                <button type="submit" className="btn paymentMethod-add-btn btn-success my-auto mx-auto" onClick={this.formSubmit}>
                    <i className="fas fa-plus-circle" />
                </button>
                </form>
            </div>
        );
    }
}

export default PaymentMethod;