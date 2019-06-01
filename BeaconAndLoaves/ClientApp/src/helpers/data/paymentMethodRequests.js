import axios from 'axios';

const apiUrl = "/api/UserPayment/";

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

const getSingleUserPayment = userPaymentId => axios.get(`${apiUrl}/${userPaymentId}`);

const deleteUserPayment = userPaymentId => axios.put(`${apiUrl}/remove/${userPaymentId}`);

const createUserPayment = userPaymentObject => axios.post(`${apiUrl}/addPaymentMethod`, (userPaymentObject));

const updateUserPayment = (userPaymentId, userPaymentObject) => axios.put(`${apiUrl}/${userPaymentId}`, userPaymentObject);

export default {
  getAllUserPayments,
  createUserPayment,
  deleteUserPayment,
  updateUserPayment,
  getSingleUserPayment
};