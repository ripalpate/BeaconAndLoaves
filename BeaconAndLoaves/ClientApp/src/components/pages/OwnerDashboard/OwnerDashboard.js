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
    selectedProperty: '',
    startDate: new Date(),
    endDate: new Date(),
    showResults: false,
    rentalTotal: 0,
    totalSales: 0,
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
    const userId = currentUser.id;
    const selectedPropertyId = selectedProperty * 1;
    rentalRequests.getAllRentalsForSingleProperty(userId, selectedPropertyId)
      .then((rentalsAssocWithProperty) => {
        this.setState({ rentalsAssocWithProperty });
        this.setState({ startDate: new Date(rentalsAssocWithProperty[0].createdOn) });
      }).then(() => {
        this.figureTotal();
        this.getFutureRentalsEndDate();
      });
  }

  getFutureRentalsEndDate = () => {
    const { rentalsAssocWithProperty } = this.state;
    // const x = new Date(Math.max.apply(null, rentalsAssocWithProperty.map(e => new Date(e.endDate))));
    // console.log(x);
    const x = rentalsAssocWithProperty.sort((r, a) => (new Date(a.EndDate) - new Date(r.EndDate)));
    console.log(x);
  }

  // submitEvent = () => {
  //   const { showResults } = this.state;
  //   this.setState({ showResults: !showResults }, this.getPropertySales());
  // }

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
    this.setState({ startDate: date }, this.figureTotal);
  }

  handleEndChange = (date) => {
    this.setState({ endDate: date }, this.figureTotal);
  }

  figureTotal = () => {
    const { startDate, endDate } = this.state;
    const { rentalsAssocWithProperty } = this.state;
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const rentalTotal = diffDays * rentalsAssocWithProperty[0].Price;
    this.setState({ rentalTotal });
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
            maxDate={this.state.startDate}
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
