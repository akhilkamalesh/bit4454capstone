import Navbar from "../Navbar";
import { useState } from 'react';
import '../css/AddListingForm.css';

function AddListingForm() {
    const [formData, setFormData] = useState({
        productName: '',
        sellerName: '',
        listingCategory: '',
        listingURL: '',
        priorityLevel: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/add-listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Listing added successfully, perform any necessary actions
                console.log('Listing added successfully');
                
            } else {
                console.error('Failed to add listing');
            }
        } catch (error) {
            console.error('Error adding listing:', error);
        }
        setFormData({
            productName: '',
            sellerName: '',
            listingCategory: '',
            listingURL: '',
            priorityLevel: ''
        });
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <h1 className="text-center mt-5 mb-5 text-black fw-bold text-uppercase">add listing</h1>
                        <form className="form-dark" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-1"></div>
                                <div className="col-4 text-right">
                                    <label className="form-label mt-2 text-uppercase" htmlFor="productName">Product Name:</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" id="productName" name="productName" 
                                    value={formData.productName} required onChange={handleChange}></input>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-1"></div>
                                <div className="col-4 text-right">
                                    <label className="form-label mt-2 text-uppercase" htmlFor="sellerName">Seller Name:</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" id="sellerName" name="sellerName" 
                                    value={formData.sellerName} required onChange={handleChange}></input>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-1"></div>
                                <div className="col-4 text-right">
                                    <label className="form-label mt-2 text-uppercase" htmlFor="listingCategory">listing category:</label>
                                </div>
                                <div className="col-4">
                                    <select type="select" className="form-select" id="listingCategory"
                                        name="listingCategory" required onChange={handleChange} value={formData.listingCategory} >
                                        <option></option>
                                        <option value="Retail">Retail</option>
                                        <option value="Web">Web</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-1"></div>
                                <div className="col-4 text-right">
                                    <label className="form-label mt-2 text-uppercase" htmlFor="listingURL">listing url:</label>
                                </div>
                                <div className="col-4">
                                    <input className="form-control" id="listingURL" name="listingURL"
                                    value={formData.listingURL}  onChange={handleChange}></input>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-1"></div>
                                <div className="col-4 text-right">
                                    <label className="form-label mt-2 text-uppercase" htmlFor="priorityLevel">priority level:</label>
                                </div>
                                <div className="col-4">
                                    <select className="form-select" id="priorityLevel" name="priorityLevel" 
                                    value={formData.priorityLevel} required onChange={handleChange}>
                                        <option></option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-1"></div>
                                <div className="col-4 text-right">
                                    <label className="form-label mt-2 text-uppercase" htmlFor="productImage">product image:</label>
                                </div>
                                <div className="col-4">
                                    <input type="file" className="form-control-file" id="productImage" name="productImage" />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-4"></div>
                                <div className="col-3">
                                    <button className="btn btn-block form-dark-btn text-uppercase" type="submit">import</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row mt-5">
                        <div className="col-1"></div>
                        <div className='col-2'>
                            <a href="../listings">
                                <button className="custom-btn text-uppercase">back</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddListingForm;