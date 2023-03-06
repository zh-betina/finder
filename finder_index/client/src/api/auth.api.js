import axios from 'axios';

export const createAcct = (payload) => {
    return axios.post(`http://127.0.0.1:8000/api/account/`, payload)
}
