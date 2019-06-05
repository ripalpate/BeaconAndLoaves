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
    return(
      <div>
        <h4>Liked Property</h4>
      </div>
    )
  }

}

export default LikedProperties;