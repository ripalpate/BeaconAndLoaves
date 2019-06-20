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
  }

  toggleEvent = () => {
    const { toggleModal } = this.props;
    toggleModal();
  }

  render() {
    const {
      rentingHistoryModal,
      deleteProfile,
      selectedRental,
      numDays,
    } = this.props;

    const makeButtons = () => {
      if (numDays > 30) {
        return (
            <Button onClick={deleteProfile}>
                <i className="fas fa-edit fa-2x" title="Edit Rental"></i>
            </Button>
        );
      }
      return <div>Rental is not editable within 30 days of booking.</div>;
    };

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
