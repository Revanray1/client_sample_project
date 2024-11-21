import React, { useState, useEffect } from 'react';
import './ViewClaimReconciliation.css';
import { useNavigate } from 'react-router-dom';
import FileTable from '../FileTable';
import ClaimTable from '../ClaimTable';
import { fetchCustomerFiles } from '../../api/fileListApi';
import { fetchCustomerFileClaimList } from '../../api/claimListApi';



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
            console.log(result);
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
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="form-group claim-data-formgroup">
                <label className='color-black'>To</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>

            <div className="button-group">
                <button className="create-report" onClick={handleCreateReport}>Create Report</button>
                <button className="create-upload" onClick={handleUploadClaim}>Upload Claims</button>
                <button className="clear-fields" onClick={handleClearFields}>Clear Fields</button>
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

            console.error('Error fetching data:', err);
        }
    };


    const handleClearFields = () => {
        getFiles();
        console.log('Clearing fields');
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
                fileId : file.fileId || '',
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
            console.error('Error fetching data:', err);
        }

    };

    return (
        <div className="view-claim-reconciliation " >
            <h5 className='font-weight-bold'>Clearing House - Customer View Claim File Reconciliation</h5>
            <div className="search-criteria">
                <DateRangeSelector onCreateReport={handleCreateReport} onClearFields={handleClearFields} />
            </div>
            <div className="view-claim-reconciliation shadow-sm p-3 mb-5 bg-white rounded">

                <h5 className='font-weight-bold'>File List</h5>

                <FileTable fileLoader={fileLoader} files={files} setFiles={setFiles} onStatusChange={handleStatusChange}  handleViewClaimData={handleViewClaimData}/>
            </div>
            { claimData &&
            <div className="view-claim-reconciliation shadow-sm p-3 mb-5 bg-white rounded">

                <h5 className='font-weight-bold'>Claim List</h5>
                <ClaimTable claimData={claimData} onStatusChange={handleStatusChange} claimloader={claimloader} currentFileName={currentFileName} />
            </div>}
        </div>
    );
};

export default ViewClaimReconciliation;
