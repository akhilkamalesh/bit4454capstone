function AddListingButton() {
    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-10"></div>
                <div className="col-2">
                    <a href="../add-listing">
                        <button className="custom-btn text-uppercase" type="button" onClick={''}>add listing</button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AddListingButton;