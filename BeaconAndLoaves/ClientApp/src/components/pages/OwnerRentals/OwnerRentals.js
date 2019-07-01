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
      totalSales: 0,
    }

    static propTypes = {
      currentUser: PropTypes.object,
    }

    backButton = () => {
      this.props.history.push('/profile');
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
        }).then(() => {
          this.getTotalSales();
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

    ownerDashboardGraphicalView = () => {
      this.props.history.push('/ownerDashboard');
    }

    getTotalSales = () => {
      const { pastOwnerRentals } = this.state;
      let total = 0;
      pastOwnerRentals.forEach((item) => {
        total += item.rentalAmount;
      });
      this.setState({ totalSales: total });
    };

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

      const checkLength = () => {
        if (pastOwnerRentals.length === 0) {
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
                    <th scope="col">Total Amount</th>
                    <th scope="col">Renter Name</th>
                    <th scope="col">Renter Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {createPastOwnerRentals}
                </tbody>
            </table>
        );
      };

      const checkFutureRentalsLength = () => {
        if (futureOwnerRentals.length === 0) {
          return (
          <div className="no-rentals-message mt-3">
            <h5 className="card-title">Currently, there are no future rentals.</h5>
          </div>);
        }
        return (
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
        );
      };
      return (
          <div className="ownerRentals col">
              <button className = "bttn-pill bttn-md mt-3" onClick = {this.backButton} title="Back to Profile"><i className="far fa-arrow-alt-circle-left"></i></button>
              <div className="future-rentals">
                <h2 className="mt-5">Future Rentals:</h2>
                {checkFutureRentalsLength()}
              </div>
              <div className="past-rentals">
                <h2 className="mt-5">Past Rentals:</h2>
                {checkLength()}
              </div>
              <div className="sales-container">
                <h3 className="mt-5"> Lifetime Sales for all Properties</h3>
                <p>Total sales: $ {this.state.totalSales}</p>
                <button className = "bttn-pill" onClick={this.ownerDashboardGraphicalView}>View Detail Sales </button>
              </div>
          </div>
      );
    }
}

export default OwnerRentals;
