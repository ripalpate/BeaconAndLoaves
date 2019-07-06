import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';
import rentalRequests from '../../helpers/data/rentalRequests';
import userRequests from '../../helpers/data/userRequests';

import './GraphModal.scss';

export default class Graph2 extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  graphMounted = false;

  state = {
    allRentals: [],
    properties: [],
  }

  toggleEvent = () => {
    this.props.toggleGraphModal();
  }

  getUserProperties = () => {
    const { currentUser } = this.props;
    const userId = currentUser.id;
    userRequests.getUserProperties(userId)
      .then((properties) => {
        this.setState({ properties }, this.getPropertiesWithRentalTotals);
      });
  };

  getPropertiesWithRentalTotals = () => {
    const { allRentals, properties } = this.state;
    properties.forEach((property) => {
      rentalRequests.getAllRentalsByPropertyIdWithTotals(property.id)
        .then((rentals) => {
          rentals.forEach((rental) => {
            allRentals.push(rental);
          });
        });
    });
    this.setState({ allRentals });
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.graphMounted = !!currentUser.id;
    if (this.graphMounted) {
      this.getUserProperties();
    }
  }


  render() {
    const { allRentals } = this.state;
    const { graphModal, currentUser } = this.props;

    return (
        <Modal isOpen={graphModal} toggle={this.toggleEvent} className="modal-lg">
            <ModalHeader toggle={this.toggleEvent}>{currentUser.name}'s Property Stats</ModalHeader>
            <BarChart
            className="mx-auto"
            width={500}
            height={300}
            data={allRentals}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="propertyName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalRentals" fill="rgba(187, 21, 21, 1)" />
            <Bar dataKey="rentalsAverage" fill="rgba(42, 52, 79, 1)" />
        </BarChart>
      </Modal>
    );
  }
}
