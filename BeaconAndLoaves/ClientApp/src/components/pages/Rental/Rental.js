import React from 'react';
import DatePicker from 'react-datepicker';
import ConfirmationModal from '../ConfirmationModal/ConfrimationModal';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import authRequests from '../../../helpers/data/authRequests';
import userRequests from '../../../helpers/data/userRequests';
import rentalRequests from '../../../helpers/data/rentalRequests';
import paymentMethodRequests from '../../../helpers/data/paymentMethodRequests';


import './Rental.scss';
import 'react-datepicker/dist/react-datepicker.css';

const defaultRental = {
  propertyId: 0,
  userId: 0,
  userPaymentId: 0,
  startDate: '',
  endDate: '',
  rentalAmount: 0,
  modal: false,
  accountName: '',
};

class Rental extends React.Component {
    state = {
      startDate: new Date(),
      endDate: new Date(),
      propertyToRent: {},
      paymentAccounts: [],
      currentUser: {},
      paymentAccount: 0,
      rentalTotal: 0,
      rental: defaultRental,
      rentals: [],
      rentedDates: [],
      accountName: '',
      modal: false,
    }

    toggleModal = () => {
      const { modal } = this.state;
      this.setState({
        modal: !modal,
      });
    }

    rentalValidation = () => {
      if (this.state.paymentAccount !== 0 && this.state.rentalTotal !== 0) {
        this.toggleModal();
      }
    }

    handleStartChange = (date) => {
      this.setState({ startDate: date }, this.figureTotal);
    }

    handleEndChange = (date) => {
      this.setState({ endDate: date }, this.figureTotal);
    }

    handlePaymentAccountChange = (e) => {
      const paymentAccount = e.target.value;
      this.setState({ paymentAccount }, this.setAccountName(paymentAccount * 1));
    }

    setAccountName = (paymentAccount) => {
      paymentMethodRequests.getSingleUserPayment(paymentAccount)
        .then((account) => {
          this.setState({ accountName: account.data.accountName });
        });
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
      const myRental = { ...this.state.rental };
      const {
        currentUser,
        propertyToRent,
        paymentAccount,
        startDate,
        endDate,
        rentalTotal,
      } = this.state;
      myRental.userId = currentUser.id * 1;
      myRental.propertyId = propertyToRent.id * 1;
      myRental.userPaymentId = paymentAccount * 1;
      myRental.startDate = startDate;
      myRental.endDate = endDate;
      myRental.rentalAmount = rentalTotal * 1;
      rentalRequests.createRental(myRental)
        .then(() => {
          this.setState({ rental: defaultRental });
          this.props.history.push('/home');
        });
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

    getAllRentalsByProperty = () => {
      const propertyId = this.props.match.params.id;
      rentalRequests.getAllRentalsByPropertyId(propertyId)
        .then((rentals) => {
          this.setState({ rentals });
          this.getDates();
        });
    }

    getPropertyToRent = () => {
      const propertyId = this.props.match.params.id;
      propertiesRequests.getSingleProperty(propertyId)
        .then((property) => {
          this.setState({ propertyToRent: property }, this.getAllRentalsByProperty());
        });
    }

     getDates = () => {
       const { rentedDates, rentals } = this.state;
       rentedDates.push(new Date());
       rentals.forEach((rental) => {
         const startDate = new Date(rental.startDate);
         const endDate = new Date(rental.endDate);
         while (startDate <= endDate) {
           rentedDates.push(new Date(startDate));
           startDate.setDate(startDate.getDate() + 1);
         }
       });
       this.setState({ rentedDates });
     }

     componentDidMount() {
       this.getPropertyToRent();
       this.getUser();
     }

     render() {
       const {
         propertyToRent,
         paymentAccounts,
         rentalTotal,
         rentedDates,
         modal,
         startDate,
         endDate,
         accountName,
       } = this.state;

       const makeDropdowns = () => (
        <div>
          <span>Payment Accounts:
            <select name="account" required className="custom-select mb-2 ml-2" id="account" onChange={this.handlePaymentAccountChange}>
              <option value="">Select Payment Account</option>
                {
                paymentAccounts.map((account, i) => (<option value={account.id} key={i}>{account.accountName}</option>))
                }
            </select>
          </span>
        </div>);

       return (
        <div className="text-center rental-div mx-auto border border-dark rounded">
            <form className="rental-form" id={propertyToRent.id}>
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
                      selectsStart
                      minDate={this.state.startDate}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleStartChange}
                      excludeDates={ rentedDates }
                      />
                  </div>
                <div id="end">
                    <label>End Date: </label>
                    <DatePicker
                        className="ml-3"
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        minDate={this.state.startDate}
                        onChange={this.handleEndChange}
                        excludeDates={ rentedDates }
                    />
                </div>
                <div className="ml-1">Total: ${rentalTotal}</div>
                <div>{makeDropdowns()}</div>
            </form>
            <div>
              <button className="bttn-pill bttn-md bttn-primary mb-3" onClick={this.rentalValidation}>Confirm Rental</button>
            </div>
            <div>
              <ConfirmationModal
              modal={modal}
              toggleModal={this.toggleModal}
              rentProperty={this.rentProperty}
              propertyToRent={propertyToRent}
              startDate={`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`}
              endDate={`${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`}
              rentalTotal={rentalTotal}
              accountName={accountName}
              />
            </div>
      </div>
       );
     }
}

export default Rental;
