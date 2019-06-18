import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './SinglePaymentMethodModal.scss';
import PaymentMethodForm from '../PaymentMethodForm/PaymentMethodForm';

class SinglePaymentMethodModal extends React.Component {
  static propTypes = {
    togglePaymentModal: PropTypes.func,
    paymentModal: PropTypes.bool,
    isAddingAccount: PropTypes.bool,
    isEditingAccount: PropTypes.bool,
  }

  cancelPaymentModalEvent = () => {
    this.props.cancelPaymentModal();
  }

  formSubmitEvent = () => {
    this.props.formSubmit();
  }

  render() {
    const {
      paymentModal,
      paymentAccount,
      changeEditView,
      isEditingAccount,
      isAddingAccount,
      isRegistering,
      toggleEditPaymentModal,
      getAllUserPayments,
      currentUser,
    } = this.props;

    const formatDate = () => {
      const expirationDate = new Date(paymentAccount.expirationDate);
      const month = expirationDate.getMonth() + 1;
      const day = expirationDate.getDate();
      const year = expirationDate.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      return formattedDate;
    };

    const createModalHeader = () => {
      if (isRegistering) {
        return (
              <ModalHeader class-name="modal-header">Add New Account</ModalHeader>
        );
      }
      return (
            <ModalHeader class-name="modal-header" toggle={this.cancelPaymentModalEvent}>Add New Account</ModalHeader>
      );
    };

    const makeModal = () => {
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
        <button id='paymentMethod-edit' type="button" className="btn paymentMethod-edit-btn m-1" onClick={toggleEditPaymentModal} title="Edit Account">
            <i className="far fa-edit fa-2x"/>
        </button>
        </div>
      </ModalBody>
      </Modal>
    </div>
        );
      } if (isEditingAccount === true) {
        return (
          <div>
          <Modal isOpen={paymentModal} className="modal-lg" id="paymentMethodModal">
          <ModalHeader class-name="modal-header" toggle={this.cancelPaymentModalEvent}>Edit Payment Account</ModalHeader>
          <ModalBody className="text-center modal-body">
            <PaymentMethodForm
            isEditingAccount={isEditingAccount}
            paymentAccount={paymentAccount}
            toggleIsEditing={this.toggleIsEditing}
            changeEditView={changeEditView}
            cancelPaymentModalEvent={this.cancelPaymentModalEvent}
            formatDate={formatDate}
            />
          </ModalBody>
          </Modal>
        </div>
        );
      }
      return (
    <div>
    <Modal isOpen={paymentModal} className="modal-lg" id="paymentMethodModal">
    {/* <ModalHeader class-name="modal-header" toggle={this.cancelPaymentModalEvent}>Add New Account</ModalHeader> */}
    {createModalHeader()}
    <ModalBody className="text-center modal-body">
      <PaymentMethodForm
      isEditingAccount={isEditingAccount}
      isRegistering={isRegistering}
      paymentAccount={paymentAccount}
      toggleIsEditing={this.toggleIsEditing}
      changeEditView={changeEditView}
      cancelPaymentModalEvent={this.cancelPaymentModalEvent}
      getAllUserPayments={getAllUserPayments}
      currentUser={currentUser}
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
