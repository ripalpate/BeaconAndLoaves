import React from 'react';
import AddEditProperty from '../../AddEditProperty/AddEditProperty';

import './Home.scss';

class Home extends React.Component {
  state = {
    addEditingModal: false,
    isEditing: false,
  }

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  changeAddEditView = (view) => {
    this.props.history.push(`/${view}`);
  }

  togglePropertyModal = () => {
    const { addEditingModal } = this.state;
    this.setState({ addEditingModal: !addEditingModal });
  }

  render() {
    const { addEditingModal, isEditing } = this.state;

    return (
      <div className="Home mx-auto">
        <div className="card-columns homeWrapper mt-5">
          <div className="card mt-3 border-dark" id="profile" onClick={this.changeView}>
            <div className="card-body home text-center">
              <h4 className="card-title"><i className="fas fa-user fa-6x home-user"></i></h4>
              <h5 className="card-subtitle mb-2 text-muted">Profile</h5>
              <p className="card-text">View Profile</p>
            </div>
          </div>
          <div className="card mt-3 border-dark" id='likedProperties' onClick={this.changeView}>
            <div className="card-body home text-center">
              <h4 className="card-title"><i className="fas fa-heart fa-6x home-likedProperties"></i></h4>
              <h5 className="card-subtitle mb-2 text-muted">Liked Properties</h5>
              <p className="card-text">Saved Properties that I like most</p>
            </div>
          </div>
          <div className="card mt-3 border-dark" id='properties' onClick={this.changeView}>
            <div className="card-body home text-center">
              <h4 className="card-title"><i className="fas fa-building fa-6x home-property"></i></h4>
              <h5 className="card-subtitle mb-2 text-muted">Properties</h5>
              <p className="card-text">Properties To Rent</p>
            </div>
          </div>
          <div className="card mt-3 border-dark" id='addProperty' onClick={this.togglePropertyModal}>
            <div className="card-body home text-center">
              <h4 className="card-title"><i className="fas fa-plus-circle fa-6x home-addProperty"></i></h4>
              <h5 className="card-subtitle mb-2 text-muted">Add Property</h5>
              <p className="card-text">Add your property to rent</p>
            </div>
          </div>
        </div>
        <AddEditProperty
          addEditingModal={addEditingModal}
          isEditing={isEditing}
          togglePropertyModal={this.togglePropertyModal}
          changeAddEditView={this.changeAddEditView}
        />
      </div>
    );
  }
}

export default Home;
