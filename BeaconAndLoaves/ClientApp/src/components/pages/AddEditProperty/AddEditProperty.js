import React from 'react';
import propertiesRequests from '../../../helpers/data/propertiesRequests';
import authRequests from '../../../helpers/data/authRequests';
import userRequests from '../../../helpers/data/userRequests';

const defaultProperty = {
    propertyName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    imageUrl: '',
    price: ''
  };

class AddEditProperty extends React.Component {
    state = {
        newProperty: defaultProperty,
        currentUser: []
      }

      componentDidMount(){
        const uid = authRequests.getCurrentUid();
        userRequests.getSingleUser(uid)
          .then((currentUser) => {
            this.setState({ currentUser:currentUser.data });
          });
      }
    
      formFieldStringState = (name, e) => {
        e.preventDefault();
        const tempProperty = { ...this.state.newProperty };
        tempProperty[name] = e.target.value;
        this.setState({ newProperty: tempProperty });
      }
    
      formFieldNumberState = (number, e) => {
        const tempProperty = { ...this.state.newProperty };
        tempProperty[number] = e.target.value * 1;
        this.setState({ newProperty: tempProperty });
      }

      propertyNameChange = e => this.formFieldStringState('propertyName', e);
    
      streetChange = e => this.formFieldStringState('street', e);

      cityChange = e => this.formFieldStringState('city', e);

      stateChange = e => this.formFieldStringState('state', e);

      zipCodeChange = e => this.formFieldStringState('zipCode', e);

      descriptionChange = e => this.formFieldStringState('description', e);

      imageChange = e => this.formFieldStringState('imageUrl', e);

      priceChange = e => this.formFieldStringState('price', e);
    
      formSubmitEvent = (newProperty) => {
        propertiesRequests.createProperty(newProperty)
          .then(() => {
            this.props.history.push('/properties');
          }).catch(err => console.error(err));
      }
    
      formSubmit = (e) => {
        e.preventDefault();
        const myProperty = { ...this.state.newProperty };
        myProperty.ownerId = this.state.currentUser.id;
        myProperty.type = 0;
        this.formSubmitEvent(myProperty);
        this.setState({ newProperty: defaultProperty });
      }
    
    
      render() {
        const { newProperty } = this.state;
        return (
          <div className="NewProperty">
            <h3>Add Property</h3>
            <form onSubmit={this.formSubmit}>
              <div className="form-group">
                <label htmlFor="propertyName">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="propertyName"
                  aria-describedby="nameHelp"
                  placeholder="Rock Bean Lighthouse"
                  value= {newProperty.propertyName}
                  onChange= {this.propertyNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="street">Street:</label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  aria-describedby="streetHelp"
                  placeholder="123 Main St"
                  value= {newProperty.street}
                  onChange= {this.streetChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  aria-describedby="cityHelp"
                  placeholder="Nashville"
                  value= {newProperty.city}
                  onChange= {this.cityChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  aria-describedby="stateHelp"
                  placeholder="TN"
                  value= {newProperty.state}
                  onChange= {this.stateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zipcode:</label>
                <input
                  type="text"
                  className="form-control"
                  id="zipCode"
                  aria-describedby="zipCodeHelp"
                  placeholder="12345"
                  value= {newProperty.zipCode}
                  onChange= {this.zipCodeChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  aria-describedby="descriptionHelp"
                  placeholder="Rock Bean Lighthouse"
                  value= {newProperty.description}
                  onChange= {this.descriptionChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input
                  type="text"
                  className="form-control"
                  id="imageUrl"
                  aria-describedby="imageHelp"
                  placeholder="www.jrekjr.jpg"
                  value= {newProperty.imageUrl}
                  onChange= {this.imageChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price per night </label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  aria-describedby="priceHelp"
                  placeholder="1000.50"
                  value = {newProperty.price}
                  onChange = {this.priceChange}
                />
              </div>
              <button className="btn btn-success">Save Property</button>
            </form>
          </div>
        );
      }
}

export default AddEditProperty;