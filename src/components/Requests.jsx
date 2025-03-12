import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            dispatch(addRequests(res.data.data))
        } catch (err) {
            console.log(err)
        }
    }

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
            dispatch(removeRequest(_id))
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

    if (!requests) return;

    if (requests.length === 0) return <h1 className='text-center my-6 font-semibold'>No Requests Found!!!</h1>

    return (
        <div className='flex flex-col justify-center items-center'>
            <h2 className='text-3xl font-semibold my-5'>Requests</h2>
            {requests.map((request) => {
                const { about, firstName, lastName, photoUrl, _id, age, gender, skills } = request.fromUserId;

                return (
                    <div key={_id} className="card card-side bg-base-100 shadow-sm w-[70%] mb-5">
                        <figure className='w-[30%]'>
                            <img className='h-auto  object-contain px-4'
                                src={photoUrl}
                                alt="img" />
                        </figure>
                        <div className="card-body gap-3 w-[40%]">
                            <h2 className="card-title">{firstName + " " + lastName || "-"}</h2>
                            <p><strong>Age:</strong> {age || "-"}</p>
                            <p><strong>Gender:</strong> {gender || "-"}</p>
                            <p><strong>About:</strong> {about || "-"}</p>
                            <p><strong>Skills:</strong> {skills?.join(", ") || "-"}</p>
                            <div className="card-actions justify-start">
                                <button className="btn btn-primary" onClick={() => { reviewRequest("rejected", request._id) }}>Reject</button>
                                <button className="btn btn-secondary" onClick={() => { reviewRequest("accepted", request._id) }}>Accept</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Requests;