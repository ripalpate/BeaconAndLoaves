import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import ConfirmationModal from '../ConfirmationModal/ConfrimationModal';
import WarningModal from '../WarningModal/WarningModal';
import formatDate from '../../helpers/formatDate';
import userRequests from '../../helpers/data/userRequests';
import rentalRequests from '../../helpers/data/rentalRequests';
import paymentMethodRequests from '../../helpers/data/paymentMethodRequests';

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

// const today = new Date();
// const tomorrow = today.setDate(today.getDate() + 1);

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
    selectedDate: new Date(),
    paymentAccounts: [],
    paymentAccount: 0,
    rentalTotal: 0,
    rental: defaultRental,
    rentals: [],
    rentedDates: [],
    accountName: '',
    modal: false,
    editRental: false,
    warningModal: false,
    isRenting: false,
    attemptedDates: [],
  }

  toggleValidationModal = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  }

  toggleWarningModal = () => {
    const { warningModal, isRenting } = this.state;
    if (warningModal === false) {
      this.setState({
        warningModal: !warningModal,
        isRenting: !isRenting,
      });
    }
    this.setState({
      warningModal: !warningModal,
      isRenting: !isRenting,
      rentedDates: [],
      attemptedDates: [],
    },
    () => { this.resetDates(); this.getDates(); });
  }

  resetDates = () => {
    this.setState({
      startDate: new Date(),
      endDate: new Date(),
    });
  }

  rentalValidation = () => {
    if (this.state.paymentAccount !== 0 && this.state.rentalTotal !== 0) {
      this.toggleValidationModal();
    }
  }

  checkDates = (date) => {
    this.figureTotal();
    const { rentedDates, selectedDate, attemptedDates } = this.state;
    while (selectedDate <= date) {
      attemptedDates.push(new Date(selectedDate));
      selectedDate.setDate(selectedDate.getDate() + 1);
    }
    rentedDates.forEach((rentedDate) => {
      attemptedDates.forEach((attemptedDate) => {
        if (formatDate.formatMDYDate(rentedDate) === formatDate.formatMDYDate(attemptedDate)) {
          this.toggleWarningModal();
        }
      });
    });
  }

  handleStartChange = (date) => {
    this.setState({ startDate: new Date(date), selectedDate: new Date(date), attemptedDates: [] }, this.figureTotal);
  }

  handleEndChange = (date) => {
    this.setState({ endDate: new Date(date) }, this.figureTotal);
    this.checkDates(date);
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
      const start = new Date(rental.startDate);
      const end = new Date(rental.endDate);
      while (start <= end) {
        rentedDates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
    });
    rentedDates.sort((a, b) => ((a - b)));
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
      warningModal,
      isRenting,
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
                      selected={startDate}
                      selectsStart
                      startDate={startDate}
                      endDate={startDate}
                      onChange={this.handleStartChange}
                      excludeDates={ rentedDates }
                      />
                  </div>
                <div id="end">
                    <label>End Date: </label>
                    <DatePicker
                        className="ml-3"
                        selected={endDate}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
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
          <WarningModal
            modal={warningModal}
            toggleModal={this.toggleWarningModal}
            isRenting={isRenting}
            resetDates={this.resetDates}
          />
        </div>
      </div>
    );
  }
}

export default Rental;
