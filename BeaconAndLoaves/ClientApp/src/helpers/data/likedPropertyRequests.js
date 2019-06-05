import axios from 'axios';

const apiUrl = '/api/likedProperties';

const createLikedProperty = likedProperty =>  axios.post(`${apiUrl}`, likedProperty);

export default {
    createLikedProperty
}