import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";

export default function Resume() {
    const [pdfUrl, setPdfUrl] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) return navigate("/login");

        const token = user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: "blob", // Specify response type as blob to handle PDF
        };

        axios
            .get(process.env.REACT_APP_SERVER_URL + "/api/resume", config)
            .then((res) => {
                console.log("Server response headers:", res.headers);
                console.log("Server response data type:", typeof res.data);

                // Convert the blob to a URL
                const blob = new Blob([res.data], { type: "application/pdf" });
                const url = window.URL.createObjectURL(blob);
                setPdfUrl(url);
            })
            .catch((err) => {
                console.log("Server fetch error:", err.response ? err.response.data : err.message);
                setError("Failed to fetch resume: " + (err.response ? err.response.data.error : err.message));
            });
    }, [user, navigate]);

    const handleGetLatexCode = (e) => {
        e.preventDefault();
        navigate("/code");
    };

    // Cleanup the object URL when the component unmounts
    useEffect(() => {
        return () => {
            if (pdfUrl) {
                window.URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [pdfUrl]);

    return (
        <div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex flex-row items-center justify-center">
                    <h2 className="text-center text-5xl font-extrabold text-gray-900">
                        Resume
                    </h2>
                </div>
                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                    Here is your resume, {user && user.name}!
                </p>
            </div>

            <button
                type="button"
                className="flex flex-row justify-center items-center mx-auto mt-8 rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-semibold text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={(e) => handleGetLatexCode(e)}
            >
                <CodeBracketSquareIcon className="h-6 w-6 mr-1" />
                Get Latex Code
            </button>

            <div className="mt-8 w-9/12 h-96 sm:w-10/12 sm:h-[100rem] mx-auto">
                {error ? (
                    <p className="text-red-600 text-center">{error}</p>
                ) : pdfUrl ? (
                    <iframe
                        src={pdfUrl + "#view=fitH"}
                        title="resume"
                        className="border-8 border-gray-300"
                        width="100%"
                        height="100%"
                    ></iframe>
                ) : (
                    <p>Loading resume...</p>
                )}
            </div>

            <div className="h-20"></div>
        </div>
    );
}