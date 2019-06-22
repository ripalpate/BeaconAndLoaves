import React from 'react';
import rentalRequests from '../../../helpers/data/rentalRequests';

class OwnerDashboard extends React.Component {
    state = {
      PropertiesWithTotalSales: [],
    }

    componentDidMOunt() {
        rentalRequests.getTotalAmountPerMonth()
        .then(()=>{
            
        })
    }
    render() {
      return (
        <div>Made it!!!!</div>
      );
    }
}

export default OwnerDashboard;
