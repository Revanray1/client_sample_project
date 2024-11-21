import axiosInstance from '../config/axiosConfig';

export const fetchCustomerFiles = async (fromDate, toDate, fileName) => {
    try {
        const response = await axiosInstance.get(`/Customer/GetCustomerFiles`, {
            params: {
                StartDate: fromDate,
                EndDate: toDate,
                FileName: fileName
            }
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching customer files:', error);
        throw error; 
    }
};

