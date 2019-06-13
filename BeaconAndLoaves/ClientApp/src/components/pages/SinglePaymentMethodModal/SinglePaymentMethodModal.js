import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './SinglePaymentMethodModal.scss';
import PaymentMethod from '../PaymentMethod/PaymentMethod';

class SinglePaymentMethodModal extends React.Component {
  static propTypes = {
    togglePaymentModal: PropTypes.func,
    paymentModal: PropTypes.bool,
    isAdding: PropTypes.bool,
  }

  state = {
    isEditing: false,
  }

  toggleIsEditing = () => {
    this.setState({ isEditing: false });
  }

  cancelPaymentModalEvent = () => {
    this.props.cancelPaymentModal();
  }

  editPaymentMethod = (e) => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }

  togglePaymentEvent = () => {
    const { togglePaymentModal } = this.props;
    togglePaymentModal();
    this.setState({ isEditing: false });
  }

  componentWillUnmount() {
    this.setState({ isEditing: false });
  }

  render() {
    const {
      paymentModal,
      paymentAccount,
      changeEditView,
      isEditingAccount,
      isAddingAccount,
    } = this.props;

    const formatDate = () => {
      const expirationDate = new Date(paymentAccount.expirationDate);
      const month = expirationDate.getMonth() + 1;
      const day = expirationDate.getDate();
      const year = expirationDate.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      return formattedDate;
    };

    const makeModal = () => {
      const { isEditing } = this.state;
      if (isEditingAccount === false && isAddingAccount === false) {
        return (
    <div>
      <Modal isOpen={paymentModal} className="modal-lg" id="paymentMethodModal">
      <ModalHeader class-name="modal-header" toggle={this.cancelPaymentModalEvent}>{paymentAccount.accountName}</ModalHeader>
      <ModalBody className="text-center modal-body">
      <div className="border border-dark rounded" id={paymentAccount.id}>
        <div className="ml-1">Account Number: {paymentAccount.accountNumber}</div>
        <div className="ml-1">Exp Date: {formatDate()}</div>
        <div className="ml-1">CVV: {paymentAccount.cvv}</div>
        <button id='paymentMethod-edit' type="button" className="btn paymentMethod-edit-btn m-1" onClick={this.editPaymentMethod}>
            <i className="far fa-edit fa-2x"/>
        </button>
        </div>
      </ModalBody>
      </Modal>
    </div>
        );
      }

      return (
    <div>
    <Modal isOpen={paymentModal} className="modal-lg" id="paymentMethodModal">
    <ModalHeader class-name="modal-header" toggle={this.cancelPaymentModalEvent}>{paymentAccount.accountName}</ModalHeader>
    <ModalBody className="text-center modal-body">
      <PaymentMethod
      isEditing={isEditing}
      paymentAccount={paymentAccount}
      toggleIsEditing={this.toggleIsEditing}
      changeEditView={changeEditView}
      editPaymentMethod={this.editPaymentMethod}
      />
    </ModalBody>
    </Modal>
  </div>
      );
    };

    return (
      <div>
        {makeModal()}
      </div>
    );
  }
}

export default SinglePaymentMethodModal;
