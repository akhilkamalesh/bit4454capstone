import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import RecallsTable from "./RecallsTable";

function HighPriority() {
    const [recallsData, setRecalls] = useState([]);

    useEffect(() => {
        fetchRecallsData();
    }, []);

    const fetchRecallsData = async () => {
        try {
            let endpointStr = 'http://localhost:4000/api/load-high-prior';
            const response = await fetch(endpointStr);

            if (response.ok) {
                const data = await response.json();
                setRecalls(data);
            } else {
                console.error('Failed to fetch recalls data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <div>
            <Navbar />
            <div className='container-fluid'>
                
                <div className="row mt-4">
                    <div className="col d-flex align-items-center justify-content-center mt-2">
                        <p className="h1 text-uppercase text-black fw-bold">high priority recalls</p>
                    </div>
                </div>
                <RecallsTable recalls={recallsData} />
            </div>
        </div>

    );
}

export default HighPriority;