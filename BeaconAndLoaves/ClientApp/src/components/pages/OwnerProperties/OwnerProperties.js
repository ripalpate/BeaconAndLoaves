import React from 'react';
import PropTypes from 'prop-types';
import SingleOwnerProperty from '../SingleOwnerProperty/SingleOwnerProperty';
import smashRequests from '../../../helpers/data/smashRequests';

class OwnerPropducts extends React.Component {
    state = {
      properties: [],
    }

    static propTypes = {
      currentUser: PropTypes.object,
    }

    rentProperty = (propertyId) => {
      this.props.history.push(`/rental/${propertyId}`);
    }

    getOwnerPropertiesWithOwnerInfo =() => {
      const ownerId = this.props.match.params.id;
      const convertOwnerIdToNumber = parseInt(ownerId, 10);
      smashRequests.getAllPropertiesWithOwnerInfo()
        .then((props) => {
          const properties = props.filter(prop => prop.ownerId === convertOwnerIdToNumber);
          this.setState({ properties });
        });
    }

    componentDidMount() {
      this.getOwnerPropertiesWithOwnerInfo();
    }

    backButton = () => {
      this.props.history.push('/properties');
    }

    render() {
      const { properties } = this.state;
      const { currentUser } = this.props;
      const ownerPropertyComponent = properties.map(property => (
        <SingleOwnerProperty
        property = { property }
        key = {property.id}
        rentProperty = { this.rentProperty }
        currentUser = {currentUser}
        />
      ));
      return (
        <div>
            <div className="back-button">
              <button className = "btn btn-warning" onClick = {this.backButton}>Back</button>
            </div>
            <div className = "row">
            {ownerPropertyComponent}
            </div>
        </div>
      );
    }
}

export default OwnerPropducts;
