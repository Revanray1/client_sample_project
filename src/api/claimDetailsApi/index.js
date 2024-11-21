import axiosInstance from '../config/axiosConfig';

export const fetchCustomerClaimDetails = async (id) => {
    try {
        const response = await axiosInstance.get(`/Customer/GetClaimDetail`, {
            params: {
                ClaimId:id
            }
         });
        return response.data; 
    } catch (error) {
        console.error('Error fetching customer files:', error);
        throw error; 
    }
};

export const fetchServiceLinesDeatails = async (id) => {
    try {
        const response = await axiosInstance.get(`/Customer/GetClaimProcedureDetail`, {
            params: {
                ClaimId:id
            }
         });
        return response.data; 
    } catch (error) {
        console.error('Error fetching customer files:', error);
        throw error; 
    }
};