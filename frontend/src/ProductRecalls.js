import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import PriorityButtons from "./PriorityButtons";
import RecallsTable from "./RecallsTable";

function ProductRecalls() {
    const [recallsData, setRecalls] = useState([]);
    const [showChecks, setShowChecks] = useState(false);

    useEffect(() => {
        fetchRecallsData();
    }, []);

    const fetchRecallsData = async () => {
        try {
            let endpointStr = 'http://localhost:4000/api/load-recalls';
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
                        <p className="h1 text-uppercase text-black fw-bold">product recall alerts</p>
                    </div>
                </div>
                <RecallsTable recalls={recallsData} showChecks={showChecks} />
                <PriorityButtons setShowChecks={setShowChecks} fetchRecalls={fetchRecallsData} />
            </div>
        </div>

    );
}

export default ProductRecalls;