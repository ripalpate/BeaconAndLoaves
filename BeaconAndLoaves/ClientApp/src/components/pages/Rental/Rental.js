import React from 'react';
import DatePicker from 'react-datepicker';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import authRequests from '../../../helpers/data/authRequests';
import userRequests from '../../../helpers/data/userRequests';


import './Rental.scss';
import 'react-datepicker/dist/react-datepicker.css';

class Rental extends React.Component {
    state = {
      startDate: new Date(),
      endDate: new Date(),
      propertyToRent: {},
      paymentAccounts: [],
      currentUser: {},
      paymentAccount: 0,
    }

    handleStartChange = (date) => {
      this.setState({ startDate: date });
    }

    handleEndChange = (date) => {
      this.setState({ endDate: date });
    }

    handlePaymentAccountChange = (e) => {
      const paymentAccount = e.target.value;
      this.setState({ paymentAccount });
    }

    getUserPaymentAccounts = () => {
      const { currentUser } = this.state;
      const uid = currentUser.id;
      userRequests.getUserPaymentAccounts(uid)
        .then((paymentAccounts) => {
          this.setState({ paymentAccounts });
        });
    };

    getUser = () => {
      const uid = authRequests.getCurrentUid();
      userRequests.getSingleUser(uid)
        .then((currentUser) => {
          this.setState({ currentUser: currentUser.data });
          this.getUserPaymentAccounts();
        });
    };

    getPropertyToRent = () => {
      const propertyId = this.props.match.params.id;
      propertiesRequests.getSingleProperty(propertyId)
        .then((property) => {
          this.setState({ propertyToRent: property });
        });
    }

    componentDidMount() {
      this.getPropertyToRent();
      this.getUser();
    }

    render() {
      const { propertyToRent, paymentAccounts } = this.state;

      const makeDropdowns = () => (<div>
             <span>Payment Accounts:
                <select className="custom-select mb-2" id="account" onChange={this.handlePaymentAccountChange}>
                <option defaultValue>Select Payment Account</option>
                  {
                  paymentAccounts.map((account, i) => (<option id="account" value={account.id} key={i}>{account.accountName}</option>))
                  }
                </select>
              </span>
            </div>);

      return (
        <div className="text-center rental-div mx-auto">
            <div className="profile-card border border-dark rounded" id={propertyToRent.id}>
                <h3 className="text-center">{propertyToRent.propertyName}</h3>
                <div className="ml-1">Street: {propertyToRent.street}</div>
                <div className="ml-1">City: {propertyToRent.city}</div>
                <div className="ml-1">State: {propertyToRent.state}</div>
                <div className="ml-1">Zipcode: {propertyToRent.zipCode}</div>
                <div className="ml-1">Rate: ${propertyToRent.price}/Day</div>
                <div id="start">
                    <label>Start Date </label>
                    <DatePicker
                        className="ml-3"
                        selected={this.state.startDate}
                        onChange={this.handleStartChange}
                    />
                </div>
                <div id="end">
                    <label>End Date </label>
                    <DatePicker
                        className="ml-3"
                        selected={this.state.endDate}
                        onChange={this.handleEndChange}
                    />
                </div>
                <div className="ml-1">Total: $</div>
                <div>{makeDropdowns()}</div>
            </div>
        </div>
      );
    }
}

export default Rental;
