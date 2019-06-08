import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

class MyModal extends React.Component {
  static propTypes = {
    toggleModal: PropTypes.func,
    modal: PropTypes.bool,
  }

  toggleEvent = () => {
    const { toggleModal } = this.props;
    toggleModal();
  }

  render() {
    const {
      modal,
    } = this.props;

    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggleEvent} paymentAccount={paymentAccount} className="modal-lg">
        <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>{paymentAccount.accountName}}</ModalHeader>
        <ModalBody className="text-center modal-body">
        <div className="paymentMethod-card border border-dark rounded" id={paymentAccount.id}>
          <div className="ml-1">Account Number: {paymentAccount.accountNumber}</div>
          <div className="ml-1">Exp Date: {paymentAccount.expirationDate}</div>
          <div className="ml-1">CVV: {paymentAccount.CVV}</div>
          </div>
        </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default MyModal;
