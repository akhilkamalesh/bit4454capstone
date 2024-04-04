function Navbar() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li>
                            <a className="nav-link" href="/">Logout</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="../recalls">Recalls</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link"
                                href="../listings">Listings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="../contact">Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Inbox</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;