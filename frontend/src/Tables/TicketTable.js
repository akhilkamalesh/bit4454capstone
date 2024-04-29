import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TableDark.css';
import ReactPaginate from 'react-paginate';

function TicketsTable({ tickets, listings }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const itemsPerPage = 5;
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(tickets.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % tickets.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const getListingByTicketID = (ticketID) => {
        return listings.find(listing => listing.ListingID === ticketID);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const priorityOrder = { high: 3, medium: 2, low: 1, High: 3, Medium: 2, Low: 1 }; // Define custom priority order

    const sortedTickets = [...tickets].sort((a, b) => {
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
                <table id="tblTickets" className="table-dark">
                    <thead>
                        <tr className="text-uppercase">
                            <th onClick={() => handleSort('TicketID')}>
                                ticket id {getSortArrow('TicketID')}
                            </th>
                            <th onClick={() => handleSort('ListingName')}>
                                product name {getSortArrow('ListingName')}
                            </th>
                            <th onClick={() => handleSort('SellerID')}>
                                seller {getSortArrow('SellerID')}
                            </th>
                            <th onClick={() => handleSort('PriorityLevel')}>
                                priority {getSortArrow('PriorityLevel')}
                            </th>
                            <th onClick={() => handleSort('TicketDateTime')}>
                                date added {getSortArrow('TicketDateTime')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTickets.slice(itemOffset, endOffset).map(ticket => {
                            const listing = getListingByTicketID(ticket.ListingID);
                            return (
                                <tr key={ticket.TicketID}>
                                    <td>{ticket.TicketID}</td>
                                    <td>{listing ? listing.ListingName : '-'}</td>
                                    <td>{listing ? listing.Vendor : '-'}</td>
                                    <td>{ticket.PriorityLevel}</td>
                                    <td>{ticket.TicketDateTime}</td>
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

export default TicketsTable;
