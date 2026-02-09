import React, { useEffect, useState } from 'react'
import api from '../../services/api'

const ManageFoods = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        api.get("/api/foods")
            .then(res => setFoods(res.data))
    }, []);

    const deleteFood = (id) => {
        if (!window.confirm("Delete food item?")) return;
        api.delete(`/api/foods/${id}`)
            .then(() => setFoods(foods.filter(f => f.id !== id)));
    }
    return (
        <div>ManageFoods</div>
    )
}

export default ManageFoods