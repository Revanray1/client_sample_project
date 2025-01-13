import axiosInstance from '../config/axiosConfig';

export const fetchAllUserList = async (id) => {
    try {
        const response = await axiosInstance.get(`/User/GetUserList`);
        return response; 
    } catch (error) {
        console.error('Error fetching customer files:', error);
        throw error; 
    }
};
