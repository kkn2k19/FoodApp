import React, { useEffect, useState } from 'react'
import api from '../../services/api'

const ManageRestaurants = () => {

    const [restaurants, setRestaurants] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        addressLine1: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [editingRestaurant, setEditingRestaurant] = useState(null);

    useEffect(() => {
        loadRestaurants();
    }, []);

    const loadRestaurants = () => {
        api.get("/api/restaurants")
            .then(res => setRestaurants(res.data))
            .catch(() => alert("Failed to load restaurants"));
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const addRestaurant = () => {
        api.post("/api/restaurants", form)
            .then(() => {
                alert("Restaurant added");
                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    addressLine1: "",
                    city: "",
                    state: "",
                    pincode: ""
                });
                loadRestaurants();
            })
            .catch(e => alert(e.response?.data || "Failed adding restaurant"))
    }

    const deleteRestaurant = (id) => {
        if (!window.confirm("Delete restaurant?")) return;
        api.delete(`/api/restaurants/${id}`)
            .then(() => loadRestaurants())
            .catch(() => alert("Delete failed"))
    }

    const openEdit = (res) => {
        setEditingRestaurant({
            ...res
        })
    }

    const updateRestaurant = () => {
        api.put(`/api/restaurants/${editingRestaurant.id}`, editingRestaurant)
            .then(() => {
                alert("Restaurant updated");
                setEditingRestaurant(null);
                loadRestaurants();
            })
            .catch(e => alert(e.response?.data || "update failed"))
    }

    return (
        // <div>ManageRestaurants</div>
        <div className='p-6'>
            <h1 className="text-2xl font-bold mb-6">Manage Restaurants</h1>

            <div className='bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3'>
                <input
                    name='name'
                    placeholder='Name'
                    value={form.name}
                    onChange={handleChange}
                    className='border p-2 rounded'
                />
                <input
                    name='email'
                    placeholder='Email'
                    value={form.email}
                    onChange={handleChange}
                    className='border p-2 rounded'
                />
                <input
                    name='phone'
                    placeholder='Phone'
                    value={form.phone}
                    onChange={handleChange}
                    className='border p-2 rounded'
                />
                <input
                    name='pincode'
                    placeholder='Pincode'
                    value={form.pincode}
                    onChange={handleChange}
                    className='border p-2 rounded'
                />
                <input
                    name='city'
                    placeholder='City'
                    value={form.city}
                    onChange={handleChange}
                    className='border p-2 rounded'
                />
                <input
                    name='state'
                    placeholder='State'
                    value={form.state}
                    onChange={handleChange}
                    className='border p-2 rounded'
                />
                <textarea
                    name="addressLine1"
                    placeholder="Address"
                    value={form.addressLine1}
                    onChange={handleChange}
                    className='border p-2 rounded col-span-2'
                />
                <button
                    onClick={addRestaurant}
                    className='bg-blue-600 text-white py-2 rounded col-span-2'>
                    Add Restaurant
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4' >
                {restaurants.map(r => (
                    <div
                        key={r.id}
                        className='bg-white p-4 rounded shadow'
                    >
                        <h2 className='font-semibold text-lg'>{r.name}</h2>
                        <p className='text-sm'>{r.city}, {r.state}</p>
                        <p className='text-sm'>{r.phone}</p>

                        <div className='flex gap-2 mt-3'>
                            <button
                                onClick={() => openEdit(r)}
                                className='flex-1 bg-blue-500 text-white py-1 rounded'
                            >
                                Edit
                            </button>

                            <button
                                className='flex-1 bg-red-500 text-white py-1 rounded'
                                onClick={() => deleteRestaurant(r.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {editingRestaurant && (
                <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                    <div className='bg-white p-6 rounded w-96'>
                        <h2 className='text-lg font-bold mb-4'>Edit Restaurant</h2>

                        <input
                            className='border p-2 w-full mb-2'
                            value={editingRestaurant.name}
                            onChange={e => setEditingRestaurant({
                                ...editingRestaurant,
                                name: e.target.value
                            })}
                        />

                        <input
                            className='border p-2 w-full mb-2'
                            value={editingRestaurant.email}
                            onChange={e => setEditingRestaurant({
                                ...editingRestaurant,
                                email: e.target.value
                            })}
                        />
                        <input
                            className="border p-2 w-full mb-2"
                            value={editingRestaurant.phone}
                            onChange={e => setEditingRestaurant({
                                ...editingRestaurant,
                                phone: e.target.value
                            })}
                        />
                        <textarea
                            className='border p-2 w-full mb-2'
                            value={editingRestaurant.addressLine1}
                            onChange={e => setEditingRestaurant({
                                ...editingRestaurant,
                                addressLine1: e.target.value
                            })}
                        />
                        <input
                            className='border p-2 w-full mb-2'
                            value={editingRestaurant.city}
                            onChange={e => setEditingRestaurant({
                                ...editingRestaurant,
                                city: e.target.value
                            })}
                        />
                        <input
                            className="border p-2 w-full mb-2"
                            value={editingRestaurant.state}
                            onChange={e => setEditingRestaurant({
                                ...editingRestaurant,
                                state: e.target.value
                            })}
                        />

                        <input
                            className="border p-2 w-full mb-3"
                            value={editingRestaurant.pincode}
                            onChange={e => setEditingRestaurant({
                                ...editingRestaurant,
                                pincode: e.target.value
                            })}
                        />
                        <button
                            className='bg-green-600 text-white w-full py-2 rounded'
                            onClick={updateRestaurant}
                        >
                            Save Changes
                        </button>

                        <button
                            className='mt-2 w-full bg-gray-300 py-1 rounded'
                            onClick={() => setEditingRestaurant(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageRestaurants