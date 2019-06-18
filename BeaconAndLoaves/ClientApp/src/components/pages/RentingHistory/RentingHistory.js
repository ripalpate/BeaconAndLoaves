import React from 'react';
import PropTypes from 'prop-types';
import rentalRequests from '../../../helpers/data/rentalRequests';

import './RentingHistory.scss';

class RentingHistory extends React.Component {
    rentingHistoryMounted = false;

    state = {
      futureRentals: [],
      pastRentals: [],
    }

    componentDidMount() {
      const { currentUser } = this.props;
      const { futureRentals, pastRentals } = this.state;
      this.rentingHistoryMounted = !!currentUser.id;
      const today = new Date();
      if (this.rentingHistoryMounted) {
        rentalRequests.getAllRentalsByUserId(currentUser.id)
          .then((rentalHistory) => {
            rentalHistory.forEach((rental) => {
              const rentalDate = new Date(rental.startDate);
              if (rentalDate > today) {
                futureRentals.push(rental);
              } if (rentalDate <= today) {
                pastRentals.push(rental);
              }
            });
          });
      }
    }

    render() {
      const { rentalHistory } = this.state;

      //   const createFutureRentals = () => {
      //     const futureRentals = [];
      //     const today = new Date();
      //     rentalHistory.forEach((rental) => {
      //       const rentalDate = new Date(rental.startDate);
      //       if (rentalDate > today) {
      //         console.log('true');
      //         return (
      //             <h2>True</h2>
      //         );
      //       }
      //     });
      //   };

      return (
            <div>
                <h2 className="text-center">Future Rentals:</h2>
                {/* {createFutureRentals()} */}
            </div>
      );
    }
}

export default RentingHistory;
