import React from 'react';
import PropTypes from 'prop-types';
import SingleRentalItem from '../../SingleRentalItem/SingleRentalItem';
import RentingHistoryModal from '../RentingHistoryModal/RentingHistoryModal';
import Rental from '../Rental/Rental';
import rentalRequests from '../../../helpers/data/rentalRequests';
import propertyRequests from '../../../helpers/data/propertiesRequests';


import './RentingHistory.scss';

class RentingHistory extends React.Component {
    rentingHistoryMounted = false;

    static propTypes = {
      currentUser: PropTypes.object,
    }

    state = {
      futureRentals: [],
      pastRentals: [],
      rentingId: 0,
      rentingHistoryModal: false,
      selectedRental: {},
      selectedProperty: {},
      numDays: 0,
      isEditing: false,
      rentalModal: false,
      propertyId: 0,
    }

    toggleModal = (rentingId) => {
      const { rentingHistoryModal } = this.state;
      this.setState({ rentingId, rentingHistoryModal: !rentingHistoryModal });
      if (rentingHistoryModal === false) {
        this.getSingleRental(rentingId);
      }
    }

    toggleRentalModal = () => {
      const { isEditing, rentalModal } = this.state;
      this.setState({ isEditing: !isEditing, rentalModal: !rentalModal });
      this.getFutureRentals();
    }

    getSingleRental = (rentingId) => {
      rentalRequests.getSingleRental(rentingId)
        .then((rental) => {
          this.setState({ selectedRental: rental.data });
        })
        .then(() => {
          const { selectedRental } = this.state;
          this.numDaysBetween();
          this.getSingleProperty(selectedRental.PropertyId);
        });
    }

    getSingleProperty = (propertyId) => {
      this.setState({ propertyId });
      propertyRequests.getSingleProperty(propertyId)
        .then((selectedProperty) => {
          this.setState({ selectedProperty });
        });
    }

    getFutureRentals = () => {
      const { currentUser } = this.props;
      rentalRequests.getFutureRentalsByUserId(currentUser.id)
        .then((futureRentals) => {
          this.setState({ futureRentals });
        });
    }

    getPastRentals = () => {
      const { currentUser } = this.props;
      rentalRequests.getPastRentalsByUserId(currentUser.id)
        .then((pastRentals) => {
          this.setState({ pastRentals });
        });
    }

    numDaysBetween = () => {
      const { selectedRental } = this.state;
      const today = new Date();
      const startDate = new Date(selectedRental.StartDate);
      const diff = Math.abs(startDate.getTime() - today.getTime());
      this.setState({ numDays: diff / (1000 * 60 * 60 * 24) });
    };

    formSubmit = (e) => {
      e.preventDefault();
      const { selectedRental } = this.state;
      const rentalId = selectedRental.id;
      rentalRequests.updateRental(rentalId, selectedRental)
        .then(() => {
          this.setState({ isEditing: false });
        });
    }

    componentDidMount() {
      const { currentUser } = this.props;
      this.rentingHistoryMounted = !!currentUser.id;
      if (this.rentingHistoryMounted) {
        this.getFutureRentals();
        this.getPastRentals();
      }
    }

    render() {
      const {
        futureRentals,
        pastRentals,
        rentingHistoryModal,
        rentingId,
        selectedRental,
        selectedProperty,
        numDays,
        isEditing,
        rentalModal,
        propertyId,
      } = this.state;

      const {
        currentUser,
        getSingleRental,
      } = this.props;

      const createFutureRentals = futureRentals.map(rental => (
        <SingleRentalItem
        rental={rental}
        key = {rental.id}
        toggleModal = {this.toggleModal}
        />
      ));

      const createPastRentals = pastRentals.map(rental => (
        <SingleRentalItem
        rental={rental}
        key = {rental.id}
        toggleModal = {this.toggleModal}
        />
      ));

      const checkPastRentalsLength = () => {
        if (pastRentals.length === 0) {
          return (
          <div className="no-rentals-message mt-3">
            <h5 className="card-title">Currently, there are no past rentals.</h5>
          </div>);
        }
        return (
          <table className="table table-hover text-light">
            <thead>
              <tr>
                <th scope="col">Property</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Owner</th>
                <th scope="col">Owner Contact</th>
              </tr>
            </thead>
            <tbody>
              {createPastRentals}
            </tbody>
        </table>
        );
      };

      const checkFutureRentalsLength = () => {
        if (futureRentals.length === 0) {
          return (
          <div className="no-rentals-message mt-3">
            <h5 className="card-title">Currently, there are no future rentals. Time to rent one Friend!!!</h5>
          </div>);
        }
        return (
            <table className="table table-hover text-light">
                <thead>
                  <tr>
                    <th scope="col">Property</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Owner Contact</th>
                  </tr>
                </thead>
                <tbody>
                    {createFutureRentals}
                </tbody>
            </table>
        );
      };

      return (
        <div className="renting col">
            <div className="future-renting">
              <h2 className="mt-5">Future Rentals:</h2>
              {checkFutureRentalsLength()}
            </div>
            <div className="past-renting">
              <h2 className="mt-5">Past Rentals:</h2>
              {checkPastRentalsLength()}
            </div>
            <RentingHistoryModal
              rentingHistoryModal={rentingHistoryModal}
              rentingId={rentingId}
              toggleModal={this.toggleModal}
              selectedRental={selectedRental}
              numDays={numDays}
              isEditing={isEditing}
              toggleRentalModal={this.toggleRentalModal}
              formSubmit={this.formSubmit}
            />
            <Rental
              isEditing={isEditing}
              currentUser={currentUser}
              rentalModal={rentalModal}
              property={selectedProperty}
              propertyId = {propertyId}
              toggleRentalModal={this.toggleRentalModal}
              toggleModal={this.toggleModal}
              routeToHome={this.routeToHome}
              selectedRental={selectedRental}
              getSingleRental={getSingleRental}
            />
        </div>
      );
    }
}

export default RentingHistory;
