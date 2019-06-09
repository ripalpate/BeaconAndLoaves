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
    price: '',
  };

class EditProperty extends React.Component {
    state = {
      editedProperty: defaultProperty,
      currentUser: [],
      editId: '-1',
      }

      componentDidMount(){
        const uid = authRequests.getCurrentUid();
        userRequests.getSingleUser(uid)
          .then((currentUser) => {
            this.setState({ currentUser:currentUser.data });
          })
        this.getSinglePropertyToEdit();
      }
    
      getSinglePropertyToEdit = () => {
          const propertyId = this.props.match.params.id;
          propertiesRequests.getSingleProperty(propertyId)
          .then((property)=>{
              this.setState({editedProperty: property});
              this.setState({editId: propertyId});
          }).catch(err => console.error(err));
      }

      formFieldStringState = (name, e) => {
        e.preventDefault();
        const tempProperty = { ...this.state.editedProperty };
        tempProperty[name] = e.target.value;
        this.setState({ editedProperty: tempProperty });
      }
    
      formFieldNumberState = (number, e) => {
        const tempProperty = { ...this.state.editedProperty };
        tempProperty[number] = e.target.value * 1;
        this.setState({ editedProperty: tempProperty });
      }

      propertyNameChange = e => this.formFieldStringState('propertyName', e);
    
      streetChange = e => this.formFieldStringState('street', e);

      cityChange = e => this.formFieldStringState('city', e);

      stateChange = e => this.formFieldStringState('state', e);

      zipCodeChange = e => this.formFieldStringState('zipCode', e);

      descriptionChange = e => this.formFieldStringState('description', e);

      imageChange = e => this.formFieldStringState('imageUrl', e);

      priceChange = e => this.formFieldStringState('price', e);
    
      typeChange = e => this.formFieldNumberState('type', e);

      formSubmitEvent = (editedProperty) => {
        const { editId } = this.state;
        propertiesRequests.updateProperty(editId, editedProperty)
          .then(() => {
            if(editedProperty.type === 0){
              this.props.history.push(`/lightHouses/${editId}`);
            } else if (editedProperty.type ===1){
              this.props.history.push(`/siloNuclears/${editId}`);
            }
          }).catch(err => console.error(err));
      }
    
      formSubmit = (e) => {
        e.preventDefault();
        const myProperty = { ...this.state.editedProperty };
        myProperty.ownerId = this.state.currentUser.id;
        this.formSubmitEvent(myProperty);
        this.setState({ editedProperty: defaultProperty });
      }

      render() {
        const { editedProperty } = this.state;
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
                  value= {editedProperty.propertyName}
                  onChange= {this.propertyNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Property Type</label>
                    <select 
                    className="form-control" 
                    id="type"
                    value= {editedProperty.type}
                    onChange= {this.typeChange}
                    >
                        <option value="0">Lighthouse</option>
                        <option value="1">Silo Nuclear</option>
                    </select>
              </div>
              <div className="form-group">
                <label htmlFor="street">Street:</label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  aria-describedby="streetHelp"
                  placeholder="123 Main St"
                  value= {editedProperty.street}
                  onChange= {this.streetChange}
                  required
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
                  value= {editedProperty.city}
                  onChange= {this.cityChange}
                  required
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
                  value= {editedProperty.state}
                  onChange= {this.stateChange}
                  required
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
                  value= {editedProperty.zipCode}
                  onChange= {this.zipCodeChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea 
                  className="form-control"   
                  id="description"  
                  value= {editedProperty.description}
                  onChange= {this.descriptionChange} 
                  rows="5"
                  required
                  >
                </textarea>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input
                  type="text"
                  className="form-control"
                  id="imageUrl"
                  aria-describedby="imageHelp"
                  placeholder="www.jrekjr.jpg"
                  value= {editedProperty.imageUrl}
                  onChange= {this.imageChange}
                  required
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
                  value = {editedProperty.price}
                  onChange = {this.priceChange}
                  required
                />
              </div>
              <button className="btn btn-success"> <i className="fas fa-check-square fa-2x"/></button>
            </form>
          </div>
        );
      }
}

export default EditProperty;