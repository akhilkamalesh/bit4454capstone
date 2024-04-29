import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TableDark.css';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

function InboxTable({ emails }) {
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentEmails = emails.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(emails.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % emails.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="container-fluid">
            <div className="row mt-4">
                <table id="tblEmails" className="table-inbox">
                    <tbody>
                        {currentEmails.map(email => (
                            <tr key={email.id}>
                                <td style={{ width: '20%' }}><a href='../adjudication' className='table-cell'>{email.name}</a></td>
                                <td style={{ width: '70%' }}><a href='../adjudication' className='table-cell'>{email.subject}</a></td>
                                <td style={{ width: '10%', textAlign: 'right', paddingRight: '20px' }}><a href='../adjudication' className='table-cell'>{email.time}</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='row mb-4'>
                {/* <ReactPaginate
                    className='react-paginate'
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                /> */}
            </div>
        </div>
    );
}

export default InboxTable;
