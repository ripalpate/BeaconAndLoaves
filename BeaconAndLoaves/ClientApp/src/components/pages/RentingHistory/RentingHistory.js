import React from 'react';
import PropTypes from 'prop-types';
import SingleRentalItem from '../../SingleRentalItem/SingleRentalItem';
import rentalRequests from '../../../helpers/data/rentalRequests';

import './RentingHistory.scss';

class RentingHistory extends React.Component {
    rentingHistoryMounted = false;

    state = {
      futureRentals: [],
      pastRentals: [],
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
      const { futureRentals, pastRentals } = this.state;

      const createFutureRentals = futureRentals.map(rental => (
        <SingleRentalItem
        rental={rental}
        key = {rental.id}
        />
      ));

      const createPastRentals = pastRentals.map(rental => (
        <SingleRentalItem
        rental={rental}
        key = {rental.id}
        />
      ));

      return (
        <div className="renting col">
            <div className="future-renting">
                <h2 className="mt-5">Future Rentals:</h2>
                <span className="col">Property</span>
                <span className="col">Start Date</span>
                <span className="col">End Date</span>
                <span className="col">City</span>
                <span className="col">State</span>
                <span className="col">Owner</span>
                <span className="col">Owner Contact</span>
                <ul>
                    {createFutureRentals}
                </ul>
            </div>
            <div className="past-renting">
                <h2 className="mt-5">Past Rentals:</h2>
                <span className="col">Property</span>
                <span className="col">Start Date</span>
                <span className="col">End Date</span>
                <span className="col">City</span>
                <span className="col">State</span>
                <span className="col">Owner</span>
                <span className="col">Owner Contact</span>
                <ul>
                    {createPastRentals}
                </ul>
            </div>
        </div>
      );
    }
}

export default RentingHistory;
