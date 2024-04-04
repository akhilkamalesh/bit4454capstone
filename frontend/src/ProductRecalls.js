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
                console.log(data);
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
            <RecallsTable recalls={recallsData} showChecks={showChecks} />
            <PriorityButtons setShowChecks={setShowChecks} fetchRecalls={fetchRecallsData} />
        </div>
    );
}

export default ProductRecalls;