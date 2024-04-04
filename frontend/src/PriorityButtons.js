import React, { useState } from 'react';

function PriorityButtons({ setShowChecks, fetchRecalls }) {
    const [showButtons, setShowButtons] = useState(false);

    const handleSelect = () => {
        setShowButtons(true);
        setShowChecks(true);
    };

    const handleCancel = () => {
        setShowButtons(false);
        setShowChecks(false);
    };


    const handleConfirm = async (e) => {
        e.preventDefault();
        // Get the IDs of checked recalls
        const checkedRecallIDs = Array.from(document.querySelectorAll('input[name="checkedRecallIDs"]:checked')).map(input => input.value);
        setShowButtons(false);
        setShowChecks(false);
    
        // Send a request to the backend to remove the recalls with the checked IDs
        try {
            const response = await fetch('http://localhost:4000/api/prior-recalls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recallIDs: checkedRecallIDs })
            });
            if (response.ok) {
                fetchRecalls();
            } else {
                console.error('Failed to prioritize recalls');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className="row mr-2">
                <div className="col-8"></div>
                <div className="col-2">
                    <button
                        className="custom-btn text-uppercase"
                        id="btnCancel"
                        style={{ display: showButtons ? 'block' : 'none', backgroundColor: 'rgb(201, 0, 0)' }}
                        type="button"
                        onClick={handleCancel}
                    >
                        cancel
                    </button>
                </div>
                <div className="col-2">
                    <button
                        className="custom-btn text-uppercase"
                        id="btnSelect"
                        type="button"
                        onClick={handleSelect}
                        style={{ display: showButtons ? 'none' : 'block' }}
                    >
                        select high priority
                    </button>
                    <button
                        className="custom-btn text-uppercase"
                        id="btnConfirm"
                        style={{ display: showButtons ? 'block' : 'none' }}
                        data-toggle="modal"
                        data-target="#confirmModal"
                        type="submit"
                        onClick={handleConfirm}
                    >
                        confirm
                    </button>
                </div>
            </div>
            <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <div className="row">
                                <h5 className="modal-title text-uppercase text-center" id="confirmModalLabel">
                                    selected recalls have been prioritized and sent to CPSC investigator
                                </h5>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PriorityButtons;