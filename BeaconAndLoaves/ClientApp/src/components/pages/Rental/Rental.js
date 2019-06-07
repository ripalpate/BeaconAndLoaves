import React from 'react';
import DatePicker from 'react-datepicker';
import propertiesRequests from '../../../helpers/data/propertiesRequests';


import './Rental.scss';
import 'react-datepicker/dist/react-datepicker.css';

class Rental extends React.Component {
    state = {
      startDate: new Date(),
      endDate: new Date(),
      propertyToRent: {},
    }

    handleStartChange = (date) => {
      this.setState({ startDate: date });
    }

    handleEndChange = (date) => {
      this.setState({ endDate: date });
    }

    getPropertyToRent = () => {
      const propertyId = this.props.match.params.id;
      propertiesRequests.getSingleProperty(propertyId)
        .then((property) => {
          this.setState({ propertyToRent: property });
        });
    }

    componentDidMount() {
      this.getPropertyToRent();
    }

    render() {
      const { propertyToRent } = this.state;
      return (
        <div className="text-center rental-div mx-auto">
            <div className="profile-card border border-dark rounded" id={propertyToRent.id}>
                <h3 className="text-center">{propertyToRent.propertyName}</h3>
                <div className="ml-1">Street: {propertyToRent.street}</div>
                <div className="ml-1">City: {propertyToRent.city}</div>
                <div className="ml-1">State: {propertyToRent.state}</div>
                <div className="ml-1">Zipcode: {propertyToRent.zipCode}</div>
                <div className="ml-1">Rate: ${propertyToRent.price}/Day</div>
                <div id="start">
                    <label>Start Date </label>
                    <DatePicker
                        className="ml-3"
                        selected={this.state.startDate}
                        onChange={this.handleStartChange}
                    />
                </div>
                <div id="end">
                    <label>End Date </label>
                    <DatePicker
                        className="ml-3"
                        selected={this.state.endDate}
                        onChange={this.handleEndChange}
                    />
                </div>
                <div className="ml-1">Total: $</div>
            </div>
        </div>
      );
    }
}

export default Rental;
