import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        city: "",
        state: "",
        pincode: ""
    });

    const navigate = useNavigate();

    const [cities, setCities] = useState([]);


    useEffect(() => {
        api.get("/api/auth/me")
            .then(res => {
                setForm({
                    name: res.data.name || "",
                    phone: res.data.phone || "",
                    city: res.data.city || "",
                    state: res.data.state || "",
                    pincode: res.data.pincode || ""
                });
            });
    }, []);

    const handlePincodeChange = async (e) => {
        const pin = e.target.value;

        setForm({
            ...form,
            pincode: pin
        })

        if (pin.length === 6) {
            try {
                const res = await fetch(
                    `https://api.postalpincode.in/pincode/${pin}`
                );

                const data = await res.json();
                if (data[0].Status === "Success") {
                    const postOffices = data[0].PostOffice;

                    const districts = [
                        ...new Set(postOffices.map(p => p.District))
                    ];

                    setCities(districts);

                    setForm(prev => ({
                        ...prev,
                        city: districts[0],
                        state: postOffices[0].State
                    }))
                } else {
                    alert("Invalid Pincode")
                }
            } catch {
                alert("unable to fetch location")
            }
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        api.put("/api/auth/update-profile", form)
            .then(() => {
                alert("Profile updated successfully");
                navigate("/profile");
            })
            .catch(e => alert(e.response?.data || "update failed"))
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100" >
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow w-96"
            >
                <h2 className="text-xl font-bold mb-4">
                    Edit Profile
                </h2>
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 w-full mb-3 rounded"
                />

                <input
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="border p-2 w-full mb-3 rounded"
                />

                <input
                    name="pincode"
                    placeholder="Pincode"
                    value={form.pincode}
                    onChange={handlePincodeChange}
                    className="border p-2 w-full mb-3 rounded"
                />
                <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="border p-2 w-full mb-3 rounded"
                    disabled={!cities.length}
                >
                    <option value="">Select City</option>
                    {cities.map((c, i) => (
                        <option key={i} value={c} >{c}</option>
                    ))}
                </select>

                <input
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                    readOnly
                    className="border p-2 w-full mb-3 rounded"
                />



                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Save Changes
                </button>
            </form>
        </div>
    )
}

export default EditProfile;