import React from 'react';
import PropTypes from 'prop-types';
import likedPropertyRequests from '../../../helpers/data/likedPropertyRequests';
import './LikeButton.scss';

class LikeButton extends React.Component {
  state =
  {
    currentLikedProperty: [],
    likedProperties: [],
  }

    static propTypes = {
      isLiked: PropTypes.bool,
      changeIsLikedState: PropTypes.func,
      propertyId: PropTypes.number,
      userId: PropTypes.number,
    }

    getAllLikedProperties = () => {
      likedPropertyRequests.getAllLikedPropertiesWithUser()
        .then((likedProperties) => {
          this.setState({ likedProperties });
        });
    }

    componentDidMount() {
      this.getAllLikedProperties();
    }

    changeIsLikedStateEvent = () => {
      const { changeIsLikedState } = this.props;
      this.addLikedProperties();
      changeIsLikedState();
    };

      addLikedProperties = () => {
        const { userId, propertyId, isLiked } = this.props;
        const myLikedProperty = {
          userId,
          propertyId,
        };
        if (!isLiked) {
          likedPropertyRequests.createLikedProperty(myLikedProperty)
            .then((likedProperty) => {
              this.setState({ currentLikedProperty: likedProperty.data });
            });
        } else {
          this.deleteLikedProperties();
        }
      }

      deleteLikedProperties = () => {
        // const { likedProperties } = this.state;
        const { userId, propertyId } = this.props;
        likedPropertyRequests.getAllLikedPropertiesWithUser()
          .then((likedProperties) => {
            const filterMatchingProperty = likedProperties.filter(lp => lp.userId === userId && lp.propertyId === propertyId);
            const likedPropertyId = filterMatchingProperty[0].id;
            likedPropertyRequests.deleteLikedProperty(likedPropertyId)
              .then(() => {
                // this.getAllLikedProperties();
              });
          });
      }

      render() {
        const { isLiked } = this.props;
        const makeLikedPropertyButton = () => {
          if (isLiked === false) {
            return (
                <button className="btn float-right" onClick={this.changeIsLikedStateEvent}><i id="!isLiked" className="far fa-heart fa-2x"/></button>
            );
          }
          return (
                <button className="btn float-right" onClick={this.changeIsLikedStateEvent}><i id="isLiked" className="far fa-heart fa-2x"/></button>
          );
        };
        return (
            <div>{makeLikedPropertyButton()}</div>
        );
      }
}

export default LikeButton;
