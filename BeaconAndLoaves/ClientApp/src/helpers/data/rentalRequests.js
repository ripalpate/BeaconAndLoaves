import axios from 'axios';

const apiUrl = '/api/rentals';

const getAllRentalsByPropertyId = id => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/property/${id}`)
    .then((results) => {
      const rentalsObject = results.data;
      resolve(rentalsObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getFutureRentalsByUserId = id => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/future/${id}`)
    .then((results) => {
      const rentalsByUserIdObject = results.data;
      resolve(rentalsByUserIdObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getPastRentalsByUserId = id => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/past/${id}`)
    .then((results) => {
      const rentalsByUserIdObject = results.data;
      resolve(rentalsByUserIdObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleRental = rentalId => axios.get(`${apiUrl}/${rentalId}`);

const createRental = rentalObject => axios.post(`${apiUrl}`, (rentalObject));

const updateRental = (rentalId, rentalObject) => axios.put(`${apiUrl}/${rentalId}`, rentalObject);

export default {
  createRental,
  getAllRentalsByPropertyId,
  getFutureRentalsByUserId,
  getPastRentalsByUserId,
  getSingleRental,
};
