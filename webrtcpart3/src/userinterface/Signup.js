import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Signup.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const sendData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {

            console.log(  username,"  " , email, " ", password );
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, {
                username,
                email,
                password
            }
        );

            console.log("Success", response.data);

            // // Save JWT token in localStorage
            // const { token } = response.data;
            // localStorage.setItem('token', token);
            // localStorage.setItem('userId', JSON.stringify(response.data.user.id));

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Signup Successful!',
                text: 'You will be redirected to the dashboard.',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/login');
            });

        } catch (error) {
            console.error("Error during signup", error);
            const errorMessage = error.response?.data?.message || 'Signup failed. Please check your inputs and try again.';
            setError(errorMessage);
            
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='superDivSignup d-flex justify-content-center align-items-center vh-100'>
            <div className="signup-container">
                <div className="card signup-card shadow-lg">
                    <div className="card-body p-5">
                        <h3 className="card-title text-center mb-4">Sign Up</h3>
                        <form onSubmit={sendData}>
                            <div className="form-group mb-3">
                                <label htmlFor="username" className="form-label">
                                    <FaUser className="input-icon" /> Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    aria-required="true"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">
                                    <FaEnvelope className="input-icon" /> Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    aria-required="true"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password" className="form-label">
                                    <FaLock className="input-icon" /> Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    aria-required="true"
                                />
                            </div>
                            {error && <div className="alert alert-danger mt-2" role="alert">{error}</div>}
                            <button
                                type="submit"
                                className="btn btn-primary btn-block custom-btn mt-4"
                                disabled={loading}
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </form>
                        <p className="text-center mt-3">
                            Already have an account? <Link to="/signin" className="signin-link"><small>Sign In</small></Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
