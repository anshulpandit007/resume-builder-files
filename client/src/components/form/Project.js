import React from "react";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

export default function Project({ projects, setProjects, idx }) {
    const handleOnChange = (e) => {
        const list = [...projects];
        list[idx][e.target.name] = e.target.value;
        setProjects(list);
    };

    const handleThisDescChange = (e, i) => {
        const list = [...projects];
        list[idx]["project_desc"][i] = e.target.value;
        setProjects(list);
    };

    const deleteThisDesc = (i) => {
        const list = [...projects];
        list[idx]["project_desc"].splice(i, 1);
        setProjects(list);
    };

    const handleAddDesc = () => {
        const list = [...projects];
        list[idx]["project_desc"] = [...list[idx]["project_desc"], ""];
        setProjects(list);
    };

    const handleDeleteProject = () => {
        const list = [...projects];
        list.splice(idx, 1);
        setProjects(list);
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
                                        htmlFor="project_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Project Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="project_name"
                                        autoComplete="project_name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={projects[idx]["project_name"]}
                                        placeholder="e.g, Resume Builder"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="project_link"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Project Link
                                    </label>
                                    <input
                                        type="text"
                                        name="project_link"
                                        value={projects[idx]["project_link"]}
                                        id="project_link"
                                        autoComplete="project_link"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="e.g, https://www.projectlink.com"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="project_github"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Github Link
                                    </label>
                                    <input
                                        type="text"
                                        name="project_github"
                                        id="project_github"
                                        autoComplete="project_github"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={projects[idx]["project_github"]}
                                        placeholder="e.g, https://www.github.com/user/repo"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label
                                        htmlFor="project_desc"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Project Description
                                    </label>
                                    <p className="text-xs text-gray-500">
                                        (Description will result in bullet
                                        points, so, try adding at least two
                                        descriptions per project.)
                                    </p>
                                    {projects[idx]["project_desc"].map(
                                        (e, i) => {
                                            return (
                                                <div
                                                    className="mt-1 flex flex-row"
                                                    key={idx}
                                                >
                                                    <textarea
                                                        id="project_desc"
                                                        name="project_desc"
                                                        rows={1}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="e.g, Improved the redering time of dashboard by 20%."
                                                        value={
                                                            projects[idx][
                                                                "project_desc"
                                                            ][i]
                                                        }
                                                        onChange={(e) =>
                                                            handleThisDescChange(
                                                                e,
                                                                i
                                                            )
                                                        }
                                                    />
                                                    {projects[idx][
                                                        "project_desc"
                                                    ].length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteThisDesc(
                                                                    i
                                                                )
                                                            }
                                                        >
                                                            <MinusCircleIcon className="text-gray-600 w-9 leading-normal ml-2 hover:text-gray-800" />
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        }
                                    )}

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
                                onClick={() => handleDeleteProject(idx)}
                            >
                                Delete Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
