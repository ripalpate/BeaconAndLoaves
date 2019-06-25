import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import ConfirmationModal from '../ConfirmationModal/ConfrimationModal';
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
};

class Rental extends React.Component {
  rentalMounted = false;

  static propTypes = {
    isEditing: PropTypes.bool,
    rentalModal: PropTypes.bool,
    currentUser: PropTypes.object,
    property: PropTypes.object,
    toggleRentalModal: PropTypes.func,
    propertyId: PropTypes.number,
    toggleModal: PropTypes.func,
  }

  state = {
    startDate: new Date(),
    endDate: new Date(),
    paymentAccounts: [],
    paymentAccount: 0,
    rentalTotal: 0,
    rental: defaultRental,
    rentals: [],
    rentedDates: [],
    accountName: '',
    modal: false,
    editRental: false,
  }

  toggleValidationModal = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  }

  rentalValidation = () => {
    if (this.state.paymentAccount !== 0 && this.state.rentalTotal !== 0) {
      this.toggleValidationModal();
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
    const { startDate, endDate } = this.state;
    const { property } = this.props;
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const rentalTotal = diffDays * property.price;
    this.setState({ rentalTotal });
  }

  rentProperty = (e) => {
    e.preventDefault();
    const myRental = { ...this.state.rental };
    const {
      property,
      currentUser,
      isEditing,
      routeToHome,
      toggleRentalModal,
      toggleModal,
    } = this.props;
    const {
      paymentAccount,
      startDate,
      endDate,
      rentalTotal,
    } = this.state;
    myRental.userId = currentUser.id * 1;
    myRental.propertyId = property.id * 1;
    myRental.userPaymentId = paymentAccount * 1;
    myRental.startDate = startDate;
    myRental.endDate = endDate;
    myRental.rentalAmount = rentalTotal * 1;
    if (isEditing) {
      rentalRequests.updateRental(myRental.Id, myRental)
        .then(() => {
          this.setState({ rental: defaultRental });
          this.toggleValidationModal();
          toggleRentalModal();
          toggleModal();
        });
    } if (!isEditing) {
      rentalRequests.createRental(myRental)
        .then(() => {
          this.setState({ rental: defaultRental });
          routeToHome();
        });
    }
  }

  getUserPaymentAccounts = () => {
    const { currentUser } = this.props;
    const uid = currentUser.id;
    userRequests.getUserPaymentAccounts(uid)
      .then((paymentAccounts) => {
        this.setState({ paymentAccounts });
      });
  };

  getAllRentalsByProperty = () => {
    const { propertyId } = this.props;
    rentalRequests.getAllRentalsByPropertyId(propertyId)
      .then((rentals) => {
        if (this.state.editRental) {
          for (let i = 0; i < rentals.length; i++) {
            if (rentals[i].id === this.state.rental.Id) {
              rentals.splice(i, 1);
            }
          }
        }
        this.setState({ rentals });
        this.getDates();
      });
  }

  getDates = () => {
    const { rentedDates, rentals } = this.state;
    const { isEditing } = this.props;
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
    if (isEditing) {
      this.figureTotal();
    }
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.rentalMounted = !!currentUser.id;
    if (this.rentalMounted) {
      this.getUserPaymentAccounts();
      this.getAllRentalsByProperty();
    }
  }

  componentWillReceiveProps(props) {
    if (props.isEditing) {
      this.setState({
        rental: props.selectedRental,
        editRental: props.isEditing,
        startDate: new Date(props.selectedRental.StartDate),
        endDate: new Date(props.selectedRental.EndDate),
        paymentAccount: props.selectedRental.UserPaymentId,
      });
      this.getUserPaymentAccounts();
      this.getAllRentalsByProperty();
    }
  }

  render() {
    const {
      paymentAccounts,
      rentalTotal,
      rentedDates,
      modal,
      startDate,
      endDate,
      accountName,
      paymentAccount,
    } = this.state;

    const {
      isEditing,
      property,
      rentalModal,
      toggleRentalModal,
    } = this.props;

    const makeDropdowns = () => (
        <div>
          <span>Payment Accounts:
            <select name="account" value={paymentAccount} required className="custom-select mb-2 ml-2" id="account" onChange={this.handlePaymentAccountChange}>
              <option value="">Select Payment Account</option>
                {
                paymentAccounts.map((account, i) => (<option value={account.id} key={i}>{account.accountName}</option>))
                }
            </select>
          </span>
        </div>);

    const makeHeader = () => {
      if (isEditing) {
        return (
          <div>Edit Rental</div>
        );
      }
      return (
        <div>Add Rental</div>
      );
    };

    return (
      <div className="text-center">
      <Modal isOpen={rentalModal} className="modal-lg">
      <ModalHeader class-name="modal-header" toggle={toggleRentalModal}>{makeHeader()}</ModalHeader>
        <ModalBody className="text-center modal-body">
            <form className="rental-form" id={property.id}>
                <h3 className="text-center">{property.propertyName}</h3>
                <div className="ml-1">Street: {property.street}</div>
                <div className="ml-1">City: {property.city}</div>
                <div className="ml-1">State: {property.state}</div>
                <div className="ml-1">Zipcode: {property.zipCode}</div>
                <div className="ml-1">Rate: ${property.price}/Day</div>
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
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
      </Modal>
      <div>
              <ConfirmationModal
              modal={modal}
              toggleValidationModal={this.toggleValidationModal}
              rentProperty={this.rentProperty}
              propertyToRent={property}
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
