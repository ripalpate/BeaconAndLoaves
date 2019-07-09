import React from 'react';
import PropTypes from 'prop-types';
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

  toggleRentalModal = () => {
    this.setState({ rentalModal: true });
  }

  lightHouseDetailView = (lightHouseId) => {
    this.props.history.push(`/lightHouses/${lightHouseId * 1}`);
  }

  backToProperties = () => {
    this.props.history.push('/properties');
  }

  siloDetailView = (siloId) => {
    this.props.history.push(`/siloNuclears/${siloId * 1}`);
  }

  getAllLikedProperties= () => {
    const { currentUser } = this.props;
    likedPropertyRequests.getAllLikedPropertiesWithUser()
      .then((likedProperties) => {
        const likedPropertiesForCurrentUser = likedProperties.filter(lp => lp.userId === currentUser.id);
        this.setState({ likedProperties: likedPropertiesForCurrentUser });
      });
  }

  render() {
    const { likedProperties } = this.state;
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
      <div>
      <button className = "bttn-pill bttn-md mt-4 ml-3  animated slideInDown" onClick = {this.backToProperties} title="To All Properties"><i className="fas fa-building"></i></button>
      <div className="likedProperty">
        <div className = "d-flex flex-wrap justify-content-center mt-3 w-75">
          {singleLikedPropertyComponent}
        </div>
      </div>
      </div>
    );
  }
}

export default LikedProperties;
