import React, { useState, useEffect } from 'react'
import { fetchDashboardCountDetail } from '../../api/dashboardApi/index.js';
import { colors } from '../../utils/color.js';
import ChartViewPage from '../UiComponents/ChartViewPage.js';
import DateRangeSelector from '../UiComponents/DateRangeSelector.js';

const AdminDashboard = () => {
    const [dashboardCount, setDashboardCount] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userType, setUserType] = useState(null)



    const getDashboardCountDetail = async () => {
        try {
            let response = await fetchDashboardCountDetail(1)
            const updatedData = Object.entries(response[0]).map(([key, value], index) => {
                return { title: getKeyValue(key), value: value }
            })
            setDashboardCount(updatedData);
        } catch (err) {
            console.error('Error fetching claim data:', err)
        }
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
        getDashboardCountDetail()
    }, [])


    return (<>
        {dashboardCount &&
            <>
                <h5 className='font-weight-bold'>Welcome To Clearing House - Dashboard</h5>
                <DateRangeSelector />
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
                <div className='' style={{ height: "100%" }}>
                    <div className=''>
                        <div className='d-flex gap-1 mt-4 '>
                            <ChartViewPage data={dashboardCount} />
                            <div style={{ marginLeft: "2%", marginTop: "5%", display: "flex", textAlign: "left", justifyContent: "center", alignItems: "center", minWidth: "300px" }}>
                                <div className='' >
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
                </div></>
        }

    </>)
}

export default AdminDashboard