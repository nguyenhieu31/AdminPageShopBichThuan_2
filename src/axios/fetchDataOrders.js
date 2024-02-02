import axios from 'axios';

const API_URL_ORDER = 'http://localhost:8087/api/v1/system';

const fetchDataOrders = async (path) => {
    try {
        const response = await axios.get(`${API_URL_ORDER}/${path}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default fetchDataOrders;
