import axios from 'axios';

export const getAmorRooms = () => {
    return axios.get(`http://localhost:8001/chambres`)
}
