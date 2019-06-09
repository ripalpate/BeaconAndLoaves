import React from 'react';
import './LikeButton.scss';

class LikeButton extends React.Component {
    state = {
        isLiked: false,
    }
    

    changeIsLikedState = (e) => {
        e.preventDefault();
        const { isLiked } = this.state;
        this.setState({ isLiked: !isLiked });
      }

    render(){
        const{isLiked} = this.state;
        const makeLikedPropertyButton = () => {
            if (isLiked === false) {
              return (
                <button className="btn float-right" onClick={this.changeIsLikedState}><i id="!isLiked" className="far fa-heart fa-2x"/></button>
              );
            } else if (isLiked === true) {
              return (
                <button className="btn float-right" onClick={this.changeIsLikedState}><i id="isLiked" className="far fa-heart fa-2x"/></button>
              );
            } 
          };
        return(
            <div>{makeLikedPropertyButton()}</div>
        );
    }
}

export default LikeButton;