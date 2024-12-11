import React from 'react'

const ServiceLines = ({data,index}) => {
    console.log("data,data", data,index)
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
                                <div className="width-max-content">{data?.claimId !== "" ? data?.claimId : "-"}</div>
                                <div className='claimdetails-value width-max-content'>CLAIM ID</div>
                            </div>
                            <div className='text-start'>
                                <div className="width-max-content">{data?.claimNumber !== "" ? data?.claimNumber : "-"}</div>
                                <div className='claimdetails-value width-max-content'>CLAIM NUMBER</div>
                            </div>
                            <div className='text-start'>
                            <div>{(data?.dateofService ? (data?.dateofService.split(" "))[0] : "-")}</div>
                            <div className='claimdetails-value'>SERVICE DATE</div>
                            </div>

                            

                            {/* <div className='text-start'>
                                <div className="width-max-content">{data?.insurancePayment!== "" ? data?.insurancePayment : "-"}</div>
                                <div className='claimdetails-value width-max-content'>INSURANCE PAYMENT</div>
                            </div>
                            <div className='text-start'>
                                <div className="width-max-content">{data?.patientPayment!== "" ? data?.patientPayment : "-"}</div>
                                <div className='claimdetails-value width-max-content'>PATIENT PAYMENT</div>
                            </div> */}
                            <div className='text-start'>
                                <div className="width-max-content">{data?.procedureCode!== "" ? data?.procedureCode : "-"}</div>
                                <div className='claimdetails-value width-max-content'>PROCEDURE CODE</div>
                            </div>
                            {/* <div className='text-start'>
                                <div className="width-max-content">{data?.quantity!== "" ? data?.quantity : "-"}</div>
                                <div className='claimdetails-value width-max-content'>QUANTITY</div>
                            </div> */}

                            <div className='text-start'>
                                <div className="width-max-content">{(data?.icdCode &&  data?.icdCode!== "") ? data?.icdCode : "-"}</div>
                                <div className='claimdetails-value width-max-content'>ICD</div>
                            </div>
                            
                            <div className='text-start'>
                                <div className="width-max-content">{data?.totalCharge!== "" ? Number(data?.totalCharge).toFixed(2) : "-"}</div>
                                <div className='claimdetails-value width-max-content'>TOTAL CHARGE</div>
                            </div>
                            
                            
                        </div>
                    </div>
                </details>
            </div>
        </div>
    )
}

export default ServiceLines