import React from 'react';

class SingleRentalItem extends React.Component {

  render() {
    return (
            <div className="card">{this.props.rental.id}</div>
    );
  }
}

export default SingleRentalItem;
