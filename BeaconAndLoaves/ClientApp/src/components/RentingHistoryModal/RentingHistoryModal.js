import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import formatDate from '../../helpers/formatDate';

import './RentingHistoryModal.scss';

class RentingHistoryModal extends React.Component {
  static propTypes = {
    toggleModal: PropTypes.func,
    historyModal: PropTypes.bool,
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
    const { toggleRentalModal } = this.props;
    toggleRentalModal();
  }

  render() {
    const {
      historyModal,
      selectedRental,
      numDays,
      changeView,
    } = this.props;

    const makeButtons = () => {
      if (numDays > 30) {
        return (
            <button className="bttn-pill edit-rental-btn mx-auto" onClick={this.editButtonEvent}>
                <i className="fas fa-edit fa-1x" title="Edit Rental"></i>
            </button>
        );
      }
      return <div>Rental is not editable within 30 days of booking.</div>;
    };

    return (
      <div>
        <Modal isOpen={historyModal} toggle={this.toggleEvent} className="modal-lg">
          <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>{selectedRental.propertyName}</ModalHeader>
          <ModalBody className="text-center modal-body renting-history-modal">
            <div>Start Date: {formatDate.formatMDYDate(selectedRental.StartDate)}</div>
            <div>End Date: {formatDate.formatMDYDate(selectedRental.EndDate)}</div>
            <div>{selectedRental.city}, {selectedRental.state}</div>
            <div>Total: ${selectedRental.RentalAmount}</div>
            <div>Owner's Name: <span onClick={changeView}className="property-owner-name">{selectedRental.owner}</span></div>
            <div>Owner's Email: <a href={"mailto:" + selectedRental.ownerEmail}>{selectedRental.ownerEmail}</a></div>
          </ModalBody>
          <ModalFooter className="renting-history-modal-footer">
            {makeButtons()}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RentingHistoryModal;
