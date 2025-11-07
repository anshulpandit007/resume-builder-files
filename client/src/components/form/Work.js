import React from "react";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

export default function Work({ exp, setExp, idx }) {
    const handleOnChange = (e) => {
        const list = [...exp];
        list[idx][e.target.name] = e.target.value;
        setExp(list);
    };

    const handleThisDescChange = (e, i) => {
        const list = [...exp];
        list[idx]["job_desc"][i] = e.target.value;
        setExp(list);
    };

    const deleteThisDesc = (i) => {
        const list = [...exp];
        list[idx]["job_desc"].splice(i, 1);
        setExp(list);
    };

    const handleAddDesc = () => {
        const list = [...exp];
        list[idx]["job_desc"] = [...list[idx]["job_desc"], ""];
        setExp(list);
    };

    const handleDeleteExp = () => {
        const list = [...exp];
        list.splice(idx, 1);
        setExp(list);
    };

    return (
        <div className="mt-10 sm:mt-0">
            <div className="mt-10 mx-auto w-8/12 md:w-9/12 max-sm:w-full max-sm:p-2 max-sm:pt-0   ">
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <label
                                        htmlFor="company_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Company Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="company_name"
                                        autoComplete="company_name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={exp[idx]["company_name"]}
                                        placeholder="e.g, Google"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="job_title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        name="job_title"
                                        value={exp[idx]["job_title"]}
                                        id="job_title"
                                        autoComplete="job_title"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="e.g, Software Engineering Intern"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="job_location"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Job Location
                                    </label>
                                    <input
                                        type="text"
                                        name="job_location"
                                        id="job_location"
                                        autoComplete="job_location"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={exp[idx]["job_location"]}
                                        placeholder="e.g, Bengaluru, India"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="job_start_date"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Job Start Date
                                    </label>
                                    <input
                                        type="text"
                                        name="job_start_date"
                                        value={exp[idx]["job_start_date"]}
                                        id="job_start_date"
                                        autoComplete="job_start_date"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="e.g, Jun. 2024"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="job_end_date"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Job End Date
                                    </label>
                                    <input
                                        type="text"
                                        name="job_end_date"
                                        id="job_end_date"
                                        autoComplete="job_end_date"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={exp[idx]["job_end_date"]}
                                        placeholder="e.g, Jul. 2024"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label
                                        htmlFor="job_desc"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Job Description
                                    </label>
                                    <p className="text-xs text-gray-500">
                                        (Description will result in bullet
                                        points, so, try adding at least two
                                        descriptions per experience.)
                                    </p>
                                    {exp[idx]["job_desc"].map((e, i) => {
                                        return (
                                            <div
                                                className="mt-1 flex flex-row"
                                                key={i}
                                            >
                                                <textarea
                                                    id="job_desc"
                                                    name="job_desc"
                                                    rows={1}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="e.g, Improved the redering time of dashboard by 20%."
                                                    value={
                                                        exp[idx]["job_desc"][i]
                                                    }
                                                    onChange={(e) =>
                                                        handleThisDescChange(
                                                            e,
                                                            i
                                                        )
                                                    }
                                                />
                                                {exp[idx]["job_desc"].length >
                                                    1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteThisDesc(i)
                                                        }
                                                        id={idx}
                                                    >
                                                        <MinusCircleIcon className="text-gray-600 w-9 leading-normal ml-2 hover:text-gray-800" />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}

                                    <div className="pt-4 text-left ">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-gray-800 text-gray-800 py-2 px-4 text-xs font-medium text-white shadow-sm hover:shadow-md hover:text-gray-900 hover:border-gray-900"
                                            onClick={() => handleAddDesc()}
                                        >
                                            Add Description
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                onClick={() => handleDeleteExp(idx)}
                            >
                                Delete Experience
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
