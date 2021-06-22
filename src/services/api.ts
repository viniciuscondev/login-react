import axios from 'axios';

const api = axios.create({
    baseURL: 'https://viniciuscondev-node-login.herokuapp.com/'
});

export default api;