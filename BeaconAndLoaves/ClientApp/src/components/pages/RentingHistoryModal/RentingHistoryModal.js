import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import formatDate from '../../../helpers/formatDate';

import './RentingHistoryModal.scss';

class RentingHistoryModal extends React.Component {
  static propTypes = {
    toggleModal: PropTypes.func,
    rentingHistoryModal: PropTypes.bool,
    selectedRental: PropTypes.object,
    numDays: PropTypes.number,
    isEditing: PropTypes.bool,
    toggleEdit: PropTypes.func,
  }

  toggleEvent = () => {
    const { toggleModal } = this.props;
    toggleModal();
  }

  editButtonEvent = () => {
    const { toggleRentalEdit } = this.props;
    toggleRentalEdit();
  }

  render() {
    const {
      rentingHistoryModal,
      selectedRental,
      numDays,
      isEditing,
    } = this.props;

    const makeButtons = () => {
      if (numDays > 30) {
        return (
            <Button onClick={this.editButtonEvent}>
                <i className="fas fa-edit fa-2x" title="Edit Rental"></i>
            </Button>
        );
      }
      return <div>Rental is not editable within 30 days of booking.</div>;
    };

    const makeModal = () => {
      if (isEditing) {
        return (
              <form className="row edit-form-container border border-dark rounded" onSubmit={this.formSubmit}>
                <h3 className="mx-auto edit-rental-title">Edit Rental</h3>
                <div className="form col-11 mt-2">
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">Email</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Email</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="bob@xxx.com"
                        value={currentUser.email}
                        onChange={this.emailChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Name</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Sumatra Wet Process Gunung Tujuh"
                        value={currentUser.name}
                        onChange={this.nameChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">Street</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Street</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="street"
                        placeholder="123 Main St."
                        value={currentUser.street}
                        onChange={this.streetChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">City</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">City</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Springfield"
                        value={currentUser.city}
                        onChange={this.cityChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">State</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">State</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="TN"
                        value={currentUser.state}
                        onChange={this.stateChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">Zip Code</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Zip Code</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        placeholder="12345"
                        value={currentUser.zipCode}
                        onChange={this.zipCodeChange}
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only">Phone Number</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Phone Number</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        placeholder="615-333-4444"
                        value={currentUser.phoneNumber}
                        onChange={this.phoneNumberChange}
                        />
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn user-add-btn m-5" onClick={this.formSubmit} title="Submit">
                      <i className="fas fa-check-square fa-2x"/>
                    </button>
                    <button id='cancel' type="button" className="btn back-btn m-5" onClick={this.cancel} title="Cancel">
                      <i className="far fa-window-close fa-2x"/>
                    </button>
                  </div>
                </div>
              </form>
        );
      }
    }

    return (
      <div>
        <Modal isOpen={rentingHistoryModal} toggle={this.toggleEvent} className="modal-lg">
          <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>{selectedRental.propertyName}</ModalHeader>
          <ModalBody className="text-center modal-body">
            <div>Start Date: {formatDate.formatMDYDate(selectedRental.StartDate)}</div>
            <div>End Date: {formatDate.formatMDYDate(selectedRental.EndDate)}</div>
            <div>{selectedRental.city}, {selectedRental.state}</div>
            <div>Total: ${selectedRental.RentalAmount}</div>
          </ModalBody>
          <ModalFooter>
            {makeButtons()}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RentingHistoryModal;
