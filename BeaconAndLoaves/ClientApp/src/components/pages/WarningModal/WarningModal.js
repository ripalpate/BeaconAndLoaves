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
  }

  toggleEvent = () => {
    const { toggleModal } = this.props;
    toggleModal();
  }

  render() {
    const {
      modal,
      deleteProfile,
    } = this.props;

    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggleEvent} className="modal-lg">
          <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>Achtung!!!</ModalHeader>
          <ModalBody className="text-center modal-body">
              Are you sure you want to do that?
          </ModalBody>
          <ModalFooter>
            <Button onClick={deleteProfile}>
                <i className="fas fa-trash fa-2x"></i>
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MyModal;
