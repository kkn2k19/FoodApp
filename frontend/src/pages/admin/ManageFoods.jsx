import React, { useEffect, useState } from 'react'
import api from '../../services/api'

const ManageFoods = () => {
    const [foods, setFoods] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        restaurantId: "",
        image: null
    });

    const [editingFood, setEditingFood] = useState(null);

    useEffect(() => {
        loadFoods();
        loadRestaurants();
    }, []);

    const loadFoods = () => {
        api.get("/api/foods")
            .then(res => setFoods(res.data))
    }

    const loadRestaurants = () => {
        api.get("/api/restaurants")
            .then(res => setRestaurants(res.data))
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleImage = (e) => {
        setForm({
            ...form,
            image: e.target.files[0]
        })
    }

    const addFood = () => {
        if (!form.restaurantId) {
            alert("select restaurant")
            return;
        }

        const data = new FormData();
        data.append("name", form.name);
        data.append("price", form.price);
        data.append("description", form.description);
        data.append("category", form.category);
        data.append("image", form.image);

        api.post(`/api/foods/restaurant/${form.restaurantId}`, data)
            .then(() => {
                alert("Food added")
                setForm({
                    name: "",
                    price: "",
                    description: "",
                    category: "",
                    restaurantId: "",
                    image: null
                });
                loadFoods();
            })
    }

    const deleteFood = (id) => {
        if (!window.confirm("Delete food item?")) return;
        api.delete(`/api/foods/${id}`)
            .then(() => loadFoods())
            .catch(() => alert("Delete failed"))
    }

    const openEdit = (food) => {
        setEditingFood({
            ...food,
            newImage: null
        })
    }

    // const updateFood = () => {
    //     api.put(`/api/foods/${editingFood.id}`, {
    //         name: editingFood.name,
    //         price: editingFood.price,
    //         description: editingFood.description,
    //         category: editingFood.category
    //     })
    //         .then(() => {
    //             alert("Food updated")
    //             setEditingFood(null)
    //             loadFoods();
    //         })
    //         .catch(e => alert(e.response?.data || "Update failed"))
    // }

    const updateFood = () => {
        const data = new FormData();
        data.append("name", editingFood.name)
        data.append("price", editingFood.price)
        data.append("description", editingFood.description)
        data.append("category", editingFood.category)

        if (editingFood.newImage) {
            data.append("image", editingFood.newImage)
        }

        api.put(`/api/foods/${editingFood.id}/with-image`, data)
            .then(() => {
                alert("Food updated");
                setEditingFood(null);
                loadFoods();
            })
            .catch(e => alert(e.response?.data || "Update failed"))
    }

    return (
        // <div>ManageFoods</div>
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-6'>Manage Foods</h1>

            <div className='bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3'>
                <input
                    name="name"
                    placeholder='Food name'
                    value={form.name}
                    onChange={handleChange}
                    className='border p-2 rounded'
                />

                <input
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <select
                    name="restaurantId"
                    value={form.restaurantId}
                    onChange={handleChange}
                    className='border p-2 rounded'
                >
                    <option value="">Select Restaurant</option>
                    {restaurants.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                </select>

                <textarea
                    name="description"
                    placeholder='Description'
                    value={form.description}
                    onChange={handleChange}
                    className='border p-2 rounded col-span-2'
                />

                <input type="file" onChange={handleImage} className='col-span-2' />

                <button
                    onClick={addFood}
                    className='bg-green-600 text-white py-2 rounded col-span-2'
                >
                    Add Food
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {foods.map(f => (
                    <div key={f.id} className='bg-white p-4 rounded shadow'>
                        <img
                            src={f.imageUrl}
                            alt={f.name}
                            // className='h-32 w-full object-cover rounded mb-2'
                            className='w-full h-40 object-cover rounded mb-2'
                        />
                        <h2 className='font-semibold'>{f.name}</h2>
                        <p className='text-sm'>{f.restaurantName}</p>
                        <p className='font-bold'>Rs. {f.price}</p>

                        <div className='flex gap-2 mt-2'>
                            <button
                                onClick={() => openEdit(f)}
                                className="flex-1 bg-blue-500 text-white py-1 rounded"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => deleteFood(f.id)}
                                className="flex-1 bg-red-500 text-white py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {editingFood && (
                <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                    <div className='bg-white p-6 rounded w-96'>
                        <h2 className='text-lg font-bold mb-4'>Edit Food</h2>

                        <input className='border p-2 w-full mb-2'
                            value={editingFood.name}
                            onChange={e => setEditingFood({
                                ...editingFood,
                                name: e.target.value
                            })} />


                        <input className='border p-2 w-full mb-2'
                            value={editingFood.price}
                            onChange={e => setEditingFood({
                                ...editingFood,
                                price: Number(e.target.value)
                            })} />

                        <input className='border p-2 w-full mb-2'
                            value={editingFood.category}
                            onChange={e => setEditingFood({
                                ...editingFood,
                                category: e.target.value
                            })} />

                        <textarea className="border p-2 w-full mb-3"
                            value={editingFood.description}
                            onChange={e => setEditingFood({
                                ...editingFood,
                                description: e.target.value
                            })} />

                        <input className='mb-3'
                            type='file'
                            onChange={e => setEditingFood({
                                ...editingFood,
                                newImage: e.target.files[0]
                            })} />

                        <button
                            onClick={updateFood}
                            className='bg-green-600 text-white w-full py-2 rounded'>
                            Save Changes
                        </button>

                        <button
                            onClick={() => setEditingFood(null)}
                            className='mt-2 w-full bg-gray-300 py-1 rounded'>
                            Cancel
                        </button>

                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageFoods