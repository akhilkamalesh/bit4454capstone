import Navbar from './Navbar';
import './css/RecallDetails.css'
import LogViolationModal from './Modals/LogViolationModal';

function RecallDetails() {
    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="d-flex align-items-center justify-content-center mt-3">
                        <p className="h1 text-uppercase text-black fw-bold">recall details</p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-2"></div>
                    <div className="col-4">
                        <img className="product" src='https://s7d1.scene7.com/is/image/dish/Samsung_Galaxy_A15_Blue_Black_Hero?$ProductBase$&fmt=webp' />
                        <div className="row my-5">
                            <div className='col-4'>
                                <a href="../recalls">
                                    <button className="custom-btn text-uppercase" onclick="">back</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-3">
                        <p className="h3 text-dark">Samsung Galaxy</p>
                        <p className="desc text-light p-3 mt-4">
                            A voluntary recall has been initiated for a specific batch of Samsung Galaxy smartphones.
                            This recall is due to reported issues related to the battery, which could potentially compromise user safety.
                        </p>
                        <div className="row mt-5">
                            <div className="col-6">
                                <a href="../contact">
                                    <button className="custom-btn text-uppercase" onclick="">contact seller</button>
                                </a>
                            </div>
                            <div className="col-6">
                                <button className="custom-btn text-uppercase" data-toggle="modal"
                                    data-target="#logViolationModal">log violation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LogViolationModal />
        </div>

    );
};

export default RecallDetails;