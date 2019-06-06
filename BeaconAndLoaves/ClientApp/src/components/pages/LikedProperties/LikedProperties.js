import React from 'react';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';

class LikedProperties extends React.Component {
  state = {
    likedProperties:[]
  }

  componentDidMount(){
    likedPropertyRequests.getAllLikedProperties()
      .then((likedProperties) => {
        this.setState({likedProperties});
      })
  }
  render(){
    const singleLikedPropertyComponent = likedProperties.map(likeProperty => (
      <SingleLikedProperty
      likeProperty={likeProperty}
      key = {likePropertye.id}
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