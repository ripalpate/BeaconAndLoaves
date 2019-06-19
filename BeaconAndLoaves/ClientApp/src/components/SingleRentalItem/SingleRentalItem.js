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
        <li id={rental.id} className="renting-item" onClick={this.toggleModalEvent}>
            <span className="col">{rental.propertyName}</span>
            <span className="col">{formatDate.formatMDYDate(rental.startDate)}</span>
            <span className="col">{formatDate.formatMDYDate(rental.endDate)}</span>
            <span className="col">{rental.city}</span>
            <span className="col">{rental.state}</span>
            <span className="col">{rental.name}</span>
            <span className="col">{rental.email}</span>
        </li>
    );
  }
}

export default SingleRentalItem;
