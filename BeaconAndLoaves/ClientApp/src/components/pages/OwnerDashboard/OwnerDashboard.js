import React from 'react';
import PropTypes from 'prop-types';
import rentalRequests from '../../../helpers/data/rentalRequests';
import userRequests from '../../../helpers/data/userRequests';

class OwnerDashboard extends React.Component {
  ownerDashboradMounted = false;

  state = {
    properties: [],
    selectedProperty: '',
  }

  getUserProperties = () => {
    const { currentUser } = this.props;
    const userId = currentUser.id;
    userRequests.getUserProperties(userId)
      .then((properties) => {
        this.setState({ properties });
      });
  };

  componentDidMount() {
    const { currentUser } = this.props;
    this.ownerDashboardMounted = !!currentUser.id;
    if (this.ownerDashboardMounted) {
      this.getUserProperties();
    }
  }

  dropdownSelect = (e) => {
    const selectedProperty = e.target.value;
    this.setState({ selectedProperty });
  }

  render() {
    const { properties } = this.state;

    return (
     <div>
       <div>Select Properties:
          <select id="property" className="custom-select mb-2 ml-2" onChange={this.dropdownSelect}>
          <option defaultValue>Select Property</option>
            {
            properties.map((property, i) => (<option value={property.id} key={i}>{property.propertyName}</option>))
            }
          </select>
        </div>
        <div>
        <select id="drp1"></select>
        </div>

     </div>
    );
  }
}

export default OwnerDashboard;
