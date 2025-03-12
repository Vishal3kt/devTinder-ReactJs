import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const user = useSelector(store => store.user) || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [about, setAbout] = useState(user?.about || "");
    const [skills, setSkills] = useState(user?.skills || "");
    const [showToast, setShowState] = useState(false);

    const updateProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit",
                { firstName, lastName, photoUrl, about, skills },
                { withCredentials: true }
            );

            dispatch(addUser(res?.data?.data));
            setShowState(true);

            setTimeout(() => {
                setShowState(false);
                navigate("/profile/view");
            }, 500);
        } catch (err) {
            console.log(err);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <>
            {showToast && (
                <div style={{ zIndex: "99" }} className="toast toast-top toast-center">
                    <div className="alert bg-success alert-info">
                        <span>Profile updated successfully!</span>
                    </div>
                </div>
            )}
            <div>
                <div className="login-wrapper flex items-center justify-center">
                    <div className="card bg-base-100 w-96 shadow-xl border-1 border-slate-200 my-5">
                        <div className="card-body">
                            <h2 className="card-title text-center self-center">Edit Profile</h2>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name:</legend>
                                <input onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" className="input" placeholder="Type here..." />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name:</legend>
                                <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" className="input" placeholder="Type here..." />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Photo URL:</legend>
                                <input onChange={(e) => setPhotoUrl(e.target.value)} value={photoUrl} type="text" className="input" placeholder="Type here..." />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About:</legend>
                                <input onChange={(e) => setAbout(e.target.value)} value={about} type="text" className="input" placeholder="Type here..." />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Skills:</legend>
                                <input onChange={(e) => setSkills(e.target.value)} value={skills} type="text" className="input" placeholder="Type here..." />
                            </fieldset>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={updateProfile}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default EditProfile;
