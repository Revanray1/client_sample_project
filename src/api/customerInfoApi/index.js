import axiosInstance from '../config/axiosConfig';

export const  fetchCustomerDetail = async (id) => {
    try {
        const response = await axiosInstance.get(`/Customer/GetCustomers`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching customer files:', error);
        throw error; 
    }
};



