import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {

    const { _id, firstName, lastName, skills, about, photoUrl } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
            dispatch(removeFeed(res.data.data.toUserId))
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="card  bg-base-200 w-72 shadow-xl border-spacing-1">
                <figure>
                    <img className='w-24 h-auto bject-cover mt-4'
                        src={photoUrl}
                        alt={firstName} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p>{about}</p>
                    <div className="card-actions justify-center gap-10">
                        <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                        <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard