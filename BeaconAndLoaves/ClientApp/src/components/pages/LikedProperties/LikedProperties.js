import React from 'react';
import PropTypes from 'prop-types';
import Rental from '../Rental/Rental';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import SingleLikedProperty from '../SingleLikedProperty/SingleLikedProperty';

class LikedProperties extends React.Component {
  state = {
    likedProperties: [],
    rentalModal: false,
  }

  static propTypes = {
    currentUser: PropTypes.object,
  }

  componentDidMount() {
    this.getAllLikedProperties();
  }

  // rentProperty = (propertyId) => {
  //   this.props.history.push(`/rental/${propertyId}`);
  // }

  toggleRentalModal = (propertyId) => {
    this.setState({ rentalModal: true },);
  }

  lightHouseDetailView = (lightHouseId) => {
    this.props.history.push(`/lightHouses/${lightHouseId * 1}`);
  }

  siloDetailView = (siloId) => {
    this.props.history.push(`/siloNuclears/${siloId * 1}`);
  }

  getAllLikedProperties= () => {
    const { currentUser } = this.props;
    likedPropertyRequests.getAllLikedPropertiesWithUser()
      .then((likedProperties) => {
        const likedPropertiesForCurrentUser = likedProperties.filter(lp => lp.userId === currentUser.id);
        // console.log(likedPropertiesForCurrentUser);
        this.setState({ likedProperties: likedPropertiesForCurrentUser });
      });
  }

  render() {
    const { likedProperties, rentalModal } = this.state;
    const { currentUser } = this.props;
    const singleLikedPropertyComponent = likedProperties.map(likedProperty => (
      <SingleLikedProperty
      likedProperty={likedProperty}
      key = {likedProperty.id}
      rentProperty = {this.rentProperty}
      getAllLikedProperties = {this.getAllLikedProperties}
      lightHouseDetailView={this.lightHouseDetailView}
      siloDetailView={this.siloDetailView}
      />
    ));

    return (
      <div className="likedProperty row">
          <div className = "d-flex mx-auto mt-5">
          {singleLikedPropertyComponent}
          </div>
          {/* <Rental
          currentUser={currentUser}
          rentalModal={rentalModal}
          // property={lightHouse}
          propertyId = {this.props.match.params.id * 1}
          toggleRentalModal={this.toggleRentalModal}
          routeToHome={this.routeToHome}
        /> */}
      </div>
    );
  }
}

export default LikedProperties;
