import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import FileTable from '../FileTable';
import ClaimTable from '../ClaimTable';
import { fetchCustomerFiles } from '../../api/fileListApi';
import { fetchCustomerFileClaimList } from '../../api/claimListApi';
import './ViewClaimReconciliation.css';
import DatePicker from "react-datepicker";
import {formatISTDateToYYYYMMDD } from '../../utils/commonFunctions.js';


const DateRangeSelector = ({ onCreateReport, onClearFields }) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [fileName, setFileName] = useState('');

    const handleCreateReport = () => {
        onCreateReport(fromDate, toDate, fileName);
    };

    const handleClearFields = () => {
        setFromDate('');
        setToDate('');
        setFileName('');
        onClearFields();
    };

    useEffect(() => {
        let currentDate = new Date()
        let dateBefore_30 = new Date()
        dateBefore_30.setDate(currentDate.getDate() - 30)
        setToDate(formatISTDateToYYYYMMDD(currentDate))
        setFromDate(formatISTDateToYYYYMMDD(dateBefore_30))
    }, [])

    const handleUploadClaim = async () => {
        try {
            const response = await fetch('http://dev.chapi.healthiva.com/Customer/UploadClaims?CustomerId=1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ key: 'value' }), // Replace with your data
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            //setData(result);
        } catch (err) {
            //setError(err.message);
            console.log(err.message);
        }
    };

    return (<>


        <div className="date-range-selector" >
            <div className="form-group claim-data-formgroup">
                <label className='color-black'>From</label>
                <DatePicker
                    className="color-black"
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    dateFormat="MM-dd-yyyy"
                    placeholderText='Select From Date'
                />
            </div>
            <div className="form-group claim-data-formgroup">
                <label className='color-black'>To</label>
                <DatePicker
                    className="color-black"
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    dateFormat="MM-dd-yyyy"
                    placeholderText='Select To Date'
                />
            </div>

            <div className="button-group">
                <button className="create-report reconciliation-datepicker-buttons" onClick={handleCreateReport}>Search</button>
                {/* <button className="create-upload reconciliation-datepicker-buttons" onClick={handleUploadClaim}>Upload Claims</button> */}
                <button className="clear-fields reconciliation-datepicker-buttons" onClick={handleClearFields}>Clear Fields</button>
            </div>
        </div>
    </>);
};

const ViewClaimReconciliation = () => {
    const navigate = useNavigate();
    const [fileLoader, setFileLoader] = useState(true)
    const [claimloader, setClaimLoader] = useState(true);
    const [currentFileName, setCurrentFileName] = useState('');
    const [claimData, setClaimData] = useState(null);


    const [files, setFiles] = useState([
        {
            fileName: 'R1354_06192024.txt',
            fileDate: '06/19/2024 07:10 AM',
            fileSize: 1144,
            numClaims: 4,
            charges: '$168.99',
            status: 'Received'
        },
        {
            fileName: 'R16754_06192024.txt',
            fileDate: '06/29/2024 07:10 AM',
            fileSize: 1344,
            numClaims: 173,
            charges: '$38896.99',
            status: 'Received'
        },
        {
            fileName: 'R13894_06192024.txt',
            fileDate: '06/10/2024 07:10 AM',
            fileSize: 1156,
            numClaims: 2,
            charges: '$768.99',
            status: 'Received'
        }
    ]);

    const handleCreateReport = async (fromDate, toDate, fileName) => {
        setFileLoader(true);
        try {
            const response = await fetchCustomerFiles(fromDate, toDate, fileName);
            const formattedData = response.map(file => ({
                fileName: file.fileName || '',
                fileDate: file.fileDate || '',
                fileSize: file.fileSize || '',
                numClaims: file.claimCount || '', // Adjust if necessary
                charges: file.charges || '', // Adjust if necessary
                status: file.fileStatus || ''
            }));
            setFiles(formattedData);
            setFileLoader(false);

        } catch (err) {
            setFileLoader(false);
        }
    };


    const handleClearFields = () => {
        getFiles();
    };

    const handleStatusChange = (index) => {
        setFiles((prevFiles) =>
            prevFiles.map((file, i) =>
                i === index
                    ? {
                        ...file,
                        status: file.status === 'Received' ? 'Processed' : 'Received',
                    }
                    : file
            )
        );
    };

    useEffect(() => {
        getFiles();
    }, []);


    const handleViewClaimData = async (fileName) => {
        setClaimLoader(true);
        try {
            const response = await fetchCustomerFileClaimList(fileName);
            setCurrentFileName(fileName);
            const formattedData = response.map(claim => ({
                customerId: claim.customerId,
                fileId: claim.fileId,
                claimNumber: claim.claimNumber,
                claimid: claim.claimid,
                patientName: claim.patientName,
                claimStatus: claim.claimStatus,
                billingProviderName: claim.billingProviderName,
                payerName: claim.payerName,
                claimAmount: claim.claimAmount
            }));
            setClaimData(formattedData);
            setClaimLoader(false);
        } catch (err) {
            setClaimLoader(false);
            console.error('Error fetching data:', err);
        }

    };

    const getFiles = async () => {
        setFileLoader(true);
        try {
            const response = await fetchCustomerFiles();
            const formattedData = response.map(file => ({
                fileId: file.fileId || '',
                fileName: file.fileName || '',
                fileDate: file.fileDate || '',
                fileSize: file.fileSize || '',
                numClaims: file.claimCount || '', // Adjust if necessary
                charges: file.charges || '', // Adjust if necessary
                status: file.fileStatus || '',
                isVisible: true
            }));
            setFiles(formattedData);
            setFileLoader(false);
        } catch (err) {
            setFileLoader(false);
        }

    };


    return (
        <div className="view-claim-reconciliation w-100" >
            <h5 className='font-weight-bold'>Clearing House - Customer View Claim File Reconciliation</h5>
            <div className="search-criteria">
                <DateRangeSelector onCreateReport={handleCreateReport} onClearFields={handleClearFields} />
            </div>
            <div className="view-claim-reconciliation shadow-sm p-3 mb-5 bg-white rounded min-width-1200">

                <h5 className='font-weight-bold'>File List</h5>

                <FileTable fileLoader={fileLoader} files={files} setFiles={setFiles} onStatusChange={handleStatusChange} handleViewClaimData={handleViewClaimData} />
            </div>
            {claimData &&
                <div className="view-claim-reconciliation shadow-sm p-3 mb-5 bg-white rounded">

                    <h5 className='font-weight-bold'>Claim List</h5>
                    <ClaimTable claimData={claimData} onStatusChange={handleStatusChange} claimloader={claimloader} currentFileName={currentFileName} />
                </div>}
        </div>
    );
};

export default ViewClaimReconciliation;
