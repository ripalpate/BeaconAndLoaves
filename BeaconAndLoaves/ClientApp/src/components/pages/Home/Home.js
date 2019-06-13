import React from 'react';
import './Home.scss';

class Home extends React.Component {
  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  render() {
    return (
      <div className="Home mx-auto">
        <div className="card-deck mt-5">
          <div className="card border-dark" id="profile" onClick={this.changeView}>
            <div className="card-body home text-center">
              <h4 className="card-title"><i className="fas fa-user fa-6x home-user"></i></h4>
              <h5 className="card-subtitle mb-2 text-muted">Profile</h5>
              <p className="card-text">View Profile</p>
            </div>
          </div>
          <div className="card border-dark" id='properties' onClick={this.changeView}>
            <div className="card-body home text-center">
              <h4 className="card-title"><i className="fas fa-building fa-6x home-property"></i></h4>
              <h5 className="card-subtitle mb-2 text-muted">Properties</h5>
              <p className="card-text">Properties To Rent</p>
            </div>
          </div>
          <div className="card border-dark" id='likedProperties' onClick={this.changeView}>
            <div className="card-body home text-center">
              <h4 className="card-title"><i className="fas fa-heart fa-6x home-likedProperties"></i></h4>
              <h5 className="card-subtitle mb-2 text-muted">Liked Properties</h5>
              <p className="card-text">Saved Properties that I like most</p>
            </div>
          </div>
          <div className="card border-dark" id='addProperty' onClick={this.changeView}>
            <div className="card-body home text-center">
              <h4 className="card-title"><i className="fas fa-plus-circle fa-6x home-addProperty"></i></h4>
              <h5 className="card-subtitle mb-2 text-muted">Add Property</h5>
              <p className="card-text">Add your property to rent</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
