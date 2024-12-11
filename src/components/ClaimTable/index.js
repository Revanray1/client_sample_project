import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome for icons
import '../ViewClaimReconciliation/ViewClaimReconciliation.css';
import './ClaimTable.css';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Loader from '../UiComponents/Loader'
const ClaimTable = ({ onStatusChange, claimData, claimloader, currentFileName }) => {
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [actionStatus, setActionStatus] = useState("Actions");
    const [currentFileData, setCurrentFileData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const [filters, setFilters] = useState({
        claimNumber: '',
        patientName: '',
        claimStatus: '',
        billingProviderName: '',
        payerName: '',
        claimAmount: '',
        claimid: '',

    });
    const handleEdit = (id) => {
        navigate(`/dashboard/claim-details/${id}`);
    };

    const sortedClaims = [...currentFileData].sort((a, b) => {
        if (sortConfig.key) {
            const order = sortConfig.direction === 'asc' ? 1 : -1;
            return a[sortConfig.key] > b[sortConfig.key] ? order : -order;
        }
        return 0;
    });

    const filteredClaims = sortedClaims.filter(claim =>
        claim.patientName.toLowerCase().includes(filters.patientName.toLowerCase()) &&
        claim.claimNumber.toLowerCase().includes(filters.claimNumber.toLowerCase()) &&
        claim.claimStatus.toLowerCase().includes(filters.claimStatus.toLowerCase()) &&
        claim.billingProviderName.toLowerCase().includes(filters.billingProviderName.toLowerCase()) &&
        claim.payerName.toLowerCase().includes(filters.payerName.toLowerCase()) &&
        claim.claimAmount.toString().includes(filters.claimAmount) &&
        claim?.claimid.toString().includes(filters.claimid)
    );

    const requestSort = key => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
        }
        return 'fas fa-sort';
    };

    const handlePagination = (direction) => {
        let pageNumber = currentPage;

        if (direction === 'Next') {
            console.log("next page")
            // Move to the next page
            if (pageNumber * 10 < claimData.length) {
                pageNumber++;
                const data = claimData.slice((pageNumber - 1) * 10, pageNumber * 10);
                setCurrentFileData(data);
                setCurrentPage(pageNumber);
            }
        } else if (direction === 'Prev') {
            console.log("prev page")
            // Move to the previous page
            if (pageNumber > 1) {
                pageNumber--;
                const data = claimData.slice((pageNumber - 1) * 10, pageNumber * 10);
                setCurrentFileData(data);
                setCurrentPage(pageNumber);
            }
        }
    }
    useEffect(() => {
        const data = claimData.slice(0, 1 * 10);
        setCurrentFileData(data)
    }, [claimData])
    return ( 
        <>
            {
                claimloader ?
                    <Loader />
                    : <>
                        <>{claimData.length > 0 ? <>
                            <div className='text-left'>
                                File name : {currentFileName}
                            </div>
                            <div className='overflow-auto'>
                                <div className='container d-flex shadow p-2 mb-4 bg-white rounded  justify-content-evenly min-width-100-percent'>
                                    <div className='d-flex align-items-center fontsize-12'>
                                        Status Code:
                                    </div>
                                    <div>

                                        <span className='fontsize-12 color-blue' >
                                            Approved by Clearing House
                                        </span>
                                    </div>
                                    <div>

                                        <span className='fontsize-12 color-red' >
                                            Rejected by Clearing House
                                        </span>
                                    </div>
                                    <div>
                                        <span className='fontsize-12 color-orange'>
                                            Approved by Clearing House (EDI 277)
                                        </span>
                                    </div>
                                    <div>
                                        <span className='fontsize-12 color-rose' >
                                            Rejected by Clearing House (EDI 277)
                                        </span>
                                    </div>
                                    <div>
                                        <span className='fontsize-12 color-green'>
                                            Recieved
                                        </span>
                                    </div>
                                </div>

                                <table className="claim-table table-sm min-width-1000" >
                                    <thead>
                                        <tr>
                                        <th onClick={() => requestSort('claimId')}>
                                                Claim Id
                                                <i className={getSortIcon('claimId')}></i>
                                                <input
                                                    type="text"
                                                    placeholder="Filter"
                                                    value={filters.claimid}
                                                    onChange={(e) => setFilters({ ...filters, claimid: e.target.value })}
                                                    className="filter-input"
                                                />

                                            </th>
                                            <th onClick={() => requestSort('claimNumber')}>
                                                Claim Number
                                                <i className={getSortIcon('claimNumber')}></i>
                                                <input
                                                    type="text"
                                                    placeholder="Filter"
                                                    value={filters.claimNumber}
                                                    onChange={(e) => setFilters({ ...filters, claimNumber: e.target.value })}
                                                    className="filter-input"
                                                />

                                            </th>
                                            <th onClick={() => requestSort('patientName')}>
                                                Patient Name
                                                <i className={getSortIcon('patientName')}></i>
                                                <input
                                                    type="text"
                                                    placeholder="Filter"
                                                    value={filters.patientName}
                                                    onChange={(e) => setFilters({ ...filters, patientName: e.target.value })}
                                                    className="filter-input"
                                                />
                                            </th>

                                            <th onClick={() => requestSort('billingProviderName')}>
                                                Billing Provider
                                                <i className={getSortIcon('billingProviderName')}></i>
                                                <input
                                                    type="text"
                                                    placeholder="Filter"
                                                    value={filters.billingProviderName}
                                                    onChange={(e) => setFilters({ ...filters, billingProviderName: e.target.value })}
                                                    className="filter-input"
                                                />
                                            </th>
                                            <th onClick={() => requestSort('payerName')}>
                                                Payer Name
                                                <i className={getSortIcon('payerName')}></i>
                                                <input
                                                    type="text"
                                                    placeholder="Filter"
                                                    value={filters.payerName}
                                                    onChange={(e) => setFilters({ ...filters, payerName: e.target.value })}
                                                    className="filter-input"
                                                />
                                            </th>
                                            <th onClick={() => requestSort('claimAmount')}>
                                                Claim Amount
                                                <i className={getSortIcon('claimAmount')}></i>
                                                <input
                                                    type="text"
                                                    placeholder="Filter"
                                                    value={filters.claimAmount}
                                                    onChange={(e) => setFilters({ ...filters, claimAmount: e.target.value })}
                                                    className="filter-input"
                                                />
                                            </th>
                                            <th onClick={() => requestSort('claimStatus')}>
                                                Claim Status
                                                <Dropdown >
                                                    <Dropdown.Toggle variant="light" id="dropdown-basic" className='text-truncate action-button'>
                                                        {actionStatus}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1" onClick={() => { setActionStatus("Approved by Clearing House") }}>Approved by Clearing House</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3" onClick={() => { setActionStatus("Rejected by Clearing House") }}>Rejected by Clearing House</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-4" onClick={() => { setActionStatus("Approved by Clearing House (EDI 277)") }}>Approved by Clearing House (EDI 277)</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2" onClick={() => { setActionStatus("Approved by Clearing House (EDI 277)") }}>Rejected by Clearing House (EDI 277)</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2" onClick={() => { setActionStatus("Recieved") }}>Recieved</Dropdown.Item>

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </th>
                                            <th >
                                                <div className='filetable-actionbutton'>Action</div>

                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredClaims.map((claim, index) => (
                                            <tr key={index}>
                                                <td className='text-center'>{claim.claimid}</td>
                                                <td className='text-center'>{claim.claimNumber}</td>
                                                <td className='text-center'>{claim.patientName}</td>
                                                <td className='text-center'>{claim.billingProviderName}</td>
                                                <td className='text-center'>{claim.payerName}</td>
                                                <td className='text-center'> {Number(claim.claimAmount).toFixed(2)}</td>
                                                <td className='text-center'>
                                                    <button
                                                        className={`status-button ${claim.claimStatus.toLowerCase()}`}
                                                    >
                                                        {claim.claimStatus}
                                                    </button>
                                                </td>
                                                <td className='text-center'>
                                                    <button className="btn btn-primary btn-sm"
                                                        onClick={() => handleEdit(claim.claimid)}>
                                                        View
                                                    </button>
                                                    {/* className={`status-button ${file.status.toLowerCase()}`} */}

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className='d-flex gap-3 justify-content-center' >
                                    <div>
                                        <button type="button" disabled={currentPage <= 1 ? true : false} class="btn btn-light" onClick={() => handlePagination("Prev")}>{"<  Prev "}</button>
                                    </div>
                                    <div className=" d-flex shadow-none bg-light rounded align-items-center justify-content-center width-50" >{currentPage}</div>
                                    <div>
                                        <button disabled={claimData.length <= currentPage * 10 ? true : false} type="button" class="btn btn-light" onClick={() => handlePagination("Next")}> {"Next > "}</button>

                                    </div>
                                </div>
                            </div>
                        </>
                            : <>
                                <div>No Data Found</div></>}</>

                    </>
            }

        </>
    );
};

export default ClaimTable;
