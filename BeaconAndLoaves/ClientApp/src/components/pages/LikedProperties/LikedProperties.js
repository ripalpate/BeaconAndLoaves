import React from 'react';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import SingleLikedProperty from '../SingleLikedProperty/SingleLikedProperty';
// import smashRequests from '../../../helpers/data/smashRequests';

class LikedProperties extends React.Component {
  state = {
    likedProperties: [],
  }

  componentDidMount() {
    this.getAllLikedProperties();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.state) {
      likedPropertyRequests.getAllLikedPropertiesWithUser()
        .then((lps) => {
          this.setState({ likedProperties: lps });
        });
    }
  }

  rentProperty = (propertyId) => {
    this.props.history.push(`/rental/${propertyId}`);
  }

  getAllLikedProperties= () => {
    likedPropertyRequests.getAllLikedPropertiesWithUser()
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
