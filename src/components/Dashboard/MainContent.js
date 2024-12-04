import React, { useState, useEffect } from 'react'
import { fetchDashboardCountDetail } from '../../api/dashboardApi';
import { colors } from '../../utils/color';
import ChartViewPage from '../UiComponents/ChartViewPage.js';

const MainContent = () => {
    const [dashboardCount, setDashboardCount] = useState(null)



    const getDashboardCountDetail = async () => {
        try {
            const response = await fetchDashboardCountDetail(1)
            const updatedData = Object.entries(response[0]).map(([key, value], index) => {
                return { title: key, value: value }
            })
            setDashboardCount(updatedData);
        } catch (err) {
            console.error('Error fetching claim data:', err)
        }
    }

    useEffect(() => {
        getDashboardCountDetail()
    }, [])

    return (<>
        {dashboardCount &&
            <>
                <div className="dashboard-header gap-2">
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
                        <div className='d-flex gap-1 '>
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
                                        <div>
                                            <span className='fontsize-18 color-rose' >
                                                Rejected by Clearing House (EDI 277)
                                            </span>
                                        </div>
                                        <div>
                                            <span className='fontsize-18 color-green'>
                                                Recieved
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div></>
        }

    </>)
}

export default MainContent