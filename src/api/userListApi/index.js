import axiosInstance from '../config/axiosConfig';

export const addUser = async (data) => {
    try {
        const response = await axiosInstance.post(`/User/AddUser`, data);
        return response; 
    } catch (error) {
        console.error('Error fetching customer files:', error);
        return error
    }
};



