import React from 'react';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import SingleLikedProperty from '../SingleLikedProperty/SingleLikedProperty';
import propertiesRequests from '../../../helpers/data/propertiesRequests';

class LikedProperties extends React.Component {
  state = {
    likedProperties: [],
  }

  componentDidMount() {
    this.getAllLikedProperties();
  }

  rentProperty = (propertyId) => {
    this.props.history.push(`/rental/${propertyId}`);
  }

  getAllLikedProperties= () => {
    likedPropertyRequests.getAllLikedProperties()
      .then((likedProperties) => {
        this.setState({ likedProperties });
      });
  }

  render() {
    const { likedProperties } = this.state;
    const singleLikedPropertyComponent = likedProperties.map(likedProperty => (
      <SingleLikedProperty
      likedProperty={likedProperty}
      key = {likedProperty.id}
      rentProperty = {this.rentProperty}
      />
    ));

    return (
      <div className="likedProperty row">
          <div className = "d-flex mx-auto mt-5">{singleLikedPropertyComponent}</div>
      </div>
    );
  }
}

export default LikedProperties;
