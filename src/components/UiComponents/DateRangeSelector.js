import { useState } from "react";
import './UiComponent.css'
const DateRangeSelector = ({ onCreateReport, onClearFields, handleCreateReport,handleUploadClaim, handleClearFields}) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [fileName, setFileName] = useState('');

    return (<>

<div className="daterange-outer-container">
        <div className="date-range-selectors" >
            <div className="form-group form-groups-outer">
                <label className='color-black font-weight-bold'>From</label>
                <input className='color-black' type="date"  onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="form-group form-groups-outer">
                <label className='color-black font-weight-bold'>To</label>
                <input className='color-black' type="date"  onChange={(e) => setToDate(e.target.value)} />
            </div>

            <div className="date-range-button-group">
                <button className="date-action-button" onClick={"handleCreateReport"}>Create Report</button>
                <button className="date-action-button" onClick={"handleClearFields"}>Clear Fields</button>
            </div>
        </div>
        </div>
    </>);
};
export default DateRangeSelector