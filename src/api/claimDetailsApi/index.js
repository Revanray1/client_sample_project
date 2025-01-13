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

export const fetchServiceLinesDetails = async (id) => {
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

export const fetchEdiDetails = async (id) => {
    try {
        const response = await axiosInstance.get(`/Customer/GetClaimEDIContent`, {
            params: {
                ClaimNumber:id
            }
         });
        return response.data; 
    } catch (error) {
        console.error('Error fetching customer files:', error);
        throw error; 
    }
};

export const saveClaimDetails = async(data)=>{
    try{
        const response = await axiosInstance.post(`/CustomerClaim/UpdateClaimPrimaryInfo`,{
            data: data
        });
        return response

    }catch (error){
        console.error('Error saving claim details:', error);
        throw error;
    }
}

export const saveServiceLinestDetails = async (data) => {
    try {
        const response = await axiosInstance.post(`/CustomerClaim/UpdateClaimServiceLine`, {
            data: data
        });
        return response
    } catch (error) {
        console.error('Error saving EDI details:', error);
        throw error;
    }
}