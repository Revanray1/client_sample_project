import { useEffect, useState } from "react";
import './UiComponent.css'
const DateRangeSelector = ({ reportfromDate, reporttoDate, handleCreateReport}) => {
    const [fromDate, setFromDate] = useState(reportfromDate);
    const [toDate, setToDate] = useState(reporttoDate);

        const handleClearFields =()=>{
            setFromDate('');
            setToDate('');
         }
         const onCreateReport =()=>{
            handleCreateReport(fromDate, toDate)
         }

    return (<>
    <div className="daterange-outer-container">
            <div className="date-range-selectors" >
                <div className="form-group form-groups-outer">
                    <label className='color-black font-weight-bold'>From</label>
                    <input className='color-black' type="date"  onChange={(e) => setFromDate(e.target.value)}  defaultValue={reportfromDate} value={fromDate}/>
                </div>
                <div className="form-group form-groups-outer">
                    <label className='color-black font-weight-bold'>To</label>
                    <input className='color-black' type="date"  onChange={(e) => setToDate(e.target.value)} defaultValue={reporttoDate} value={toDate}/>
                </div>

                <div className="date-range-button-group">
                    <button className="date-action-button" onClick={onCreateReport}>Create Report</button>
                    <button className="date-action-button" onClick={handleClearFields}>Clear Fields</button>
                </div>
            </div>
            </div>
    </>);
};
export default DateRangeSelector