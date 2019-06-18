import React from 'react';

class SingleRentalItem extends React.Component {
  render() {
    const { rental } = this.props;
    const start = Date(rental.startDate);
    const end = Date(rental.endDate);

    const formatDate = (rentalDate) => {
      const date = new Date(rentalDate);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      return formattedDate;
    };

    return (
        <li className="renting-item">
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
