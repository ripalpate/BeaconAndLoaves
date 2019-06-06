import React from 'react';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import SingleLikedProperty from '../SingleLikedProperty/SingleLikedProperty';
import propertiesRequests from '../../../helpers/data/propertiesRequests';

class LikedProperties extends React.Component {
  state = {
    likedPropertyDetails:[]
  }

  componentDidMount(){
   this.getAllLikedProperties();
  }

  getAllLikedProperties= () => {
    likedPropertyRequests.getAllLikedProperties()
    .then((likedProperties) => {
      propertiesRequests.getProperties()
      .then((properties)=>{
        const likedPropertyDetails = properties.map((property => property.id === likedProperty.propertyId);
        console.log(likedPropertyDetails);
      })
      this.setState({likedProperties});
    })
  } 
  render(){
    // const {likedProperties} = this.state;
    // const singleLikedPropertyComponent = likedProperties.map(likedProperty => (
    //   <SingleLikedProperty
    //   likedProperty={likedProperty}
    //   key = {likedProperty.id}
    //   />
    // ));

    return(
      <div className="likedProperty row">
          <div className = "d-flex mx-auto mt-5">What</div>
      </div>
    )
  }
}

export default LikedProperties;