import React from 'react';
import PropTypes from 'prop-types';
import paymentMethodRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';

const defaultPaymentMethod = {
    accountName: '',
    paymentType: '',
    accountNumber: '',
    isActive: ''
  };

class PaymentMethodBTC extends React.Component {
    state = {
        newPaymentMethod : defaultPaymentMethod
      }

      formFieldStringState = (accountName, e) => {
        e.preventDefault();
        const tempPaymentMethod = { ...this.state.newPaymentMethod };
        tempPaymentMethod[accountName] = e.target.value;
        this.setState({ newPaymentMethod: tempPaymentMethod });
      }
    
      accountNameChange = e => this.formFieldStringState('accountName', e);
    
      paymentTypeChange = e => this.formFieldStringState('paymentType', e);
    
      accountNumberChange = e => this.formFieldStringState('accountNumber', e);
    
      formSubmit = (e) => {
        e.preventDefault();
        const myPaymentMethod = { ...this.state.newPaymentMethod };
        myPaymentMethod.isActive = true;
        this.setState({ newPaymentMethod: defaultPaymentMethod });
        paymentMethodRequests.createUserPayment(myPaymentMethod)
        .then(() => {
            this.props.history.push('/home');
        })
      };
  

      componentDidMount() {
        
      }
 
    render() {
        const {
          newPaymentMethod,
        } = this.state;

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
                        placeholder="My BTC Account Name"
                        value={newPaymentMethod.accountName}
                        onChange={this.accountNameChange}
                        />
                    </div>
                    </div>
                    <div className="col-auto form-lines p-0">
                    <label htmlFor="paymentType" className="sr-only">Payment Type</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Payment Type</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="paymentType"
                        placeholder="Bitcoin"
                        value={newPaymentMethod.paymentType}
                        onChange={this.paymentTypeChange}
                        />
                    </div>
                    </div>
                    <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">Bitcoin Address</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Bitcoin Address</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="accountNumber"
                        placeholder="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                        value={newPaymentMethod.accountNumber}
                        onChange={this.accountNumberChange}
                        />
                    </div>
                    </div>                    
                </div>
                <button type="submit" className="btn bean-add-btn btn-success my-auto mx-auto" onClick={this.formSubmit}>
                    <i className="fas fa-plus-circle" />
                </button>
                </form>
            </div>
        );
    }
}

export default PaymentMethodBTC;