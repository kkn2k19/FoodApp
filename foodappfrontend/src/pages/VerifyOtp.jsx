import React, { useState } from 'react'
import api from '../services/api'
import { useLocation, useNavigate } from 'react-router-dom'

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;
    const type = location.state?.type;

    if (!email || !type) {
        alert("Session expired. Please try again.");
        navigate("/login");
        return null;
    }

    // const verifyOtp = () => {
    //     const url =
    //         type === "VERIFY"
    //             ? "/api/auth/verify-email" :
    //             "/api/auth/verify-reset-otp";

    //     api.post(url, { email, otp })
    //         .then((res) => {
    //             // navigate("/reset-password", { state: { email, otp } });
    //             alert(res.data);
    //             if (type === "VERIFY") {
    //                 navigate("/login");
    //             } else {
    //                 navigate("/reset-password", { state: { email, otp } });
    //             }
    //         })
    //         .catch((err) => alert(err.response?.data || "Invalid OTP"));
    // }

    const verifyOtp = () => {
        if (type === "VERIFY") {
            // EMail verification for new registration
            api.post("/api/auth/verify-email", { email, otp })
                .then((res) => {
                    alert(res.data);
                    navigate("/login");
                })
                .catch((err) => alert(err.response?.data || "Invalid OTP"));
        } else {
            // DO NOT call backend here for RESET
            // Just move to reset page with otp
            navigate("/reset-password", { state: { email, otp } });
        }
    };


    const resendOtp = () => {
        api.post("/api/auth/resend-otp", { email, type })
            .then((res) => {
                // navigate("/verify-otp", { state: { email } });
                alert(res.data);
            })
            .catch((err) => alert(err.response?.data || "Try again later"));
    }

    return (
        // <div>VerifyOtp</div>
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-xl p-8'>
                <h2 className='text-xl font-bold text-center mb-6'>Verify OTP</h2>
                <input
                    type="text"
                    placeholder='Enter OTP'
                    className='w-full px-4 py-2 border rounded-lg mb-4'
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button
                    className='w-full bg-orange-500 text-white py-2 rounded-lg mb-3'
                    onClick={verifyOtp}
                >
                    Verify OTP
                </button>
                <p
                    className='text-sm text-center text-orange-500 cursor-pointer'
                    onClick={resendOtp}
                >
                    Resend OTP
                </p>
            </div>
        </div>
    )
}

export default VerifyOtp