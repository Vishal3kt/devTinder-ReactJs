import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                {
                    emailId, password
                },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.user))
            return navigate("/");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    }

    return (
        <div className="login-wrapper flex items-center justify-center mt-8">
            <div className="card bg-base-100 w-96 shadow-xl border-1 border-slate-200 mb-8">
                <div className="card-body">
                    <h2 className="card-title text-center self-center font-bold">Login</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email ID:</legend>
                        <input onChange={(e) => { setEmailId(e.target.value) }} value={emailId} type="text" className="input" placeholder="Email here" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="text" className="input" placeholder="Password here" />
                    </fieldset>
                    <p className='text-red-500'>{error}</p>
                    <p>New user?<Link to="/signup" className='pl-1 font-semibold hover:opacity-60'>Signup here</Link></p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login