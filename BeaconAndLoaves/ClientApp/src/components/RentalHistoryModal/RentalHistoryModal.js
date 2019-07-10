import React from 'react';
import {
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

  propertyDetailEvent = () => {
    const { PropertyId } = this.props.selectedRental;
    this.props.propertyDetailView(PropertyId);
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
          <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>
            <span className="property-name" title="Go To Property Detail" onClick={this.propertyDetailEvent}>
              {selectedRental.propertyName}
            </span>
          </ModalHeader>
          <ModalBody className="text-center modal-body rental-history-modal">
            <div>Start Date: {formatDate.formatMDYDate(selectedRental.StartDate)}</div>
            <div>End Date: {formatDate.formatMDYDate(selectedRental.EndDate)}</div>
            <div>{selectedRental.city}, {selectedRental.state}</div>
            <div>Total: ${selectedRental.RentalAmount}</div>
            <div>Renter's Name: {selectedRental.renter}</div>
            <div>Renter's Email: <a href={"mailto:" + selectedRental.renterEmail}>{selectedRental.renterEmail}</a></div>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RentalHistoryModal;
