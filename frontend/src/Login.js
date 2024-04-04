import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/cpsc.png';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                navigate('/recalls');
                console.log('Login successful');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setFormData({
            username: '',
            password: ''
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container-fluid">
            <div className="row align-items-center">
                <div className="col-7 mr-3">
                    <img src={logo} className="img-fluid cover-logo" alt="logo" />
                </div>
                <div className="col-3 justify-content-center text-center ml-5">
                    <p className="text-black text-uppercase h1 my-5 pb-5 fw-bold">sign in</p>
                    <form onSubmit={handleSubmit}>
                        <input className="input1 mt-4 font-italic" type="text" name="username"
                            placeholder="EMAIL OR USERNAME" value={formData.username} onChange={handleChange} required />
                        <input className="input1 mt-4 font-italic" type="password" name="password"
                            placeholder="PASSWORD" value={formData.password} onChange={handleChange} required />
                        <div className="row mt-2">
                            <a className="text-uppercase text-secondary fw-light" href="/">forgot password</a>
                        </div>
                        <button className="contact1-form-btn mt-4 text-uppercase" type="submit">login</button>
                        <div className="row mt-2">
                            <a className="text-uppercase text-secondary font-weight-light" href="/">create account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
