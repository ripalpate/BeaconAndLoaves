import React from 'react';
import PropTypes from 'prop-types';
import rentalRequests from '../../../helpers/data/rentalRequests';

class OwnerDashboard extends React.Component {

  state = {
    propertiesWithSales: [],
  }

  static propTypes = {
    currentUser: PropTypes.object,
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.OwnerDashboard = !!currentUser.id;
    if (this.OwnerDashboard) {
      this.getTotalSalesPerProperty();
    }
  }

  getTotalSalesPerProperty = () => {
    const { currentUser } = this.props;
    rentalRequests.getTotalAmountPerMonth(currentUser.id)
      .then((totalSalesPerProperty) => {
        this.setState({ propertiesWithSales: totalSalesPerProperty });
      }).catch(err => console.error(err));
  }

  render() {
    const { propertiesWithSales } = this.state;
    return (
      propertiesWithSales.map(propertyWithSales => (
      <div className="card">
        <div className="card-body">
          <h3>{propertyWithSales.propertyName}</h3>
          <h6>Lifetime Sales: {propertyWithSales.lifetimeSales}</h6>
        </div>
      </div>
      ))
    );
  }
}

export default OwnerDashboard;
