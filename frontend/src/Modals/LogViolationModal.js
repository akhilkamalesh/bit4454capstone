import '../css/LogViolationModal.css';
import React, { useState } from 'react';

function LogViolationModal() {
    const [formData, setFormData] = useState({
        matchType: '',
        commentary: 'Commentary: '
    });

    const handleClose = () => {
        setFormData({
            matchType: '',
            commentary: 'Commentary: '
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        // Handle form submission
    };

    return (
        <div className="modal fade" id="logViolationModal" tabIndex="-1" role="dialog" aria-labelledby="logViolationModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <button type="button" className="close btn-lg ml-auto mr-2 my-2" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>
                                    <input type="radio" name="matchType" value="truePositive" onChange={handleChange} checked={formData.matchType === "truePositive"} /> True Positive Match
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <input type="radio" name="matchType" value="falsePositive" onChange={handleChange} checked={formData.matchType === "falsePositive"}/> False Positive Match
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Device Model: Samsung Galaxy</label>
                            </div>
                            <div className="form-group mt-5">
                                <textarea className="comm form-control" rows={6} name="commentary" value={formData.commentary} onChange={handleChange}></textarea>
                            </div>
                            <div className='row mt-5'>
                                <div className='col-4'></div>
                                <button type="submit" className="btn modal-btn btn-block col-4">LOG</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogViolationModal;
