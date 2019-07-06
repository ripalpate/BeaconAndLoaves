import React from 'react';
import DatePicker from 'react-datepicker';
import GraphModal from '../../GraphModal/GraphModal';
import rentalRequests from '../../../helpers/data/rentalRequests';
import userRequests from '../../../helpers/data/userRequests';
import './OwnerDashboard.scss';

class OwnerDashboard extends React.Component {
  ownerDashboradMounted = false;

  state = {
    properties: [],
    allRentals: [],
    rentalsAssocWithProperty: [],
    rentalsSortedByLatestDate: [],
    selectedProperty: '',
    startDate: new Date(),
    endDate: new Date(),
    rentalTotal: 0,
    createdDate: new Date(),
    averagePerRental: 0,
    graphModal: false,
  }

  backButton = () => {
    this.props.history.push('/viewRentals');
  }

  toggleGraphModal = () => {
    const { graphModal } = this.state;
    this.setState({ graphModal: !graphModal });
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
    this.setState({ startDate: date }, () => {
      this.totalPerSelection();
    });
  }

  handleEndChange = (date) => {
    this.setState({ endDate: date }, () => {
      this.totalPerSelection();
    });
  }

  figureTotal = () => {
    const { rentalsAssocWithProperty } = this.state;
    let total = 0;
    rentalsAssocWithProperty.forEach((item) => {
      total += item.RentalAmount;
    });
    const arrayLength = rentalsAssocWithProperty.length;
    this.setState({ rentalTotal: total }, this.averagePerRental(total, arrayLength));
  }

  getDates = () => {
    const { rentedDates, rentals } = this.state;
    const { isEditing } = this.props;
    rentedDates.push(new Date());
    rentals.forEach((rental) => {
      const startDate = new Date(rental.startDate);
      const endDate = new Date(rental.endDate);
      while (startDate <= endDate) {
        rentedDates.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
      }
    });
    this.setState({ rentedDates });
    if (isEditing) {
      this.figureTotal();
    }
  }

  totalPerSelection = () => {
    const { rentalsAssocWithProperty, startDate, endDate } = this.state;
    const filterRentalsBasedonIncomingDates = rentalsAssocWithProperty.filter(rental => new Date(startDate) <= new Date(rental.StartDate) && new Date(rental.StartDate) <= new Date(endDate));
    let total = 0;
    filterRentalsBasedonIncomingDates.forEach((item) => {
      total += item.RentalAmount;
    });
    const arrayLength = filterRentalsBasedonIncomingDates.length;
    this.setState({ rentalTotal: total, rentalsAssocWithProperty: filterRentalsBasedonIncomingDates }, this.averagePerRental(total, arrayLength));
  }

  averagePerRental = (total, arrayLength) => {
    let average = 0;
    if (total === 0) {
      average = 0;
      this.setState({ averagePerRental: average });
    } else {
      average = total / arrayLength;
      this.setState({ averagePerRental: average });
    }
  }

  render() {
    const {
      properties,
      rentalTotal,
      averagePerRental,
      graphModal,
    } = this.state;

    return (
     <div className="mt-3">
      <button className = "bttn-pill bttn-md mt-3 ml-1" onClick = {this.backButton} title="Back to All Rentals"><i className="far fa-arrow-alt-circle-left"></i></button>
      <button className = "bttn-pill bttn-md mt-3 ml-1" onClick = {this.toggleGraphModal} title="Show Graph"><i className="fas fa-chart-line"></i></button>
       <div className="ownerDashboard card">
        <h4 className="text-center">Dashboard</h4>
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
          <div>
            <p>Total Sales: ${rentalTotal}</p>
            <p>Average ${averagePerRental} per rental</p>
          </div>
      </div>
        <GraphModal
          currentUser={this.props.currentUser}
          toggleGraphModal={this.toggleGraphModal}
          graphModal={graphModal}
        />
     </div>
    );
  }
}

export default OwnerDashboard;
