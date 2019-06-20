import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../../helpers/formatDate';

class SingleOwnerRentalItem extends React.Component {
 static propTypes ={
   rental: PropTypes.object,
 }

 render() {
   const { rental } = this.props;

   return (
      <tr id={rental.id} className="renting-item">
          <td className="rental-property-name">{rental.propertyName}</td>
          <td className="rental-start">{formatDate.formatMDYDate(rental.startDate)}</td>
          <td className="rental-end">{formatDate.formatMDYDate(rental.endDate)}</td>
          <td className="rental-city">{rental.rentalAmount}</td>
          <td className="renter-name">{rental.userName}</td>
          <td className="renter-email">{rental.email}</td>
      </tr>
   );
 }
}

export default SingleOwnerRentalItem;