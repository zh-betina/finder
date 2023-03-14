import axios from 'axios';

export const createAcct = (payload) => {
    return axios.post(`http://127.0.0.1:8000/api/signup/`, payload)
}

export const login = (payload) => {
    return axios.post(`http://127.0.0.1:8000/api/login/`, payload, {headers: { 'Content-Type': 'application/json' }}).catch((err)=> console.log("err : ", err));
}
