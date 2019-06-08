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
      rentalTotal: 0,
      rental: {},
    }

    handleStartChange = (date) => {
      this.setState({ startDate: date });
    }

    handleEndChange = (date) => {
      this.setState({ endDate: date });
      this.figureTotal();
    }

    handlePaymentAccountChange = (e) => {
      const paymentAccount = e.target.value;
      this.setState({ paymentAccount });
    }

    figureTotal = () => {
      const { startDate, endDate, propertyToRent } = this.state;
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const rentalTotal = diffDays * propertyToRent.price;
      this.setState({ rentalTotal });
    }

    rentProperty = (e) => {
      e.preventDefault();
      const {
        rental,
        propertyToRent,
        paymentAccount,
        startDate,
        endDate,
        rentalTotal,
      } = this.state;
      rental.propertyId = propertyToRent.id;
      rental.userPaymentId = paymentAccount;
      rental.startDate = startDate;
      rental.endDate = endDate;
      rental.rentalAmount = rentalTotal;
      console.log(rental);
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
      const { propertyToRent, paymentAccounts, rentalTotal } = this.state;

      const makeDropdowns = () => (<div>
             <span>Payment Accounts:
                <select name="account" className="custom-select mb-2" required id="account" onChange={this.handlePaymentAccountChange}>
                <option defaultValue>Select Payment Account</option>
                  {
                  paymentAccounts.map((account, i) => (<option id="account" value={account.id} key={i}>{account.accountName}</option>))
                  }
                </select>
              </span>
            </div>);

      return (
        <div className="text-center rental-div mx-auto">
            <form className="profile-card border border-dark rounded" id={propertyToRent.id}>
                <h3 className="text-center">{propertyToRent.propertyName}</h3>
                <div className="ml-1">Street: {propertyToRent.street}</div>
                <div className="ml-1">City: {propertyToRent.city}</div>
                <div className="ml-1">State: {propertyToRent.state}</div>
                <div className="ml-1">Zipcode: {propertyToRent.zipCode}</div>
                <div className="ml-1">Rate: ${propertyToRent.price}/Day</div>
                <div id="start">
                    <label>Start Date </label>
                    <DatePicker
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}                    
                        className="ml-3"
                        selected={this.state.startDate}
                        onChange={this.handleStartChange}
                    />
                </div>
                <div id="end">
                    <label>End Date </label>
                    <DatePicker
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        minDate={this.state.startDate}
                        className="ml-3"
                        selected={this.state.endDate}
                        onChange={this.handleEndChange}
                    />
                </div>
                <div className="ml-1">Total: ${rentalTotal}</div>
                <div>{makeDropdowns()}</div>
                <div>
                <button className="bttn-pill bttn-md bttn-primary mb-3" onClick={this.rentProperty}>Rent It!</button>
                </div>
            </form>
        </div>
      );
    }
}

export default Rental;
