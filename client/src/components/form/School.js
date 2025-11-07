import React from "react";

export default function School({ edu, setEdu, idx }) {
    const handleOnChange = (e) => {
        const list = [...edu];
        list[idx][e.target.name] = e.target.value;
        setEdu(list);
    };

    const handleDeleteSchool = (idx) => {
        const list = [...edu];
        list.splice(idx, 1);
        setEdu(list);
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
                                        htmlFor="clg_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        College Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="clg_name"
                                        autoComplete="clg_name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={edu[idx]["clg_name"]}
                                        placeholder="e.g, Vellore Institute of Technology (VIT Vellore)"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="clg_location"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        College Location
                                    </label>
                                    <input
                                        type="text"
                                        name="clg_location"
                                        value={edu[idx]["clg_location"]}
                                        id="clg_location"
                                        autoComplete="clg_location"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="e.g, Vellore, India"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="clg_degree"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        College Degree
                                    </label>
                                    <input
                                        type="text"
                                        name="clg_degree"
                                        id="clg_degree"
                                        autoComplete="clg_degree"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={edu[idx]["clg_degree"]}
                                        placeholder="e.g, Bachelar of Technology"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="clg_major"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        College Major
                                    </label>
                                    <input
                                        type="text"
                                        name="clg_major"
                                        value={edu[idx]["clg_major"]}
                                        id="clg_major"
                                        autoComplete="clg_major"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="e.g, Information Technology"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="clg_cgpa"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        CGPA
                                    </label>
                                    <input
                                        type="text"
                                        name="clg_cgpa"
                                        id="clg_cgpa"
                                        autoComplete="clg_cgpa"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={edu[idx]["clg_cgpa"]}
                                        placeholder="e.g, 8.02/10.0"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="clg_start_date"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Start Date
                                    </label>
                                    <input
                                        type="text"
                                        name="clg_start_date"
                                        value={edu[idx]["clg_start_date"]}
                                        id="clg_start_date"
                                        autoComplete="clg_start_date"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="e.g, Sep. 2021"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="clg_end_date"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        End Date
                                    </label>
                                    <input
                                        type="text"
                                        name="clg_end_date"
                                        id="clg_end_date"
                                        autoComplete="clg_end_date"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={edu[idx]["clg_end_date"]}
                                        placeholder="e.g, Jul. 2025"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                onClick={() => handleDeleteSchool(idx)}
                            >
                                Delete College
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
