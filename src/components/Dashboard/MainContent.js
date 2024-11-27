import React, { useState, useEffect } from 'react'
import { fetchDashboardCountDetail } from '../../api/dashboardApi';
import { colors } from '../../utils/color';

const MainContent = () => {
    const [dashboardCount, setDashboardCount] = useState(null)



    const getDashboardCountDetail = async () => {
        try {
            const response = await fetchDashboardCountDetail(1)
            setDashboardCount(response[0]);
        } catch (err) {
            console.error('Error fetching claim data:', err)
        }
    }

    useEffect(() => {
        getDashboardCountDetail()
    }, [])

    return (
        <div className="dashboard-header gap-2">

            {dashboardCount && Object.entries(dashboardCount).map(([key, value], index) => (<>
                <div class="dashboard-box d-flex shadow rounded " style={{ backgroundColor: `` }}>
                    <div className='dashboard-box-one' style={{ backgroundColor: `rgb(${colors[index]})` }}></div>
                    <div className='dashboard-text-div'>
                        <div className='dashboard-inner-content'> <div className='dashboard-box-text'><strong>{key}</strong></div></div>
                        <div className='dashboard-inner-content'> <h4 class=""><strong>{value}</strong></h4></div>
                    </div>
                </div>
            </>))
            }
        </div>
    )
}

export default MainContent