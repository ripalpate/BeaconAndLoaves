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

const getAllRentalsByPropertyIdWithTotals = id => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/propertyTotals/${id}`)
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

const getFutureOwnerRentals = ownerId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/futureRentals/${ownerId}`)
    .then((results) => {
      const ownerRentals = results.data;
      resolve(ownerRentals);
    }).catch((error) => {
      reject(error);
    });
});

const getPastOwnerRentals = ownerId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/pastRentals/${ownerId}`)
    .then((results) => {
      const ownerPastRentals = results.data;
      resolve(ownerPastRentals);
    }).catch((error) => {
      reject(error);
    });
});

// const getTotalAmountPerMonth = (ownerId, propertyId) => new Promise((resolve, reject) => {
//   axios.get(`${apiUrl}/sales/${ownerId}?propertyId=${propertyId}`)
//     .then((results) => {
//       console.log(results);
//       const totalSalesPerProperty = results.data;
//       resolve(totalSalesPerProperty);
//     }).catch((error) => {
//       reject(error);
//     });
// });

const getAllRentalsForSingleProperty = (ownerId, propertyId) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/allRentals/${ownerId}?propertyId=${propertyId}`)
    .then((results) => {
      const allRentalsRelatedToProperty = results.data;
      resolve(allRentalsRelatedToProperty);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  createRental,
  getAllRentalsByPropertyId,
  getFutureRentalsByUserId,
  getPastRentalsByUserId,
  getFutureOwnerRentals,
  getPastOwnerRentals,
  getSingleRental,
  getAllRentalsForSingleProperty,
  updateRental,
  getAllRentalsByPropertyIdWithTotals,
};
