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
import PaymentMethod from '../PaymentMethod/PaymentMethod';

class SinglePaymentMethodModal extends React.Component {
  static propTypes = {
    togglePaymentModal: PropTypes.func,
    paymentModal: PropTypes.bool,
  }

  state = {
    isEditing: false,
  }

  editPaymentMethod = (e) => {
    const {isEditing}=this.state;
    this.setState({ isEditing: !isEditing });
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

const makeModal = () => {
  const {isEditing}=this.state;
  if(isEditing===false){
    return (      
    <div>
      <Modal isOpen={paymentModal} className="modal-lg" id="paymentMethodModal">
      <ModalHeader class-name="modal-header" toggle={this.togglePaymentEvent}>{paymentAccount.accountName}</ModalHeader>
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
else{
  return(
    <div>
    <Modal isOpen={paymentModal} className="modal-lg" id="paymentMethodModal">
    <ModalHeader class-name="modal-header" toggle={this.togglePaymentEvent}>{paymentAccount.accountName}</ModalHeader>
    <ModalBody className="text-center modal-body">
<PaymentMethod>
  
</PaymentMethod>
    </ModalBody>
    </Modal>
  </div>
  )
}
}

    return (      
      <div>
        {makeModal()}
      </div>
    );
  }
}

export default SinglePaymentMethodModal;
