import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import formatDate from '../../helpers/formatDate';

import './RentalHistoryModal.scss';

class RentalHistoryModal extends React.Component {
  static propTypes = {
    toggleModal: PropTypes.func,
    selectedRental: PropTypes.object,
    modal: PropTypes.bool,
  }

  toggleEvent = () => {
    const { toggleModal } = this.props;
    toggleModal();
  }

  render() {
    const {
      selectedRental,
      modal,
    } = this.props;

    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggleEvent} className="modal-lg">
          <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>{selectedRental.propertyName}</ModalHeader>
          <ModalBody className="text-center modal-body">
            <div>Start Date: {formatDate.formatMDYDate(selectedRental.StartDate)}</div>
            <div>End Date: {formatDate.formatMDYDate(selectedRental.EndDate)}</div>
            <div>{selectedRental.city}, {selectedRental.state}</div>
            <div>Total: ${selectedRental.RentalAmount}</div>
            <div>Renter's Name: {selectedRental.name}</div>
            <div>Renter's Email: {selectedRental.email}</div>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RentalHistoryModal;
