export const  formatDateToMMDDYYYY= (dateString)=> {

    const date = new Date(dateString);
    
    // Extract the month, day, and year
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    // Return the formatted date as MMDDYYYY
    return `${month}-${day}-${year}`;
}

export const  formatISTDateToYYYYMMDD= (dateString)=> {
    const date = new Date(dateString);
    // Extract the month, day, and year
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    // Return the formatted date as MMDDYYYY
    return `${year}-${month}-${day}`;
}


export const formatDateToYYYYMMDD = (data) => {
    let date = data.split(" ")[0]
    let dateArray = date.split("/")
    return `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`
}

export const DateAndTimeToDAte = (date)=>{
    return date.split('T')[0];
}