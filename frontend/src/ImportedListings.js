import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import ListingTable from './ListingTable';
import AddListingButton from './Buttons/AddListingButton';

function TicketItems() {
    const [listingsData, setListingsData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let endpointStr = 'http://localhost:4000/api/load-listings';
            const response = await fetch(endpointStr);
            if (response.ok) {
                const data = await response.json();
                setListingsData(data);
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
                        <h1 className="text-center mt-5 mb-5 text-black fw-bold text-uppercase">imported listings</h1>
                    </div>
                </div>
                <ListingTable listings={listingsData}/>
                <AddListingButton />
            </div>

        </div>
    );
};

export default TicketItems;