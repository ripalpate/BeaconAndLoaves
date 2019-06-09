import axios from 'axios';

const apiUrl = '/api/rentals';

const getAllRentalsByPropertyId = id => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/property/${id}`)
    .then((results) => {
      const rentalsObject = results.data;
      console.log(rentalsObject);
      resolve(rentalsObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const createRental = rentalObject => axios.post(`${apiUrl}`, (rentalObject));

export default { createRental, getAllRentalsByPropertyId };
