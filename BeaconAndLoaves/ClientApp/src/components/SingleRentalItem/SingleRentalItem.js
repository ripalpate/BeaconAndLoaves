import React from 'react';

class SingleRentalItem extends React.Component {
  toggleModalEvent = (e) => {
    const rentingId = e.currentTarget.id * 1;
    this.props.toggleModal(rentingId);
  }

  render() {
    const { rental } = this.props;
    const start = new Date(rental.startDate);
    const end = new Date(rental.endDate);

    const formatDate = (rentalDate) => {
      const date = new Date(rentalDate);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      return formattedDate;
    };

    return (
        <li id={rental.id} className="renting-item" onClick={this.toggleModalEvent}>
            <span className="col">{rental.propertyName}</span>
            <span className="col">{formatDate(start)}</span>
            <span className="col">{formatDate(end)}</span>
            <span className="col">{rental.city}</span>
            <span className="col">{rental.state}</span>
            <span className="col">{rental.name}</span>
            <span className="col">{rental.email}</span>
        </li>
    );
  }
}

export default SingleRentalItem;
