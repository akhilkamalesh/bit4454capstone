import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import './css/Main.css';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductRecalls from './ProductRecalls';
import ContactSeller from './ContactSeller';
import ImportedListings from './ImportedListings';
import RecallDetails from './RecallDetails';
import TicketItems from './TicketItems';

function App() {

    return (
        <Router>
            <div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column">
                    <div className="tab-content">
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/recalls" element={<ProductRecalls />} />
                            <Route path="/listings" element={<ImportedListings />} />
                            <Route path="/contact" element={<ContactSeller />} />
                            <Route path="/details" element={<RecallDetails />} />
                            <Route path="/tickets" element={<TicketItems />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
