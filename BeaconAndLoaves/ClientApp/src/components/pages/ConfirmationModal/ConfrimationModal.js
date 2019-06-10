import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

import './ConfirmationModal.scss';

class MyModal extends React.Component {
  static propTypes = {
    toggleModal: PropTypes.func,
    modal: PropTypes.bool,
    rentProperty: PropTypes.func,
    rental: PropTypes.object,
  }

  toggleEvent = () => {
    const { toggleModal } = this.props;
    toggleModal();
  }

  render() {
    const {
      modal,
      rentProperty,
      startDate,
      endDate,
      rentalTotal,
      propertyToRent,
      accountName,
    } = this.props;

    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggleEvent} className="modal-lg">
          <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>Rental Confirmation</ModalHeader>
          <ModalBody className="text-center modal-body">
              <h3>Please Confirm Your Information</h3>
              <h6 className="text-center">{propertyToRent.propertyName}</h6>
                <div className="ml-1">Street: {propertyToRent.street}</div>
                <div className="ml-1">City: {propertyToRent.city}</div>
                <div className="ml-1">State: {propertyToRent.state}</div>
                <div className="ml-1">Zipcode: {propertyToRent.zipCode}</div>
                <div className="ml-1">Start Date: {startDate}</div>
                <div className="ml-1">End Date: {endDate}</div>
                <div className="ml-1">Price: ${rentalTotal}</div>
                <div className="ml-1">From Account: {accountName}</div>

          </ModalBody>
          <ModalFooter>
            <Button onClick={rentProperty} className="bttn-pill bttn-md bttn-primary mb-3">
                Rent Me!!!
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MyModal;
