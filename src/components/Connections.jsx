import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if (!connections) return;

    if (connections.length === 0) return <h1 className='text-center my-6 font-semibold'>No Connections Found!!!</h1>

    return (
        <div className='flex flex-col justify-center items-center'>
            <h2 className='text-3xl font-semibold my-5'>Connections</h2>
            {connections.map((connection) => {
                const { about, firstName, lastName, photoUrl, _id } = connection;

                return (
                    <div key={_id} className="card card-side bg-base-100 shadow-sm w-[40%] mb-5">
                        <figure>
                            <img className='h-28 max-w-32 object-contain px-4'
                                src={photoUrl}
                                alt="img" />
                        </figure>
                        <div className="card-body gap-3">
                            <h2 className="card-title">{firstName + " " + lastName}</h2>
                            <p>{about}</p>
                            <div className="card-actions justify-start">
                                <button className="btn btn-primary">Ignore</button>
                                <button className="btn btn-secondary">Interested</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections