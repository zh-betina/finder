import axios from 'axios';

export const getRooms = () => {
    return axios.get(`http://127.0.0.1:8000/api/hotels`);
}

export const getAvailableRooms = (payload)=> {
    const start = payload.start;
    const end = payload.end;
    const peopleNb = payload.peopleNb;

    return axios.get(`http://127.0.0.1:8000/api/available?start=${start}&end=${end}&nb=${peopleNb}`);
}