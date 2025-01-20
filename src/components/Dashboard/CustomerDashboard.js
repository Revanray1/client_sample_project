import React, { useState, useEffect } from 'react'
import { fetchDashboardCountDetail } from '../../api/dashboardApi/index.js';
import { colors } from '../../utils/color.js';
import ChartViewPage from '../UiComponents/ChartViewPage.js';
import DateRangeSelector from '../UiComponents/DateRangeSelector.js';
import LoaderComponent from '../UiComponents/LoaderComponent.js';
import { formatDateToMMDDYYYY, formatISTDateToYYYYMMDD } from '../../utils/commonFunctions.js';
import Loader from '../UiComponents/Loader.js';

const CustomerDashboard = () => {
    const [dashboardCount, setDashboardCount] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userType, setUserType] = useState(null)
    const [pageLoader, setPageLoader] = useState(true)
    const [reportfromDate, setReportFromDate] = useState(null);
    const [reporttoDate, setReportToDate] = useState(null);
    const [loader, setLoader] = useState(true)
        


    
    const handleCreateReport = (startDate, endDate) => {
         getDashboardCountDetail(1, formatDateToMMDDYYYY(startDate), formatDateToMMDDYYYY(endDate))
    }
    
    const getDashboardCountDetail = async () => {
        const user = localStorage.getItem('userType');
        if (user) {
            setUserType(user)
        }
        try {
            setLoader(true)
            let response = await fetchDashboardCountDetail(1)
            if (user === "Customer") {
                response.forEach(item => {
                    delete item.total999Generated;
                    delete item.total277CAGenerated;
                });
            }
            setLoader(false)
            const updatedData = Object.entries(response[0]).map(([key, value], index) => {
                return { title: getKeyValue(key), value: value }
            })

            setDashboardCount(updatedData);
        } catch (err) {
            setLoader(false)
            console.error('Error fetching claim data:', err)
        }
        setPageLoader(false)
    }

    const getKeyValue = (key) => {
        if (key === 'totalFilesReceived') {
            return 'Total Files Received';
        } else if (key === 'totalClaims') {
            return 'Total Claims';
        } else if (key === 'total999Generated') {
            return 'Total 999 Generated';
        } else if (key === 'total277CAGenerated') {
            return 'Total 277CA Generated';
        } else if (key === 'forwarded') {
            return 'Forwarded';
        } else {
            return 'Unknown';
        }
    };

        useEffect(() => {
            let currentDate = new Date()
            let dateBefore_30 = new Date()
            dateBefore_30.setDate(currentDate.getDate() - 30)
            setReportToDate(formatISTDateToYYYYMMDD(currentDate))
            setReportFromDate(formatISTDateToYYYYMMDD(dateBefore_30))
        }, [])

        
    useEffect(() => {
        if (reportfromDate && reporttoDate) {
            setPageLoader(true)
            getDashboardCountDetail(1, formatDateToMMDDYYYY(reportfromDate), formatDateToMMDDYYYY(reporttoDate))
        }
    }, [reportfromDate, reporttoDate])

    return (<>
        {pageLoader ? <LoaderComponent /> :
            <>
                {dashboardCount &&
                    <>
                        <h5 className='font-weight-bold'>Welcome To Clearing House - Dashboard</h5>
                        <DateRangeSelector reporttoDate={reporttoDate} reportfromDate={reportfromDate} handleCreateReport={handleCreateReport} />

                        {loader ? <Loader /> :
                            <>
                                <div className="dashboard-header gap-2 mt-4">
                                    {dashboardCount.map((data, index) => (<>
                                        <div class="dashboard-box d-flex shadow rounded " style={{ backgroundColor: `` }}>
                                            <div className='dashboard-box-one' style={{ backgroundColor: `rgb(${colors[index]})` }}></div>
                                            <div className='dashboard-text-div'>
                                                <div className='dashboard-inner-content'> <div className='dashboard-box-text'><strong>{data.title}</strong></div></div>
                                                <div className='dashboard-inner-content'> <h4 class=""><strong>{data.value}</strong></h4></div>
                                            </div>
                                        </div>
                                    </>))}
                                </div>
                                <div className='' style={{ height: "300px" }}>
                                    <div className='d-flex'>
                                        <div className='d-flex gap-1 mt-4 '>
                                            <ChartViewPage data={dashboardCount} />
                                            <div>
                                                <div className='' style={{ marginLeft: "10%", marginTop: "50%", display: "flex", textAlign: "left", justifyContent: "center", alignItems: "center", minWidth: "300px" }}>
                                                    <div>
                                                        <div className=''>
                                                            Status Code:
                                                        </div>
                                                        <div>

                                                            <span className='fontsize-18 color-blue' >
                                                                Approved by Clearing House
                                                            </span>
                                                        </div>
                                                        <div>

                                                            <span className='fontsize-18 color-red' >
                                                                Rejected by Clearing House
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className='fontsize-18 color-orange'>
                                                                Approved by Clearing House (EDI 277)
                                                            </span>
                                                        </div>
                                                        {userType !== "Customer" && <div>
                                                            <span className='fontsize-18 color-rose' >
                                                                Rejected by Clearing House (EDI 277)
                                                            </span>
                                                        </div>}
                                                        {userType !== "Customer" && <div>
                                                            <span className='fontsize-18 color-green'>
                                                                Recieved
                                                            </span>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>}
                    </>}
            </>}

    </>)
}

export default CustomerDashboard