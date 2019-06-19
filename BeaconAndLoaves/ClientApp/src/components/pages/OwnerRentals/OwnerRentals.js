import React from 'react';
import PropTypes from 'prop-types';
// import SingleOwnerRentalItem from '../../SingleOwnerRentalItem/SingleOwnerRentalItem';
// import rentalRequests from '../../../helpers/data/rentalRequests';

import './OwnerRentals.scss';
import rentalRequests from '../../../helpers/data/rentalRequests';

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
      return (
            <div>Rentals</div>
      );
      //   const { futureOwnerRentals, pastOwnerRentals } = this.state;

      //   const createFutureRentals = futureOwnerRentals.map(rental => (
      //     <SingleRentalItem
      //     rental={rental}
      //     key = {rental.id}
      //     />
      //   ));

      //   const createPastRentals = pastOwnerRentals.map(rental => (
      //     <SingleRentalItem
      //     rental={rental}
      //     key = {rental.id}
      //     />
      //   ));

    //   return (
    //     <div className="renting col">
    //         <div className="future-renting">
    //             <h2 className="mt-5">Future Rentals:</h2>
    //             <span className="col">Property</span>
    //             <span className="col">Start Date</span>
    //             <span className="col">End Date</span>
    //             <span className="col">City</span>
    //             <span className="col">State</span>
    //             <span className="col">Owner</span>
    //             <span className="col">Owner Contact</span>
    //             <ul>
    //                 {createFutureRentals}
    //             </ul>
    //         </div>
    //         <div className="past-renting">
    //             <h2 className="mt-5">Past Rentals:</h2>
    //             <span className="col">Property</span>
    //             <span className="col">Start Date</span>
    //             <span className="col">End Date</span>
    //             <span className="col">City</span>
    //             <span className="col">State</span>
    //             <span className="col">Owner</span>
    //             <span className="col">Owner Contact</span>
    //             <ul>
    //                 {createPastRentals}
    //             </ul>
    //         </div>
    //     </div>
    //   );
    }
}

export default OwnerRentals;
