import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import paymentMethodRequests from '../../../helpers/data/paymentMethodRequests';
import './SinglePaymentMethodModal.scss';

class SinglePaymentMethodModal extends React.Component {
  static propTypes = {
    togglePaymentModal: PropTypes.func,
    paymentModal: PropTypes.bool,
  }

  state = {
    isEditing: false,
  }

  editPaymentMethod = (e) => {
    this.setState({ isEditing: true });
  }

  cancel = () => {
    this.setState({ isEditing: false });
  }

  // formSubmit = (e) => {
  //   e.preventDefault();
  //   const { currentUser } = this.state;
  //   const userId = currentUser.id;
  //   userRequests.updateUser(userId, currentUser)
  //     .then(() => {
  //       this.setState({ isEditing: false });
  //     });
  // }

  togglePaymentEvent = () => {
    const { togglePaymentModal } = this.props;
    togglePaymentModal();
  }

  //   getUserPaymentAccount = () => {
  //   paymentMethodRequests.getSingleUserPayment(this.props.selectedAccount)
  //     .then((paymentAccount) => {
  //       this.setState({ paymentAccount: paymentAccount.data })
  //       console.log(paymentAccount.data);
  //     });
  // };

  componentDidMount(){
  }

  render() {
    const {
      paymentModal,    
      paymentAccount,  
      isEditing,
    } = this.props;

    const formatDate = () => {
      const expirationDate = new Date(paymentAccount.expirationDate);
      const month = expirationDate.getMonth() + 1;
      const day = expirationDate.getDate();
      const year = expirationDate.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      return formattedDate;
    }

    return (
      <div>
        <Modal isOpen={paymentModal} className="modal-lg" id="paymentMethodModal">
        <ModalHeader class-name="modal-header" toggle={this.togglePaymentEvent}>{paymentAccount.accountName}</ModalHeader>
        <ModalBody className="text-center modal-body">
        <div className="border border-dark rounded" id={paymentAccount.id}>
          <div className="ml-1">Account Number: {paymentAccount.accountNumber}</div>
          <div className="ml-1">Exp Date: {formatDate()}</div>
          <div className="ml-1">CVV: {paymentAccount.cvv}</div>
          </div>
        </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default SinglePaymentMethodModal;
