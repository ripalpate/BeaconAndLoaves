import React from 'react';
import PropTypes from 'prop-types';
import rentalRequests from '../../../helpers/data/rentalRequests';

import './RentingHistory.scss';

class RentingHistory extends React.Component {
    rentingHistoryMounted = false;

    state = {
      rentalHistory: [],
    }

    componentDidMount() {
      const { currentUser } = this.props;
      this.rentingHistoryMounted = !!currentUser.id;
      if (this.rentingHistoryMounted) {
        rentalRequests.getAllRentalsByUserId(currentUser.id)
          .then((rentalHistory) => {
            this.setState({ rentalHistory });
          });
      }
    }

    render() {
      const { currentUser } = this.props;

      // createRentals = () => {

      // };

      return (
            <div>
                Renting History Page
            </div>
      );
    }
}

export default RentingHistory;
