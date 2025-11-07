import React, { useState, useEffect } from "react";
import Skill from "../../components/form/Skill";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

export default function Skills() {
    const [skills, setSkills] = useState([]);

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
            .get(process.env.REACT_APP_SERVER_URL + "/api/form/skills", config)
            .then((res) => {
                setSkills(res.data);
            })
            .catch((err) => console.log(err.message));
    }, [user, navigate]);

    const addSkill = () => {
        setSkills([
            ...skills,
            {
                skill_title: "",
                skill_text: "",
            },
        ]);
    };

    const handleSkillsSubmit = async (e) => {
        e.preventDefault();

        const token = user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .post(
                process.env.REACT_APP_SERVER_URL + "/api/form/skills",
                skills,
                config
            )
            .then((res) => {
                navigate("/profiles");
                toast.success("Skills Details Saved!");
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex flex-row items-center justify-center">
                    <WrenchScrewdriverIcon className="h-14 w-auto pr-1" />
                    <h2 className="text-center text-5xl font-extrabold text-gray-900">
                        Skills
                    </h2>
                </div>
                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                    Please fill your skills details
                </p>
            </div>

            <form onSubmit={handleSkillsSubmit}>
                {skills.map((e, i) => {
                    return (
                        <Skill
                            skills={skills}
                            setSkills={setSkills}
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
                            onClick={addSkill}
                        >
                            Add Skill
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
