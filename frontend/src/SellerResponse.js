import React, { useState } from 'react';
import InboxButtons from "./Buttons/InboxButtons";
import Navbar from "./Navbar";
import InboxTable from './Tables/InboxTable';

function SellerResponse() {
    const [selectedCategory, setSelectedCategory] = useState('inbox');

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const dummyEmails = [
        { id: 1, name: "John Doe", subject: "Meeting Reminder", time: "09:30" },
        { id: 2, name: "Alice Smith", subject: "Report Updates", time: "10:15" },
        { id: 3, name: "Bob Johnson", subject: "Project Proposal", time: "11:00" },
        { id: 4, name: "Emily Brown", subject: "Task Assignment", time: "12:45" },
        { id: 5, name: "Michael Davis", subject: "Vacation Request", time: "13:30" },
        { id: 6, name: "Sarah Wilson", subject: "Budget Meeting", time: "14:15" },
        { id: 7, name: "David Lee", subject: "Product Launch", time: "15:00" },
        { id: 8, name: "Emma Taylor", subject: "Marketing Campaign", time: "16:45" },
        { id: 9, name: "James Clark", subject: "Client Presentation", time: "17:30" },
        { id: 10, name: "Olivia Rodriguez", subject: "Team Dinner", time: "18:15" }
      ];
      

    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row mt-4">
                    <div className="col d-flex align-items-center justify-content-center mt-4">
                        <p className="h1 text-uppercase text-black fw-bold">seller response</p>
                    </div>
                </div>
                <div className="row">
                    <div className='col-1'></div>
                    <div className="col-2">
                        <InboxButtons onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />
                    </div>
                    <div className='col-9'>
                        <InboxTable emails={dummyEmails}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerResponse;