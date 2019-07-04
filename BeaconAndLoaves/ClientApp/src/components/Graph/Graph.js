import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import rentalRequests from '../../helpers/data/rentalRequests';
import userRequests from '../../helpers/data/userRequests';

const colors = scaleOrdinal(schemeCategory10).range();

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  allRentals: PropTypes.array,
};

class Graph extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/rnywhbu8/';

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
    const { graphModal } = this.props;
    return (
      <div>
          <Modal isOpen={graphModal} toggle={this.toggleEvent} className="modal-lg">
            <ModalHeader toggle={this.toggleEvent}>Total Sales/Property</ModalHeader>
            <BarChart
                className="mx-auto"
                width={500}
                height={300}
                data={allRentals}
                margin={{
                  top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="propertyName" />
                <YAxis />
                <Bar dataKey="totalRentals" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                {
                    allRentals.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                    ))
                }
                </Bar>
            </BarChart>
        </Modal>
      </div>
    );
  }
}

export default Graph;
