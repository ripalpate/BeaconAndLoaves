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

// const getBeansByArrayOfIds = beanIdsArray => new Promise((resolve, reject) => {
//   axios.get(`${firebaseUrl}/beans.json`)
//     .then((result) => {
//       const beansObject = result.data;
//       const beansArray = [];
//       if (beansObject !== null) {
//         Object.keys(beansObject).forEach((bean) => {
//           beansObject[bean].id = bean;
//           beansArray.push(beansObject[bean]);
//         });
//       }
//       const selectedBeans = beansArray.filter(x => beanIdsArray.includes(x.id));
//       resolve(selectedBeans);
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });

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