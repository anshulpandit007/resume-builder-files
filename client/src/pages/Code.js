import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Code() {
    const [texCode, setTexCode] = useState("");

    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) return navigate("/login");

        const token = user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get(process.env.REACT_APP_SERVER_URL + "/api/resume/code", config)
            .then((res) => {
                setTexCode(res.data);
            })
            .catch((err) => console.log("error", err));
    }, [user, navigate]);

    return (
        <div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex flex-row items-center justify-center">
                    <h2 className="text-center text-5xl font-extrabold text-gray-900">
                        Latex Code
                    </h2>
                </div>
                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                    Here is your Latex code of the resume, {user.name}!
                </p>
            </div>

            <div className="mt-10 w-9/12 sm:w-10/12 mx-auto shadow-lg bg-gray-200 p-5">
                <div className="overflow-x-auto font-mono">{texCode}</div>
            </div>
        </div>
    );
}
