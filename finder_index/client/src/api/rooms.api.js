import axios from 'axios';

export const getAmorRooms = () => {
    return axios.get(`http://localhost:8001/chambres`)
}

export const getByzanceRooms = () => {
  return axios.get(`http://localhost:8004/chambres`);
}

export const getCaraibesRooms = () => {
  return axios.get(`http://localhost:5000/chambres`);
}