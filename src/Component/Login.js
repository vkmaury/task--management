import React, { useState, } from 'react';
import { userLogin, addUser } from '../Services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const usenavigate = useNavigate();
    const [signup, setSignup] = useState(false);
    const [users, setUsers] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsers({ ...users, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const getUsers = await userLogin(users);
            if (getUsers.message === "Login successful") {
                usenavigate("/Home");
                toast.success(getUsers.message);
            } else {
                toast.error(getUsers.message);
                return false;
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    const handlerSignup = async (e) => {
        e.preventDefault();

        try {
            const user = await addUser(users);
            if (user.status == "500") {
                toast.error(user.message);
                return false;
            } else if (user.status == "409") {
                toast.error(user.message);
                return false;
            } else if (user.status == "400") {
                toast.error(user.message);
                return false;
            } else {
                usenavigate("/Login");
                toast.success(user.message);
            }
        } catch (error) {
            console.error("Signup failed", error);
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        {
                            signup ? <div className="card">
                                <div className="card-header">
                                    <h3 className="text-center">Signup</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handlerSignup}>
                                        <div className="mb-3">
                                            <label className="form-label">Email address</label>
                                            <input type="email" className="form-control" name="email" aria-describedby="emailHelp" onChange={handleInputChange} value={users.email} required />
                                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input type="password" className="form-control" name="password" onChange={handleInputChange} value={users.password} required />
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <p><a onClick={() => setSignup(false)} class="link-opacity-100" href="#">back to login</a></p>
                                            <button type="submit" className="btn btn-primary">Signup</button>
                                        </div>
                                    </form>
                                </div>
                            </div> : <div className="card">
                                <div className="card-header">
                                    <h3 className="text-center">Login</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Email address</label>
                                            <input type="email" className="form-control" name="email" aria-describedby="emailHelp" onChange={handleInputChange} value={users.email} required />
                                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input type="password" className="form-control" name="password" onChange={handleInputChange} value={users.password} required />
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <p><a onClick={() => setSignup(true)} class="link-opacity-100" href="#">You have not an signup ?</a></p>
                                            <button type="submit" className="btn btn-primary">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;