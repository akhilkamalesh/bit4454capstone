import Navbar from "../Navbar";
import { useState } from 'react';
import '../css/AddListingForm.css';

function ActualForm() {
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
        <div className="container">
            <div className="row justify-content-center mt-5">

                <form className="form-dark" onSubmit={handleSubmit}>
                    <p className="h5 email-sender">REPLY: Kevin Brown &lt; kevbrown@gmail.com &gt;</p>
                    <div className="row mt-3">
                        <div className="col d-flex mt-4">
                            <input type="radio" id="option1" name="options" value="option1" className="mb-2 mr-4" />
                            <label for="option1">Resolved: The seller removed the listing</label>
                        </div>
                        <div className="row">
                            <div className="col d-flex mt-2">
                                <input type="radio" id="option1" name="options" value="option1" className="mb-2 mr-4" />
                                <label for="option1">Resolved: The seller remediated the product to comply with the recall</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col d-flex mt-2">
                                <input type="radio" id="option1" name="options" value="option1" className="mb-2 mr-4" />
                                <label for="option1">Resolved: The product we flagged was not the recalled product (false positive)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col d-flex mt-2">
                                <input type="radio" id="option1" name="options" value="option1" className="mb-2 mr-4" />
                                <label for="option1">Issue NOT resolved: Further action is still required by the seller</label>
                            </div>
                        </div>
                        <div className="row d-flex mt-4">
                            <button className="email-btn">send</button>
                            <button className="email-btn">attach file</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ActualForm;