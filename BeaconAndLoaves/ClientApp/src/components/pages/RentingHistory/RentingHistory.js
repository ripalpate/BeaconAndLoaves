import React from 'react';
import PropTypes from 'prop-types';
import SingleRentalItem from '../../SingleRentalItem/SingleRentalItem';
import rentalRequests from '../../../helpers/data/rentalRequests';

import './RentingHistory.scss';

class RentingHistory extends React.Component {
    rentingHistoryMounted = false;

    state = {
      allRentals: [],
      futureRentals: [],
      pastRentals: [],
    }

    // sortRentals(allRentals) {
    //   const { futureRentals, pastRentals } = this.state;
    //   const today = new Date();
    //   allRentals.forEach((rental) => {
    //     const rentalDate = new Date(rental.startDate);
    //     if (rentalDate > today) {
    //       futureRentals.push(rental);
    //     } if (rentalDate <= today) {
    //       pastRentals.push(rental);
    //     }
    //   });
    // }

    componentDidMount() {
      const { currentUser } = this.props;
      this.rentingHistoryMounted = !!currentUser.id;
      if (this.rentingHistoryMounted) {
        rentalRequests.getAllRentalsByUserId(currentUser.id)
          .then((futureRentals) => {
            this.setState({ futureRentals });
          });
      }
    }

    render() {
      const { futureRentals } = this.state;

      const createFutureRentals = futureRentals.map(rental => (
        <SingleRentalItem
        rental={rental}
        key = {rental.id}
        />
      ));

      return (
        <div className="col">
            <h2 className="text-center">Future Rentals:</h2>
            <div className="lightHouses row">
                <div className = "rental-container d-flex mx-auto mt-3 col-4">{createFutureRentals}</div>
            </div>
        </div>
      );
    }
}

export default RentingHistory;
