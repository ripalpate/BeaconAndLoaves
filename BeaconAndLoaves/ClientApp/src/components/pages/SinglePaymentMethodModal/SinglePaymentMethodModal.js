/* eslint-disable no-unused-expressions */
import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './SinglePaymentMethodModal.scss';
import PaymentMethodForm from '../PaymentMethodForm/PaymentMethodForm';
import paymentMethodRequests from '../../../helpers/data/paymentMethodRequests';
import formatDate from '../../../helpers/formatDate';

class SinglePaymentMethodModal extends React.Component {
  state = {
    paymentTypes: [],
  };

  static propTypes = {
    togglePaymentModal: PropTypes.func,
    paymentModal: PropTypes.bool,
    isAddingAccount: PropTypes.bool,
    isEditingAccount: PropTypes.bool,
    getUserPaymentAccounts: PropTypes.func,
  }

  cancelPaymentModalEvent = () => {
    this.props.cancelPaymentModal();
  }

  formSubmitEvent = () => {
    this.props.formSubmit();
  }

  paymentTypes = () => {
    paymentMethodRequests.getAllPaymentTypes()
      .then((paymentTypes) => {
        this.setState({ paymentTypes });
      });
  }

  componentDidMount() {
    this.paymentTypes();
  }

  // deletePaymentMethod = (e) => {
  //   const { paymentAccount } = this.props;
  //   paymentMethodRequests.deleteUserPayment(this.paymentAccount.id)
  //     .then(() => {
  //       this.props.history.push('/home');
  //     });
  //   this.props.history.push('/home');
  // }

  render() {
    const { paymentTypes } = this.state;
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
      getUserPaymentAccounts,
    } = this.props;

    const getAccountTypeName = (type) => {
      let paymentName = '';
      for (let i = 0; i < paymentTypes.length; i++) {
        if (type - 1 === i) {
          paymentName = paymentTypes[i];
          // eslint-disable-next-line indent
        }
      }
      return paymentName;
    };

    const deletePaymentMethod = () => {
      paymentMethodRequests.deleteUserPayment(paymentAccount.id)
        .then(() => {
          this.cancelPaymentModalEvent();
          getUserPaymentAccounts();
        });
    };

    // const formatDate = () => {
    //   const expirationDate = new Date(paymentAccount.expirationDate);
    //   const month = (`0${expirationDate.getMonth() + 1}`).slice(-2);
    //   const day = expirationDate.getDate();
    //   const year = expirationDate.getFullYear();
    //   const formattedDate = `${month}/${year}`;
    //   return formattedDate;
    // };

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
        <div className="ml-1">Account Type: {getAccountTypeName(paymentAccount.paymentTypeId)}</div>
        <div className="ml-1">Exp Date: {formatDate.formatMYDate(paymentAccount.expirationDate)}</div>
        <div className="ml-1">CVV: {paymentAccount.cvv}</div>
        <button id='paymentMethod-edit' type="button" className="btn paymentMethod-edit-btn m-1" onClick={toggleEditPaymentModal} title="Edit Account">
            <i className="far fa-edit fa-2x"/>
        </button>
        <button id='paymentMethod-delete' type="button" className="btn paymentMethod-delete-btn m-1" onClick={deletePaymentMethod}>
            <i className="paymentMethod-delete-btn fas fa-trash fa-2x"></i>
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
