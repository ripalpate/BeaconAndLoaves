import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

import './WarningModal.scss';

class MyModal extends React.Component {
  static propTypes = {
    toggleModal: PropTypes.func,
    modal: PropTypes.bool,
    deleteProfile: PropTypes.func,
    isDeletingProperty: PropTypes.bool,
    isRenting: PropTypes.bool,
  }

  toggleEvent = () => {
    const { toggleModal } = this.props;
    toggleModal();
  }

  render() {
    const {
      modal,
      deleteProfile,
      isDeletingProperty,
      isRenting,
      isDeletingProfile,
    } = this.props;

    const populateText = () => {
      if (isDeletingProperty) {
        return (
       <div> Sorry, you will not be able to delete the property as there are future rentals coming up </div>
        );
      } if (isRenting) {
        return (
          <div>
            <div>Your selected dates contain unavailable dates.</div>
            <div>Please select another end date.</div>
          </div>
        );
      } return (
        <div>Are you sure you want to do that?</div>
      );
    };
    const populateDeleteButton = () => {
      if (isDeletingProfile) {
        return (
        <button type="button" onClick={deleteProfile} className="bttn-pill delete-profile-confirm-btn">
          <i className="fas fa-trash fa-1x"></i>
        </button>
        );
      } return (<div></div>);
    };
    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggleEvent} className="modal-lg">
          <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>Achtung!!!</ModalHeader>
          <ModalBody className="text-center modal-body">
             {populateText()}
          </ModalBody>
          <ModalFooter>
            {populateDeleteButton()}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MyModal;
