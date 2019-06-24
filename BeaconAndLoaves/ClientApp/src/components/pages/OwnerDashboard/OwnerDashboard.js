import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import rentalRequests from '../../../helpers/data/rentalRequests';
import userRequests from '../../../helpers/data/userRequests';
import formatDate from '../../../helpers/formatDate';

class OwnerDashboard extends React.Component {
  ownerDashboradMounted = false;

  state = {
    properties: [],
    propertiesWithSales: [],
    selectedProperty: '',
    startDate: new Date(),
    endDate: new Date(),
  }

  getUserProperties = () => {
    const { currentUser } = this.props;
    const userId = currentUser.id;
    userRequests.getUserProperties(userId)
      .then((properties) => {
        this.setState({ properties });
      });
  };

  getpropertiesSales = () => {
    const { currentUser } = this.props;
    const { startDate, selectedProperty, endDate } = this.state;
    const userId = currentUser.id;
    const selectedPropertyId = selectedProperty * 1;
    const selectedStartDate = formatDate.formatMDYDate(startDate);
    const selectedEndDate = formatDate.formatMDYDate(endDate);

    rentalRequests.getTotalAmountPerMonth(userId, selectedStartDate, selectedEndDate, selectedPropertyId)
      .then((propertiesWithSales) => {
        this.setState({ propertiesWithSales });
      });
  }

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

  handleStartChange = (date) => {
    this.setState({ startDate: date });
  }

  handleEndChange = (date) => {
    this.setState({ endDate: date });
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
        <div id="start">
          <label>Start Date </label>
          <DatePicker
            className="ml-3"
            selected={this.state.startDate}
            onChange={this.handleStartChange}
          />
          </div>
          <div id="end">
            <label>End Date: </label>
            <DatePicker
              className="ml-3"
              selected={this.state.endDate}
              onChange={this.handleEndChange}
            />
          </div>
          <button className= "bttn-pill" onClick= {this.getpropertiesSales}>Submit</button>
     </div>
    );
  }
}

export default OwnerDashboard;
