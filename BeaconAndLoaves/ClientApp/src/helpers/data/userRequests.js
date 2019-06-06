import axios from 'axios';

const apiUrl = '/api/users';

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(apiUrl)
    .then((results) => {
      const usersObject = results.data;
      resolve(usersObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getUserPaymentAccounts = id => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/payment/${id}`)
    .then((results) => {
      const userPaymentAccountsObject = results.data;
      resolve(userPaymentAccountsObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getUserProperties = id => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/property/${id}`)
    .then((results) => {
      const userPropertiesObject = results.data;
      resolve(userPropertiesObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleUser = userId => axios.get(`${apiUrl}/${userId}`);

const getBasicSingleUser = userId => axios.get(`${apiUrl}/basic/${userId}`);

const deleteUser = userId => axios.put(`${apiUrl}/${userId}`);

const createUser = userObject => axios.post(`${apiUrl}/register`, (userObject));

const updateUser = (userId, userObject) => axios.put(`${apiUrl}/${userId}`, userObject);

const getSingleUserPayment = userId => axios.get(`api/userpayment/${userId}`);

export default {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getSingleUser,
  getBasicSingleUser,
  getSingleUserPayment,
  getUserPaymentAccounts,
  getUserProperties,
};
