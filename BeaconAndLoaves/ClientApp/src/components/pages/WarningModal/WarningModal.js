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
    } = this.props;

    const populateText = () => {
      if (isDeletingProperty) {
        return (
       <div> Sorry, you will not be able to delete the property as there are future rentals coming up </div>
        );
      } return (
        <div>Are you sure you want to do that?</div>
      );
    };
    const populateDeleteButton = () => {
      if (!isDeletingProperty) {
        return (
        <Button onClick={deleteProfile}>
          <i className="fas fa-trash fa-2x"></i>
        </Button>
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
