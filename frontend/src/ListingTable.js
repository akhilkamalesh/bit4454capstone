import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/TableDark.css';
import ReactPaginate from 'react-paginate';

function ListingTable({ listings }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const itemsPerPage = 5;
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(listings.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listings.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };


    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const priorityOrder = { high: 3, medium: 2, low: 1, High: 3, Medium: 2, Low: 1 }; // Define custom priority order

    const sortedListings = [...listings].sort((a, b) => {
        if (sortConfig.key !== null) {
            if (sortConfig.key === 'PriorityLevel') {
                // Sort based on custom priority order
                const priorityA = priorityOrder[a[sortConfig.key]];
                const priorityB = priorityOrder[b[sortConfig.key]];
                if (priorityA < priorityB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                if (priorityA > priorityB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                return 0;
            } else {
                // Default alphabetical sorting for other columns
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            }
        }
        return 0;
    });

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '▲' : '▼';
        }
        return null;
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <table id="tblListings" className="table-dark">
                    <thead>
                        <tr className="text-uppercase">
                            <th onClick={() => handleSort('ListingID')}>
                                listing id {getSortArrow('ListingID')}
                            </th>
                            <th onClick={() => handleSort('ListingName')}>
                                product name {getSortArrow('ListingName')}
                            </th>
                            <th onClick={() => handleSort('SellerID')}>
                                seller {getSortArrow('SellerID')}
                            </th>
                            <th onClick={() => handleSort('ItemListDate')}>
                                date added {getSortArrow('ItemListDate')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedListings.slice(itemOffset, endOffset).map(listing => {
                            return (
                                <tr key={listing.ListingID}>
                                    <td>{listing.ListingID}</td>
                                    <a  href='../details' >
                                        <td>{listing.ListingName}</td>
                                    </a>
                                    <td>{listing.Vendor}</td>
                                    <td>{listing.ItemListDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className='row mt-4'>
                <div className='col-4'/>
                <ReactPaginate
                    activeClassName={'item active '}
                    breakClassName={'item break-me '}
                    breakLabel={'...'}
                    containerClassName={'pagination'}
                    disabledClassName={'disabled-page'}
                    nextClassName={"item next "}
                    pageClassName={'item pagination-page '}
                    previousClassName={"item next"}
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null} />
            </div>
        </div>
    );
}

export default ListingTable;
