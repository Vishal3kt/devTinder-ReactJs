import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Profile = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUser = async () => {
        if (user) return;
        try {
            const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
            dispatch(addUser(res.data));
        } catch (err) {
            console.error("Error fetching profile:", err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const editProfile = () => {
        navigate("/profile/edit");
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <button className="btn btn-primary" onClick={editProfile}>Add Data</button>
            </div>
        );
    }

    return (
        <div className="flex justify-center py-6">
            <div className="card bg-base-200 w-96 shadow-xl border-spacing-1 p-4">
                <figure>
                    <img className="w-40 h-40 rounded-full object-cover" src={user?.photoUrl} alt={user?.firstName} />
                </figure>
                <div className="card-body text-start">
                    <h2 className="card-title">{user?.firstName} {user?.lastName}</h2>
                    <p><strong>Email:</strong> {user?.emailId}</p>
                    <p><strong>Age:</strong> {user?.age}</p>
                    <p><strong>Gender:</strong> {user?.gender}</p>
                    <p><strong>About:</strong> {user?.about}</p>
                    <p><strong>Skills:</strong> {user?.skills?.join(", ")}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={editProfile}>Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
