import axiosInstance from '../config/axiosConfig';

export const  fetchDashboardCountDetail = async (id,startDate,endDate) => {
    try {
        const response = await axiosInstance.get(`/Customer/GetDashboardCountDetail?CustomerId=${id}&StartDate=${startDate}&EndDate=${endDate}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching customer files:', error);
        throw error; 
    }
};
