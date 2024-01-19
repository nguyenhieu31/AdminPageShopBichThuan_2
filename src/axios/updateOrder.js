import axios from 'axios';

const API_URL_ORDER = 'http://localhost:8087/api/v1/system/edit-order';

const updateOrder = async (orderId, orderData) => {
    const editOrderUrl = `${API_URL_ORDER}/${orderId}`;
    try {
        const response = await axios.put(editOrderUrl, orderData);
        console.log(response);
        return response.status;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default updateOrder;