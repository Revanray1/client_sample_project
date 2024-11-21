import axiosInstance from '../config/axiosConfig';

export const fetchCustomerFileClaimList = async (FileName) => {
    try {
        const response = await axiosInstance.get(`/Customer/GetCustomerFileClaimList`, {
            params: {
                FileName:FileName
            }
         });
        return response.data; 
    } catch (error) {
        console.error('Error fetching customer files:', error);
        throw error; 
    }
};



