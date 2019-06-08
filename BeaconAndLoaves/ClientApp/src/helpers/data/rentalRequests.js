import axios from 'axios';

const apiUrl = '/api/rentals';

const createRental = rentalObject => axios.post(`${apiUrl}`, (rentalObject));

export default { createRental };
