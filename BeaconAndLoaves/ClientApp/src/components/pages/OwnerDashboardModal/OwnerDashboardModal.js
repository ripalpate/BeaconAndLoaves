import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import formatDate from '../../../helpers/formatDate';
import rentalRequests from '../../../helpers/data/rentalRequests';

class OwnerDashboard extends React.Component {
  static propTypes = {
    toggleModal: PropTypes.func,
    rentingHistoryModal: PropTypes.bool,
    selectedRental: PropTypes.object,
  }

  toggleEvent = () => {
    const { toggleModal } = this.props;
    toggleModal();
  }

  render() {
    const {
      rentingHistoryModal,
      selectedRental,
    } = this.props;

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
            {/* <Button onClick={deleteProfile}>
                <i className="fas fa-trash fa-2x"></i>
            </Button> */}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default OwnerDashboard;
