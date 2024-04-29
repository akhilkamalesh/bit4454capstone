import Navbar from "../Navbar";
import '../css/ContactSeller.css'

function ContactSeller() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <h1 className="text-center mt-5 mb-5 text-black fw-bold">CONTACT SELLERS</h1>
                        <div className="row">
                            <div className="form-group col-6">
                                <textarea className="form-control contact-form" rows="2" placeholder="RECIPIENT(S):"></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-6 mt-2">
                                <input type="text" className="form-control contact-form" placeholder="SUBJECT:" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group mt-2">
                                <textarea className="form-control contact-form" rows="6" placeholder="MESSAGE:"></textarea>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="form-group">
                                <input type="file" className="form-control-file" />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-6"></div>
                            <div className="col">
                                <button className="btn custom-btn btn-block">Inbox</button>
                            </div>
                            <div className="col">
                                <button className="btn custom-btn btn-block">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ContactSeller;
