import React from 'react';
import PropTypes from 'prop-types';
import SingleRentalItem from '../../SingleRentalItem/SingleRentalItem';
import RentingHistoryModal from '../RentingHistoryModal/RentingHistoryModal';
import rentalRequests from '../../../helpers/data/rentalRequests';

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
    }

    toggleModal = (rentingId) => {
      const { rentingHistoryModal } = this.state;
      this.setState({ rentingId, rentingHistoryModal: !rentingHistoryModal });
      if (rentingHistoryModal === false) {
        this.getSingleRental(rentingId);
      }
    }

    getSingleRental = (rentingId) => {
      rentalRequests.getSingleRental(rentingId)
        .then((rental) => {
          this.setState({ selectedRental: rental.data });
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
      } = this.state;

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
            />
        </div>
      );
    }
}

export default RentingHistory;
