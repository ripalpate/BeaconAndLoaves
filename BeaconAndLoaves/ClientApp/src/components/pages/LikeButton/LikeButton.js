import React from 'react';
import PropTypes from 'prop-types';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import './LikeButton.scss';

class LikeButton extends React.Component {
  state = 
  {
    currentLikedProperty:[],
    likedProperties: []
  }
    static propTypes = {
        isLiked: PropTypes.bool,
        changeIsLikedState: PropTypes.func,
        propertyId: PropTypes.number,
        userId: PropTypes.number
    }

    changeIsLikedStateEvent = () => {
      const {changeIsLikedState} = this.props;
      this.addLikedProperties();
      changeIsLikedState();
      }

      addLikedProperties = () => {
        const { userId, propertyId, isLiked} = this.props;
        const myLikedProperty = {
          userId: userId,
          propertyId: propertyId,
        };
        if (!isLiked) {
          likedPropertyRequests.createLikedProperty(myLikedProperty)
            .then((myLikedProperty) => {
              this.setState({ currentLikedProperty: myLikedProperty.data });
            });
        } else {
          this.deleteLikedProperties();
        }
      }

      getAllLikedProperties = () => {
        likedPropertyRequests.getAllLikedProperties()
        .then((likedProperties)=> {
          this.setState({likedProperties});
        })
      }

      componentDidMount(){
        this.getAllLikedProperties();
      }

      deleteLikedProperties = () => {
        const { likedProperties } = this.state;
        const {userId, propertyId} = this.props;
        const filterMatchingProperty = likedProperties.filter(lp => lp.userId ===userId && lp.propertyId === propertyId );
        const likedPropertyId=filterMatchingProperty[0].id;
        likedPropertyRequests.deleteLikedProperty(likedPropertyId);
      }
    render(){
        const{ isLiked } = this.props;
        const makeLikedPropertyButton = () => {
            if ( isLiked === false) {
              return (
                <button className="btn float-right" onClick={this.changeIsLikedStateEvent}><i id="!isLiked" className="far fa-heart fa-2x"/></button>
              );
            } else if ( isLiked === true) {
              return (
                <button className="btn float-right" onClick={this.changeIsLikedStateEvent}><i id="isLiked" className="far fa-heart fa-2x"/></button>
              );
            } 
          };
        return(
            <div>{makeLikedPropertyButton()}</div>
        );
    }
}

export default LikeButton;