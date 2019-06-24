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
    propertyWithSales: {},
    selectedProperty: '',
    startDate: new Date(),
    endDate: new Date(),
    showResults: false,
  }

  getUserProperties = () => {
    const { currentUser } = this.props;
    const userId = currentUser.id;
    userRequests.getUserProperties(userId)
      .then((properties) => {
        this.setState({ properties });
      });
  };

  getpropertiesSales = (selectedProperty) => {
    const { currentUser } = this.props;
    const { startDate, endDate } = this.state;
    const userId = currentUser.id;
    const selectedPropertyId = selectedProperty * 1;
    const selectedStartDate = formatDate.formatMDYDate(startDate);
    const selectedEndDate = formatDate.formatMDYDate(endDate);
    rentalRequests.getTotalAmountPerMonth(userId, selectedStartDate, selectedEndDate, selectedPropertyId)
      .then((propertyWithSales) => {
        this.setState({ propertyWithSales, startDate: propertyWithSales.createdOn });
      });
  }

  submitEvent = () => {
    const { showResults } = this.state;
    this.setState({ showResults: !showResults }, this.getpropertiesSales());
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
    this.setState({ selectedProperty }, this.getpropertiesSales(selectedProperty));
  }

  handleStartChange = (date) => {
    this.setState({ startDate: date });
  }

  handleEndChange = (date) => {
    this.setState({ endDate: date });
  }

  render() {
    const { properties, propertyWithSales } = this.state;

    const displaySales = () => {
      const { showResults } = this.state;
      if (showResults === true) {
        return (
      <div>
        <h5>{propertyWithSales.propertyName}</h5>
        <p>{propertyWithSales.totalSales}</p>
      </div>
        );
      } return (<div></div>);
    };

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
            maxDate={this.state.startDate}
          />
          </div>
          <div id="end">
            <label>End Date: </label>
            <DatePicker
              className="ml-3"
              selected={this.state.endDate}
              onChange={this.handleEndChange}
              maxDate={this.state.endDate}
            />
          </div>
          <button className= "bttn-pill" onClick={this.submitEvent}>Submit</button>
            {displaySales()}
     </div>
    );
  }
}

export default OwnerDashboard;
