import axios from 'axios';

const apiUrl = '/api/UserPayment';

const apiUrlPaymentType = '/api/PaymentType';

const getAllUserPayments = () => new Promise((resolve, reject) => {
  axios.get(apiUrl)
    .then((results) => {
      const userPaymentsObject = results.data;
      resolve(userPaymentsObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getAllPaymentTypes = () => new Promise((resolve, reject) => {
  axios.get(apiUrlPaymentType)
    .then((results) => {
      const paymentTypesObject = results.data;
      resolve(paymentTypesObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleUserPayment = userPaymentId => axios.get(`${apiUrl}/${userPaymentId}`);

const deleteUserPayment = userPaymentId => axios.delete(`${apiUrl}/remove/${userPaymentId}`);

const createUserPayment = userPaymentObject => axios.post(`${apiUrl}/addPaymentMethod`, (userPaymentObject));

const updateUserPayment = (userPaymentId, userPaymentObject) => axios.put(`${apiUrl}/${userPaymentId}`, userPaymentObject);

export default {
  getAllUserPayments,
  createUserPayment,
  deleteUserPayment,
  updateUserPayment,
  getSingleUserPayment,
  getAllPaymentTypes,
};
