import React from "react";

export default function Skill({ skills, setSkills, idx }) {
    const handleOnChange = (e) => {
        const list = [...skills];
        list[idx][e.target.name] = e.target.value;
        setSkills(list);
    };

    const deleteThisSkill = () => {
        const list = [...skills];
        list.splice(idx, 1);
        setSkills(list);
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
                                        htmlFor="skill_title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Skills Title
                                    </label>
                                    <input
                                        type="text"
                                        name="skill_title"
                                        autoComplete="skill_title"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={skills[idx]["skill_title"]}
                                        placeholder="e.g, Languages"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label
                                        htmlFor="skill_text"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Skills
                                    </label>
                                    <div
                                        className="mt-1 flex flex-row"
                                        key={idx}
                                    >
                                        <textarea
                                            required
                                            id="skill_text"
                                            name="skill_text"
                                            rows={1}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="e.g, C, C++, Java, Python, Javascript"
                                            value={skills[idx]["skill_text"]}
                                            onChange={(e) => handleOnChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                onClick={() => deleteThisSkill(idx)}
                            >
                                Delete Skill
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
