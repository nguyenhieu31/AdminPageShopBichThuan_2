import axios from 'axios';

const API_URL_ORDER = 'http://localhost:8087/api/v1/system/order';

const deleteOrderById = async (orderId) => {
    try {
        const response = await axios.delete(`${API_URL_ORDER}/${orderId}`);

        return response.status;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default deleteOrderById;