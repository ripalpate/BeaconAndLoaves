import axios from 'axios';

const apiUrl = "/api/users";

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

const getSingleUser = userId => axios.get(`${apiUrl}/${userId}`);

const deleteUser = userId => axios.put(`${apiUrl}/${userId}`);

const createUser = userObject => axios.post(`${apiUrl}/register`, (userObject));

const updateUser = (userId, userObject) => axios.put(`${apiUrl}/${userId}`, userObject);

export default {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getSingleUser
};