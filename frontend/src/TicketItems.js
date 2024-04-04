import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import TicketsTable from './TicketTable';

function TicketItems() {
    const [ticketsData, setTicketsData] = useState([]);
    const [listingsData, setListingsData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let endpointStr = 'http://localhost:4000/api/load-tickets';
            const response = await fetch(endpointStr);
            if (response.ok) {
                const data = await response.json();
                setTicketsData(data.tickets);
                setListingsData(data.listings);
            } else {
                console.error('Failed to fetch tickets data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='container-fluid'>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h1 className="text-center mt-5 mb-5 text-black fw-bold text-uppercase">ticket items</h1>
                    </div>
                </div>
                <TicketsTable tickets={ticketsData} listings={listingsData} />
            </div>

        </div>
    );
};

export default TicketItems;