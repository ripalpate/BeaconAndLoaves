import React from 'react';
import formatDate from '../../helpers/formatDate';

class SingleRentalItem extends React.Component {
  toggleModalEvent = (e) => {
    const rentingId = e.currentTarget.id * 1;
    this.props.toggleModal(rentingId);
  }

  render() {
    const { rental } = this.props;

    return (
      <tr id={rental.id} className="renting-item" onClick={this.toggleModalEvent}>
          <td className="rental-property-name">{rental.propertyName}</td>
          <td className="rental-start">{formatDate.formatMDYDate(rental.startDate)}</td>
          <td className="rental-end">{formatDate.formatMDYDate(rental.endDate)}</td>
          <td className="rental-city">{rental.city}</td>
          <td className="rental-state">{rental.state}</td>
          <td className="rental-owner">{rental.name}</td>
          <td className="rental-email">{rental.email}</td>
      </tr>
    );
  }
}

export default SingleRentalItem;
