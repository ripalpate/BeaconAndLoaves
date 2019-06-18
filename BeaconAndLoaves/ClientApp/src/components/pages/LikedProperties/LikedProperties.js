import React from 'react';
import PropTypes from 'prop-types';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import SingleLikedProperty from '../SingleLikedProperty/SingleLikedProperty';

class LikedProperties extends React.Component {
  state = {
    likedProperties: [],
  }

  static propTypes = {
    currentUser: PropTypes.object,
  }

  componentDidMount() {
    this.getAllLikedProperties();
  }

  rentProperty = (propertyId) => {
    this.props.history.push(`/rental/${propertyId}`);
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
    const { likedProperties } = this.state;
    const singleLikedPropertyComponent = likedProperties.map(likedProperty => (
      <SingleLikedProperty
      likedProperty={likedProperty}
      key = {likedProperty.id}
      rentProperty = {this.rentProperty}
      getAllLikedProperties = {this.getAllLikedProperties}
      />
    ));

    return (
      <div className="likedProperty row">
          <div className = "d-flex mx-auto mt-5">
          {singleLikedPropertyComponent}
          </div>
      </div>
    );
  }
}

export default LikedProperties;
