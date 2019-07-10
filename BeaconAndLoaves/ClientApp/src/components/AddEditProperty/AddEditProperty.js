import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import propertiesRequests from '../../helpers/data/propertiesRequests';
import authRequests from '../../helpers/data/authRequests';
import userRequests from '../../helpers/data/userRequests';

import './AddEditProperty.scss';

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

class AddEditProperty extends React.Component {
    state = {
      newProperty: defaultProperty,
      currentUser: [],
    }

    static propTypes = {
      isEditing: PropTypes.bool,
      modal: PropTypes.bool,
      togglePropertyModal: PropTypes.func,
      changeAddEditView: PropTypes.func,
    }

    componentDidMount() {
      const uid = authRequests.getCurrentUid();
      userRequests.getSingleUser(uid)
        .then((currentUser) => {
          this.setState({ currentUser: currentUser.data });
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

      typeChange = e => this.formFieldNumberState('type', e);

      formSubmit = (e) => {
        const { togglePropertyModal, changeAddEditView, isEditing } = this.props;
        const { newProperty } = this.state;
        e.preventDefault();
        const myProperty = { ...this.state.newProperty };
        myProperty.ownerId = this.state.currentUser.id;
        if (isEditing) {
          propertiesRequests.updateProperty(myProperty.id, myProperty)
            .then(() => {
              this.setState({ newProperty: defaultProperty }, togglePropertyModal());
            });
        } else {
          propertiesRequests.createProperty(myProperty)
            .then(() => {
              if (newProperty.type === 1) {
                this.setState({ newProperty: defaultProperty }, togglePropertyModal());
                changeAddEditView('properties/siloNuclears');
              } else {
                this.setState({ newProperty: defaultProperty }, togglePropertyModal());
                changeAddEditView('properties/lightHouses');
              }
            });
        }
      }

      componentWillReceiveProps(props) {
        const { isEditing, selectedProperty } = props;
        if (isEditing) {
          this.setState({ newProperty: selectedProperty });
        }
      }

      render() {
        const { newProperty } = this.state;

        const { addEditingModal, isEditing, togglePropertyModal } = this.props;

        const makeHeader = () => {
          if (isEditing) {
            return (
              <div>Edit Property</div>
            );
          }
          return (
            <div>Add Property</div>
          );
        };

        const makeButton = () => {
          if (isEditing) {
            return (
              <div className="mx-auto">
                <button className="bttn-pill user-add-btn my-auto mx-auto" title="Submit">
                  <i className="fas fa-check-circle edit" />
                </button>
              </div>
            );
          }
          return (
            <div className="mx-auto">
              <button className="bttn-pill user-add-btn my-auto mx-auto" title="Submit">
                <i className="fas fa-plus-circle" />
              </button>
            </div>
          );
        };

        return (
          <div className="new-property m-5 text-center">
            <Modal isOpen={addEditingModal} className="modal-lg">
              <ModalHeader class-name="modal-header" toggle={togglePropertyModal}>{makeHeader()}</ModalHeader>
                <ModalBody className="text-center modal-body addEditPropertyModal">
            <form className="row border border-dark rounded mx-auto" onSubmit={this.formSubmit}>
              <div className="form col-11 mt-2">
                <div className="col-auto form-lines p-0">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">Name:</div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="propertyName"
                      aria-describedby="nameHelp"
                      placeholder="Rock Bean Lighthouse"
                      value= {newProperty.propertyName}
                      onChange= {this.propertyNameChange}
                      required
                    />
                </div>
              </div>
              <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">Property Type:</div>
                    </div>
                    <select
                    className="form-control"
                    id="type"
                    value= {newProperty.type}
                    onChange= {this.typeChange}
                    required
                    >
                      <option value="0">Lighthouse</option>
                      <option value="1">Silo Nuclear</option>
                    </select>
                </div>
              </div>
              <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">Street:</div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    aria-describedby="streetHelp"
                    placeholder="123 Main St"
                    value= {newProperty.street}
                    onChange= {this.streetChange}
                    required
                  />
                </div>
              </div>
              <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">City:</div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    aria-describedby="cityHelp"
                    placeholder="Nashville"
                    value= {newProperty.city}
                    onChange= {this.cityChange}
                    required
                  />
                </div>
              </div>
              <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">State:</div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    aria-describedby="stateHelp"
                    placeholder="TN"
                    value= {newProperty.state}
                    onChange= {this.stateChange}
                    required
                  />
                </div>
              </div>
              <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">Zipcode:</div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    aria-describedby="zipCodeHelp"
                    placeholder="12345-6789"
                    value= {newProperty.zipCode}
                    onChange= {this.zipCodeChange}
                    pattern="^[0-9]{5}(?:-[0-9]{4})?$"
                    required
                  />
                </div>
              </div>
              <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">Description:</div>
                  </div>
                  <textarea
                    className="form-control"
                    id="description"
                    value= {newProperty.description}
                    onChange= {this.descriptionChange}
                    rows="5"
                    required
                    >
                  </textarea>
                </div>
              </div>
              <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">Image:</div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    aria-describedby="imageHelp"
                    placeholder="www.jrekjr.jpg"
                    value= {newProperty.imageUrl}
                    onChange= {this.imageChange}
                    required
                  />
                </div>
              </div>
              <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">Nightly Rate:</div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    aria-describedby="priceHelp"
                    placeholder="1000.50"
                    value = {newProperty.price}
                    onChange = {this.priceChange}
                    required
                  />
                </div>  
              </div>
              <div className="pb-2">{makeButton()}</div>
              </div>
            </form>
              </ModalBody>
            </Modal>
          </div>
        );
      }
}

export default AddEditProperty;
