import axiosInstance from '../config/axiosConfig';

export const adminLogin = async (userName, password, customerID, isCustomerLogin) => {
    try {
        const response = await axiosInstance.post(`api/Authentication/customerlogin`, { 
            userName: userName,
            password: password,
            customerID: customerID,
            isCustomerLogin: isCustomerLogin
        });
        return response; 
    } catch (error) {
        console.error('Error fetching customer files:', error);
        return error
    }
};

export const userLogin = async (userName, password, customerID, isCustomerLogin) => {
    try {
        const response = await axiosInstance.post(`api/Authentication/login`, {
                userName: userName,
                password: password,
                customerID: customerID,
                isCustomerLogin: isCustomerLogin
        });
        return response; 
    } catch (error) {
        console.error('Error fetching customer files:', error);
        return error
    }
};

