import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [skills, setSkills] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, age, gender, about, emailId, password, skills, photoUrl }, { withCredentials: true })
            dispatch(addUser(res.data.user))
            return navigate("/login")
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    }

    return (
        <div>
            <div className="login-wrapper flex items-center justify-center mt-8">
                <div className="card bg-base-100 w-96 shadow-xl border-1 border-slate-200 mb-8">
                    <div className="card-body px-6 py-4">
                        <h2 className="card-title text-center self-center font-bold">Sign In</h2>
                        <div className="name-wrapper flex justify-between gap-2 w-[100%]">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name:</legend>
                                <input onChange={(e) => { setFirstName(e.target.value) }} value={firstName} type="text" className="input" placeholder="First Name here" />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name:</legend>
                                <input onChange={(e) => { setLastName(e.target.value) }} value={lastName} type="text" className="input" placeholder="Last Name here" />
                            </fieldset>
                        </div>

                        <div className="info-wrapper flex justify-between gap-2">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Age:</legend>
                                <input onChange={(e) => { setAge(e.target.value) }} value={age} type="number" className="input" placeholder="Age here" />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender:</legend>
                                <input onChange={(e) => { setGender(e.target.value) }} value={gender} type="text" className="input" placeholder="Gender here" />
                            </fieldset>
                        </div>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">About:</legend>
                            <input onChange={(e) => { setAbout(e.target.value) }} value={about} type="text" className="input" placeholder="About here" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email ID:</legend>
                            <input onChange={(e) => { setEmailId(e.target.value) }} value={emailId} type="text" className="input" placeholder="Email here" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="text" className="input" placeholder="Password here" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Skills</legend>
                            <input onChange={(e) => { setSkills(e.target.value) }} value={skills} type="text" className="input" placeholder="Skills here" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">photoUrl</legend>
                            <input onChange={(e) => { setPhotoUrl(e.target.value) }} value={photoUrl} type="text" className="input" placeholder="Skills here" />
                        </fieldset>
                        <p className='text-red-500'>{error}</p>
                        <p>Already a user?<Link to="/login" className='pl-1 font-semibold hover:opacity-60'>Login here</Link></p>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={handleSignup}>Signup</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup