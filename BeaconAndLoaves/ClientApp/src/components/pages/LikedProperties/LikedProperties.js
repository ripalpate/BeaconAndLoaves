import React from 'react';
import PropTypes from 'prop-types';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import SingleLikedProperty from '../SingleLikedProperty/SingleLikedProperty';
import LikeButton from '../LikeButton/LikeButton';

class LikedProperties extends React.Component {
  state = {
    likedProperties:[],
    currentLikedProperty:[]
  }

  static propTypes = {
    isLiked:PropTypes.bool
  }

  componentDidMount(){
   this.getAllLikedProperties();
   this.checkExistingProperty();
  }

  getAllLikedProperties= () => {
    likedPropertyRequests.getAllLikedProperties()
    .then((likedProperties) => {
      this.setState({likedProperties});
    })
  } 

  checkExistingProperty = () => {
    const { likedProperties } = this.state;
    const {isLiked} = this.props;
    likedProperties.forEach(property => {
        likedPropertyRequests.getAllLikedProperties()
        .then((likedProperties) => {
          const currentLikedProperty = likedProperties.filter(x => x.propertyId === property.id && x.userId === property.ownerId);
          console.log(currentLikedProperty);
          if (currentLikedProperty.length === 1) {
            this.setState({ isLiked: !isLiked });
            this.setState({ currentLikedProperty });
          } else {
            this.setState({ isLiked });
          }
        });
    })
  }

  render(){
    const {likedProperties,isLiked} = this.state;
    const singleLikedPropertyComponent = likedProperties.map(likedProperty => (
      <SingleLikedProperty
      likedProperty={likedProperty}
      key = {likedProperty.id}
      />
    ));

    return(
      <div className="likedProperty row">
          <div className = "d-flex mx-auto mt-5">{singleLikedPropertyComponent}</div>
          <LikeButton
          isLiked={isLiked}
          />
      </div>
    )
  }
}

export default LikedProperties;