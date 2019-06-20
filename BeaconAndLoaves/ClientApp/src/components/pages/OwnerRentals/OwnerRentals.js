import React from 'react';
import PropTypes from 'prop-types';
import SingleOwnerRentalItem from '../SingleOwnerRentalItem/SingleOwnerRentalItem';
import rentalRequests from '../../../helpers/data/rentalRequests';
import './OwnerRentals.scss';

class OwnerRentals extends React.Component {
ownerRentalsMounted = false;

    state = {
      futureOwnerRentals: [],
      pastOwnerRentals: [],
    }

    static propTypes = {
      currentUser: PropTypes.object,
    }

    getFutureOwnerRentals = () => {
      const { currentUser } = this.props;
      const ownerId = currentUser.id;
      rentalRequests.getFutureOwnerRentals(ownerId)
        .then((rentals) => {
          this.setState({ futureOwnerRentals: rentals });
        });
    }

    getPastOwnerRentals = () => {
      const { currentUser } = this.props;
      const ownerId = currentUser.id;
      rentalRequests.getPastOwnerRentals(ownerId)
        .then((rentals) => {
          this.setState({ pastOwnerRentals: rentals });
        });
    }

    componentDidMount() {
      const { currentUser } = this.props;
      this.ownerRentalsMounted = !!currentUser.id;
      if (this.ownerRentalsMounted) {
        this.getFutureOwnerRentals();
        this.getPastOwnerRentals();
      }
    }

    render() {
      const {
        futureOwnerRentals,
        pastOwnerRentals,
      } = this.state;

      const createFutureOwnerRentals = futureOwnerRentals.map(rental => (
          <SingleOwnerRentalItem
          rental={rental}
          key = {rental.id}
          />
      ));

      const createPastOwnerRentals = pastOwnerRentals.map(rental => (
          <SingleOwnerRentalItem
          rental={rental}
          key = {rental.id}
          />
      ));

      return (
          <div className="ownerRentals col">
              <div className="future-rentals">
                <h2 className="mt-5">Future Rentals:</h2>
                <table className="table table-hover text-light">
                  <thead>
                    <tr>
                      <th scope="col">Property</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Renter Name</th>
                      <th scope="col">Renter Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {createFutureOwnerRentals}
                  </tbody>
                </table>
              </div>
              <div className="past-rentals">
                <h2 className="mt-5">Past Rentals:</h2>
                <table className="table table-hover text-light">
                  <thead>
                    <tr>
                      <th scope="col">Property</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Renter Name</th>
                      <th scope="col">Renter Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {createPastOwnerRentals}
                  </tbody>
                </table>
              </div>
          </div>
      );
    }
}

export default OwnerRentals;
