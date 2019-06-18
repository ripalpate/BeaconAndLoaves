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
            <div className="card">
                <span>{rental.propertyName}</span>
                <span>{formatDate(start)} - </span>
                <span>{formatDate(end)}</span>
            </div>
    );
  }
}

export default SingleRentalItem;
