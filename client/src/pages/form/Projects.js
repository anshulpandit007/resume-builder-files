import React, { useState, useEffect } from "react";
import Project from "../../components/form/Project";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";

export default function Projects() {
    const [projects, setProjects] = useState([]);

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
            .get(
                process.env.REACT_APP_SERVER_URL + "/api/form/projects",
                config
            )
            .then((res) => {
                setProjects(res.data);
            })
            .catch((err) => console.log(err.message));
    }, [user, navigate]);

    const addProject = () => {
        setProjects([
            ...projects,
            {
                project_name: "",
                project_link: "",
                project_github: "",
                project_desc: [""],
            },
        ]);
    };

    const handleProjectsSubmit = async (e) => {
        e.preventDefault();

        const token = user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .post(
                process.env.REACT_APP_SERVER_URL + "/api/form/projects",
                projects,
                config
            )
            .then((res) => {
                navigate("/achievements");
                toast.success("Projects Details Saved!");
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex flex-row items-center justify-center">
                    <ClipboardDocumentListIcon className="h-14 w-auto pr-1" />
                    <h2 className="text-center text-5xl font-extrabold text-gray-900">
                        Projects
                    </h2>
                </div>
                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                    Please fill your project details
                </p>
            </div>

            <form onSubmit={handleProjectsSubmit}>
                {projects.map((e, i) => {
                    return (
                        <Project
                            projects={projects}
                            setProjects={setProjects}
                            idx={i}
                            key={i}
                        />
                    );
                })}

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-gray-50 px-4 py-2 text-center sm:px-6">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-zinc-700 py-3 px-4 w-full text-sm font-medium text-white shadow-sm hover:bg-zinc-900"
                            onClick={addProject}
                        >
                            Add Project
                        </button>
                    </div>
                    <div className="bg-gray-50 px-4 py-2 text-center sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 w-full text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
