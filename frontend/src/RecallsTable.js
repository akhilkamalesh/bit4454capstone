import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import './css/RecallsTable.css';

function RecallsTable({ recalls, showChecks }) {
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    const endOffset = itemOffset + itemsPerPage;
    const currentRecalls = recalls.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(recalls.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % recalls.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <div className="container-fluid">
            <div className="row mt-4">
                <div className="col d-flex align-items-center justify-content-center mt-2">
                    <p className="h1 text-uppercase text-black fw-bold">product recall alerts</p>
                </div>
            </div>
            <div className="row mt-4">
                <table id="tblRecalls" className="table table-gray">
                    <thead>
                        <tr className="text-uppercase">
                            <th></th>
                            <th>Recall ID</th>
                            <th>Product Name</th>
                            <th>Units in Circulations</th>
                            <th>Recall Reason</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecalls.map(recall => (
                            <tr key={recall.RecallID}>
                                <td><label className="checkbox">
                                    <input type="checkbox" name="checkedRecallIDs"
                                        value={recall.RecallID} />
                                    <span className="checkmark"
                                        style={{display: showChecks ? 'block' : 'none'}}></span>
                                </label></td>
                                <td>{recall.RecallID}</td>
                                <td>{recall.ProductName}</td>
                                <td>{recall.UnitsInCirculation}</td>
                                <td>{recall.RecallReason}</td>
                                <td>{recall.RecallDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='row mb-4'>
                <ReactPaginate
                    className='react-paginate'
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
}

export default RecallsTable;
