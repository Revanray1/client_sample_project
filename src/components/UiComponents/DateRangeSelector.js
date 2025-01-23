import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
                    <DatePicker
                    className="color-black"
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    dateFormat="MM-dd-yyyy" 
                    placeholderText='Select From Date'
                      />
                </div>
                <div className="form-group form-groups-outer">
                    <label className='color-black font-weight-bold'>To</label>
                    <DatePicker
                    className="color-black"
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    dateFormat="MM-dd-yyyy" 
                    placeholderText='Select To Date'
                    />
                </div>

                <div className="date-range-button-group">
                    <button className="date-action-button" onClick={onCreateReport}>Search</button>
                    <button className="date-action-button" onClick={handleClearFields}>Clear Fields</button>
                </div>
            </div>
            </div>
    </>);
};
export default DateRangeSelector