import React from 'react'
import { formatDateToYYYYMMDD } from '../../utils/commonFunctions'

const ServiceLines = ({data,index,handleInputChange}) => {
    return (
        <div>
            <div className='mt-3' >
                <details className='details'>
                    <summary className='claimdetails-summary-header'>
                        <div className='font-weight-bold fontsize-12 d-flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg>
                            <span>LINE {index+1}</span>
                        </div>
                    </summary>

                    <div className='mt-3'>
                        <div className='d-flex gap-3 overflow-x-auto custom-scroll'>
                            <div className='text-start'>
                                <div className="width-max-content">
                                    <input disabled={false} type="text" name="claimId" value={(data?.claimId !== "" ? data?.claimId : "-")}  onChange={(e)=>handleInputChange(e,"SERVICE")} />
                                </div>
                                <div className='claimdetails-value width-max-content'>CLAIM ID [1]</div>
                            </div>
                            <div className='text-start'>
                                <div className="width-max-content">
                                <input disabled={false} type="text" name="claimNumber" value={(data?.claimNumber !== "" ? data?.claimNumber : "-")}  onChange={(e)=>handleInputChange(e,"SERVICE")} />
                                </div>
                                <div className='claimdetails-value width-max-content'>CLAIM NUMBER</div>
                            </div>
                            <div className='text-start'>
                            <div>
                            <input disabled={false} type="date" name="dateofService" value={(data?.dateofService !== "" ? formatDateToYYYYMMDD(data?.dateofService ): "-")}  onChange={(e)=>handleInputChange(e,"SERVICE")} />
                            </div>
                            <div className='claimdetails-value'>SERVICE DATE [24 a]</div>
                            </div>

                            <div className='text-start'>
                                <div className="width-max-content">
                            <input disabled={false} type="text" name="claimId" value={(data?.procedureCode !== "" ? data?.procedureCode : "-")}  onChange={(e)=>handleInputChange(e,"SERVICE")} />
                            </div>
                                <div className='claimdetails-value width-max-content'>PROCEDURE CODE</div>
                            </div>

                            <div className='text-start'>
                                <div className="width-max-content">
                            <input disabled={false} type="text" name="icdCode" value={(data?.icdCode !== "" ? data?.icdCode : "-")}  onChange={(e)=>handleInputChange(e,"SERVICE")} />
                            </div>
                                <div className='claimdetails-value width-max-content'>ICD</div>
                            </div>
                            
                            <div className='text-start'>
                                <div className="width-max-content">
                            <input disabled={false} type="text" name="totalCharge" value={(data?.totalCharge !== "" ? Number(data?.totalCharge).toFixed(2) : "-")}  onChange={(e)=>handleInputChange(e,"SERVICE")} />
                            </div>
                                <div className='claimdetails-value width-max-content'>TOTAL CHARGE [24 f]</div>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    )
}

export default ServiceLines