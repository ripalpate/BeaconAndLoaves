import React from 'react';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import SingleLikedProperty from '../SingleLikedProperty/SingleLikedProperty';

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

  refreshLikedProperties = () => {
    this.getAllLikedProperties();
  }

  render(){
    const {likedProperties} = this.state;
    const singleLikedPropertyComponent = likedProperties.map(likedProperty => (
      <SingleLikedProperty
      likedProperty={likedProperty}
      key = {likedProperty.id}
      refreshLikedProperties = {this.refreshLikedProperties}
      />
    ));

    return(
      <div className="likedProperty row">
          <div className = "d-flex mx-auto mt-5">
          {singleLikedPropertyComponent}
          </div>
      </div>
    )
  }
}

export default LikedProperties;