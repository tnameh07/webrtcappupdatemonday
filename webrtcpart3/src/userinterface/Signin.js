import React, { useState ,useContext } from 'react';
import axios from 'axios';
import "../App.css"; // Custom styles
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import "./Signin.css";
import Swal from 'sweetalert2';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const sendData = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            console.log( " login data : " , email , "  password : ", password);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, { email, password });
            console.log("Success", response.data);
            const { token, user } = response.data;
console.log(token , "   user : " , user);
// console.log( " user : ", response.data.user);
            // Save token and user ID in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('User_id',user._id);
            login(user);
            Swal.fire({
                icon: 'success',
                title: 'Signed In Successfully!',
                text: 'You will be redirected to your dashboard.',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/');
            });

        } catch (error) {
            console.error("Error signing in", error);
            
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Sign In Failed',
                text: 'Please check your credentials and try again.',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="superDivSignup d-flex justify-content-center align-items-center vh-100">
            <div className="signin-container">
                <div className="card signin-card shadow-lg">
                    <div className="card-body p-5">
                        <h3 className="card-title text-center mb-4">Sign In</h3>
                        <form onSubmit={sendData}>
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
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block custom-btn mt-4"
                                disabled={loading}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                        <p className="text-center mt-3">
                            Don't have an account? <Link to="/ragistration" className="signup-link"><small>Sign Up</small></Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
