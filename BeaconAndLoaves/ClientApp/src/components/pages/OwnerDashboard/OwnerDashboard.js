import React from 'react';
import DatePicker from 'react-datepicker';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
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
  }

  backButton = () => {
    this.props.history.push('/viewRentals');
  }

  getPropertiesWithRentalTotals = () => {
    const allRentals = [...this.state.allRentals];
    const properties = [...this.state.properties];

    properties.forEach((property) => {
      rentalRequests.getAllRentalsByPropertyIdWithTotals(property.id)
        .then((rentals) => {
          rentals.forEach((rental) => {
            allRentals.push(rental);
          });
          this.setState({ allRentals });
        });
    });
  }

  getUserProperties = () => {
    const { currentUser } = this.props;
    const userId = currentUser.id;
    userRequests.getUserProperties(userId)
      .then((properties) => {
        this.setState({ properties });
      })
      .then(() => {
        this.getPropertiesWithRentalTotals();
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
    total = total.toFixed(2);
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
    total = total.toFixed(2);
    const arrayLength = filterRentalsBasedonIncomingDates.length;
    this.setState({ rentalTotal: total, rentalsAssocWithProperty: filterRentalsBasedonIncomingDates }, this.averagePerRental(total, arrayLength));
  }

  averagePerRental = (total, arrayLength) => {
    let average = 0;
    if (total === 0) {
      average = 0;
      average = average.toFixed(2);
      this.setState({ averagePerRental: average });
    } else {
      average = total / arrayLength;
      average = average.toFixed(2);
      this.setState({ averagePerRental: average });
    }
  }

  render() {
    const properties = [...this.state.properties];
    const allRentals = [...this.state.allRentals];

    const {
      rentalTotal,
      averagePerRental,
      rentalsAssocWithProperty,
    } = this.state;

    return (
      <div>
        <button className = "bttn-pill bttn-md mt-3 back-button" onClick = {this.backButton} title="Back to All Rentals"><i className="far fa-arrow-alt-circle-left"></i></button>
        <div className="dashboardContainer d-flex mx-auto">
          <div className="dashboardWrapper animated fadeIn">
            <div className="ownerDashboard border border-dark rounded pl-3">
              <h4 className="text-center dashboardTitle">Dashboard</h4>
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
                  <p>Number of rentals: {rentalsAssocWithProperty.length}</p>
                </div>
            </div>
          </div>
        </div>
        <div className="graph-container mx-auto">
          <div className="graph-wrapper border border-dark rounded pt-3">
          <ResponsiveContainer width='99%' aspect={2.5 / 1}>
            <BarChart
              className="mx-auto"
              width='99%'
              height={2.5 / 1}
              data={allRentals}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="propertyName" stroke="white" tick={{ fill: 'white' }}/>
            <YAxis tick={{ fill: 'white' }} stroke="white"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="Total Rentals" fill="rgba(187, 21, 21, 1)" />
            <Bar dataKey="Rentals Average" fill="rgba(42, 52, 79, 1)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
    </div>
    );
  }
}

export default OwnerDashboard;
