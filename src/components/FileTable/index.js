import React, { useState, useEffect } from 'react';
import { MultiSelect } from "react-multi-select-component";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import '../ViewClaimReconciliation/ViewClaimReconciliation.css'; // Ensure your CSS includes styles for sorting icons
import Dropdown from 'react-bootstrap/Dropdown';
import Loader from '../UiComponents/Loader';
import './FileTable.css'
import { formatDateToMMDDYYYY } from '../../utils/commonFunctions';
import { parsePath } from 'react-router-dom';


const FileTable = ({ onStatusChange, files, setFiles, fileLoader, handleViewClaimData }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [sortOrder, setSortOrder] = useState("asc");
    const [actionStatus, setActionStatus] = useState("Actions")
    const [currentFileData, setCurrentFileData] = useState(files) // 25 files
    const [currentPage, setCurrentPage] = useState(1)

    const [filters, setFilters] = useState({
        fileName: '',
        fileDate: '',
        fileSize: '',
        numClaims: '',
        charges: '',
        status: '',
        fileId: ''
    });

    useEffect(() => {
        const data = files.slice(0, currentPage * 10);
        setCurrentFileData(data)
        
    }, [files, currentPage])

    const userData = JSON.parse(localStorage.getItem('userData'));
    // const [fileStartDate, setFileStartDate] = useState('01-08-2024');
    // const [fileEndDate, setFileEndDate] = useState('10-08-2024');
    const [fileStartDate, setFileStartDate] = useState(userData?.fromdate);
    const [fileEndDate, setFileEndDate] = useState(userData?.todate);

    const sortedFiles = [...currentFileData].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key] !== undefined ? a[sortConfig.key] : '';
            const bValue = b[sortConfig.key] !== undefined ? b[sortConfig.key] : '';
            const order = sortConfig.direction === 'asc' ? 1 : -1;

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return (aValue - bValue) * order;
            } else {
                return aValue.toString().localeCompare(bValue.toString()) * order;
            }
        }
        return 0;
    });

    const filteredFiles = sortedFiles.filter(file =>
        (file.fileName || '').toLowerCase().includes(filters.fileName.toLowerCase()) &&
        (file.fileDate || '').toLowerCase().includes(filters.fileDate.toLowerCase()) &&
        (file.fileSize || '').toString().includes(filters.fileSize) &&
        (file.numClaims || '').toString().includes(filters.numClaims) &&
        (file.fileId || '').toString().includes(filters.fileId) &&
        (file.charges || '').toString().includes(filters.charges) &&
        (file.status || '').toLowerCase().includes(filters.status.toLowerCase())
    );

    const requestSort = (key) => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);
        const sortedFiles = files.sort((a, b) => {
            let comparison = 0;

            if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                comparison = a[key].localeCompare(b[key]);
            } else if (key === "fileDate") {

                comparison = new Date(a[key]) - new Date(b[key]);
            } else if (key === "numClaims") {
                console.log(typeof a[key] && typeof b[key])
                comparison = a[key] - b[key];
            }

            return newOrder === 'desc' ? -comparison : comparison;
        });
        setFiles(sortedFiles)
        setSortConfig({ key: key, direction: sortOrder })

    }


    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
        }
        return 'fas fa-sort';
    };

    const handlePagination = (direction) => {
        let pageNumber = currentPage;

        if (direction === 'Next') {
            // Move to the next page
            if (pageNumber * 10 < files.length) {
                pageNumber++;
                const data = files.slice((pageNumber - 1) * 10, pageNumber * 10);
                setCurrentFileData(data);
                setCurrentPage(pageNumber);
            }
        } else if (direction === 'Prev') {
            // Move to the previous page
            if (pageNumber > 1) {
                pageNumber--;
                const data = files.slice((pageNumber - 1) * 10, pageNumber * 10);
                setCurrentFileData(data);
                setCurrentPage(pageNumber);
            }
        }
    }

    const [tableHeader, setTableHeader] = useState(null)

    useEffect(() => {
        const data = [

            {
                label: "File Id",
                value: "File Id",
                parameters: "fileId",
                headerType: 'text',
                isVisible: true
            },

            {
                label: "File Name",
                value: "File Name",
                parameters: "fileName",
                headerType: 'text',
                isVisible: true

            },

            {
                label: "Date",
                value: "Date",
                parameters: "fileDate",
                headerType: 'text',
                isVisible: true

            },

            {
                label: "Claims",
                value: "Claims",
                parameters: "numClaims",
                headerType: 'text',
                isVisible: true

            },

            {
                label: "Status",
                value: "Status",
                parameters: "status",
                headerType: 'dropdown',
                isVisible: true

            },
            {
                label: "Action",
                value: "Action",
                parameters: "action",
                headerType: 'none',
                isVisible: true

            }
        ]

        setTableHeader(data);
    }, [])

    return (
        <>
            {fileLoader ?
                <>
                    <Loader />
                </> :
                <> {files.length > 0 ?
                    <>
                        <div className=''>

                        </div>
                        <div className='overflow-auto  custom-scroll'>
                            <div className='container d-flex shadow p-2 mb-4 bg-white rounded  justify-content-evenly  min-width-800'>
                                <div className='d-flex align-items-center fontsize-12 custom-scroll '>
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
                        </div>

                        <div className='table-inner-div table-custom-scroll'>
                            <table className="file-table table-sm min-width-1200" >
                                <thead>
                                    <tr >
                                        {tableHeader && tableHeader.map(data => {
                                            if (data.isVisible) {
                                                if (data.headerType === "text") {
                                                    return (
                                                        <th onClick={() => requestSort(data.parameters)}>
                                                            {data.label}
                                                            <i className={getSortIcon(data.parameters)}></i>
                                                            <input
                                                                type={data.type}
                                                                placeholder="Filter"
                                                                value={filters[data.parameters]}
                                                                onChange={(e) => setFilters({ ...filters, [data.parameters]: e.target.value })}
                                                                className="filter-input"
                                                            />
                                                        </th>
                                                    )
                                                } else if (data.headerType === "dropdown") {
                                                    return (<th>
                                                        Status
                                                        <Dropdown >
                                                            <Dropdown.Toggle variant="light" id="dropdown-basic" className='text-truncate action-button'>
                                                                {actionStatus}
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#/action-1" onClick={() => { setActionStatus("Received") }}>Received</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-3" onClick={() => { setActionStatus("EDI999Generated") }}>EDI999Generated</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-4" onClick={() => { setActionStatus("EDI277Generated") }}>EDI277Generated</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2" onClick={() => { setActionStatus("Forwarded") }}>Forwarded</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2" onClick={() => { setActionStatus("Processed") }}>Processed</Dropdown.Item>

                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </th>

                                                    )
                                                } else if (data.headerType == "none") {
                                                    return (<th >
                                                        <div className='filetable-actionbutton'>Action</div>
                                                    </th>)
                                                }
                                            }

                                        })}
                                        {/* <th onClick={() => requestSort('fileId')}>
                                            File Id
                                            <i className={getSortIcon('fileId')}></i>
                                            <input
                                                type="text"
                                                placeholder="Filter"
                                                value={filters.fileId}
                                                onChange={(e) => setFilters({ ...filters, fileId: e.target.value })}
                                                className="filter-input"
                                            />
                                        </th> */}
                                        {/* <th onClick={() => requestSort('fileName')}>
                                            File Name
                                            <i className={getSortIcon('fileName')}></i>
                                            <input
                                                type="text"
                                                placeholder="Filter"
                                                value={filters.fileName}
                                                onChange={(e) => setFilters({ ...filters, fileName: e.target.value })}
                                                className="filter-input"
                                            />
                                        </th>
                                        <th onClick={() => requestSort('fileDate')}>
                                            Date
                                            <i className={getSortIcon('fileDate')}></i>
                                            <input
                                                type="text"
                                                placeholder="Filter"
                                                value={filters.fileDate}
                                                onChange={(e) => setFilters({ ...filters, fileDate: e.target.value })}
                                                className="filter-input"
                                            />
                                        </th> */}
                                        {/* <th onClick={() => requestSort('fileSize')}>
                            Size (KB)
                            <i className={getSortIcon('fileSize')}></i>
                            <input
                                type="text"
                                placeholder="Filter"
                                value={filters.fileSize}
                                onChange={(e) => setFilters({ ...filters, fileSize: e.target.value })}
                                className="filter-input"
                            />
                        </th> */}
                                        {/* <th onClick={() => requestSort('numClaims')}>
                                            Claims
                                            <i className={getSortIcon('numClaims')}></i>
                                            <input
                                                type="text"
                                                placeholder="Filter"
                                                value={filters.numClaims}
                                                onChange={(e) => setFilters({ ...filters, numClaims: e.target.value })}
                                                className="filter-input"
                                            />
                                        </th> */}
                                        {/* <th onClick={() => requestSort('charges')}>
                                                Charges
                                                <i className={getSortIcon('charges')}></i>
                                                <input
                                                    type="text"
                                                    placeholder="Filter"
                                                    value={filters.charges}
                                                    onChange={(e) => setFilters({ ...filters, charges: e.target.value })}
                                                    className="filter-input"
                                                />
                                            </th> */}
                                        {/* <th>
                                            Status
                                            <Dropdown >
                                                <Dropdown.Toggle variant="light" id="dropdown-basic" className='text-truncate action-button'>
                                                    {actionStatus}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1" onClick={() => { setActionStatus("Received") }}>Received</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3" onClick={() => { setActionStatus("EDI999Generated") }}>EDI999Generated</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-4" onClick={() => { setActionStatus("EDI277Generated") }}>EDI277Generated</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2" onClick={() => { setActionStatus("Forwarded") }}>Forwarded</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2" onClick={() => { setActionStatus("Processed") }}>Processed</Dropdown.Item>

                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </th> */}

                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFiles.map((file, index) => (
                                        <tr key={index}>
                                            {file.isVisible && <td className='text-center'>{file.fileId}</td>}
                                            {file.isVisible && <td className='text-center'>{file.fileName}</td>}
                                            {file.isVisible && <td className='text-center'>{formatDateToMMDDYYYY(file.fileDate)}</td>}
                                            {/* <td>{file.fileSize}</td> */}
                                            {file.isVisible && <td className='text-center'>{file.numClaims}</td>}
                                            {/* <td>{file.charges}</td> */}
                                            {file.isVisible && <td className='text-center'>
                                                <button
                                                    className={`status-button ${file.status.toLowerCase()}`}
                                                //onClick={() => onStatusChange(index)}
                                                >
                                                    {file.status}
                                                </button>
                                            </td>}
                                            {file.isVisible && <td className='text-center'>
                                                <button className="btn btn-primary btn-sm"
                                                    onClick={() => handleViewClaimData(file.fileName)}>
                                                    View
                                                </button>
                                            </td>
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='d-flex gap-3 justify-content-center' >


                                <div className='d-flex'> 
                                    <div>
                                      <button type="button" disabled={currentPage <= 1 ? true : false} class="btn btn-light" onClick={() => handlePagination("Prev")}>{"<  Prev "}</button>
                                    </div>
                                    <div className=" d-flex shadow-none bg-light rounded align-items-center justify-content-center width-50" >{currentPage}</div>
                                    <div>
                                        <button disabled={files.length <= currentPage * 10 ? true : false} type="button" class="btn btn-light" onClick={() => handlePagination("Next")}> {"Next > "}</button>
                                    </div>
                                </div>
                                <div className='d-flex' style={{ float: "right" }}>
                                    <select class="form-select" aria-label="Default select example" onChange={(e)=> setCurrentPage(e.target.value)}>
                                        <option selected value="1">10</option>
                                        <option value="2">20</option>
                                        <option value="3">30</option>
                                    </select>
                                </div>

                            </div>

                        </div>
                    </>
                    : <> No Data Found</>}
                </>
            }
        </>
    );
};

export default FileTable;
