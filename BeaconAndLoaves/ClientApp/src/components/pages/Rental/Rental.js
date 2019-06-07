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
      return (
        <div className="text-center rental-div">
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
        </div>
      );
    }
}

export default Rental;
