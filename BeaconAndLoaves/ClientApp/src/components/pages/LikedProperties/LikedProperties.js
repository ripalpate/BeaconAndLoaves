import React from 'react';
import PropTypes from 'prop-types';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import SingleLikedProperty from '../SingleLikedProperty/SingleLikedProperty';
import LikeButton from '../LikeButton/LikeButton';

class LikedProperties extends React.Component {
  state = {
    likedProperties:[],
  }

  componentDidMount(){
   this.getAllLikedProperties();
  }

  getAllLikedProperties= () => {
    likedPropertyRequests.getAllLikedProperties()
    .then((likedProperties) => {
      this.setState({likedProperties});
    });
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
      </div>
    )
  }
}

export default LikedProperties;