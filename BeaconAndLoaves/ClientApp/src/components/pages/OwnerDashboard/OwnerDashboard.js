import React from 'react';
import DatePicker from 'react-datepicker';
import rentalRequests from '../../../helpers/data/rentalRequests';
import userRequests from '../../../helpers/data/userRequests';
import formatDate from '../../../helpers/formatDate';

class OwnerDashboard extends React.Component {
  ownerDashboradMounted = false;

  state = {
    properties: [],
    rentalsAssocWithProperty: [],
    rentalsSortedByLatestDate: [],
    selectedProperty: '',
    startDate: new Date(),
    endDate: new Date(),
    showResults: false,
    rentalTotal: 0,
    totalSales: 0,
    createdDate: new Date(),
  }

  getUserProperties = () => {
    const { currentUser } = this.props;
    const userId = currentUser.id;
    userRequests.getUserProperties(userId)
      .then((properties) => {
        this.setState({ properties });
      });
  };

  getAllRentalsRelatedToSelectedProperty = (selectedProperty) => {
    const { currentUser } = this.props;
    const { createdDate } = this.state;
    const userId = currentUser.id;
    const selectedPropertyId = selectedProperty * 1;
    rentalRequests.getAllRentalsForSingleProperty(userId, selectedPropertyId)
      .then((rentalsAssocWithProperty) => {
        this.setState({ rentalsAssocWithProperty });
      }).then(() => {
        this.getSinglePropertyCreatedOn();
      }).then(() => {
        this.getFutureRentalsEndDate();
        this.figureTotal();
      });
  }

  getSinglePropertyCreatedOn = () => {
    const { selectedProperty, properties } = this.state;
    const selectedPropertyId = selectedProperty * 1;
    const singleProperty = properties.find(property => property.id === selectedPropertyId);
    const createdDate = new Date(singleProperty.createdOn);
    this.setState({ createdDate });
    this.setState({ startDate: createdDate });
  }

  getFutureRentalsEndDate = () => {
    const { rentalsAssocWithProperty } = this.state;
    const rentalsSortedByLatestDate = rentalsAssocWithProperty.sort((r, a) => (new Date(a.EndDate) - new Date(r.EndDate)));
    this.setState({ rentalsSortedByLatestDate });
    if (rentalsSortedByLatestDate.length === 0) {
      this.setState({ endDate: new Date() });
    } else {
      this.setState({ endDate: new Date(rentalsSortedByLatestDate[0].EndDate) });
    }
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
    this.setState({ selectedProperty }, this.getAllRentalsRelatedToSelectedProperty(selectedProperty));
  }

  handleStartChange = (date) => {
    this.setState({ startDate: date }, this.totalPerSelection);
  }

  handleEndChange = (date) => {
    this.setState({ endDate: date }, this.totalPerSelection);
  }

  figureTotal = () => {
    const { rentalsAssocWithProperty } = this.state;
    // const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    // const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // const rentalTotal = diffDays * rentalsAssocWithProperty[0].RentalAmount;
    let total = 0;
    rentalsAssocWithProperty.forEach((item) => {
      total += item.RentalAmount;
    });
    this.setState({ rentalTotal: total });
    // this.setState({ rentalTotal });
  }

  totalPerSelection = () => {
    const { rentalsAssocWithProperty } = this.state;
    const y = rentalsAssocWithProperty.filter(x => new Date(this.state.startDate) <= new Date(x.StartDate) && new Date(x.StartDate) <= new Date(this.state.endDate));
    let total = 0;
    y.forEach((item) => {
      total += item.RentalAmount;
    });
    this.setState({ rentalTotal: total });
  }

  render() {
    const { properties, rentalTotal } = this.state;

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
          <div>Total Sales: ${rentalTotal}</div>
     </div>
    );
  }
}

export default OwnerDashboard;
