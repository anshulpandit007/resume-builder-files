import React from "react";

export default function Achievement({ achievements, setAchievements, idx }) {
    const handleOnChange = (e) => {
        const list = [...achievements];
        list[idx][e.target.name] = e.target.value;
        setAchievements(list);
    };

    const deleteThisAch = () => {
        const list = [...achievements];
        list.splice(idx, 1);
        setAchievements(list);
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
                                        htmlFor="ach_text"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Achievement
                                    </label>
                                    <p className="text-xs text-gray-500">
                                        (This will result in a bullet point.)
                                    </p>
                                    <div
                                        className="mt-1 flex flex-row"
                                        key={idx}
                                    >
                                        <textarea
                                            required
                                            id="ach_text"
                                            name="ach_text"
                                            rows={1}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="e.g, Secured a Global Rank of 101 in Google Kickstart 2022 Round A."
                                            value={
                                                achievements[idx]["ach_text"]
                                            }
                                            onChange={(e) => handleOnChange(e)}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-6">
                                    <label
                                        htmlFor="ach_link"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Achievement Link (if any)
                                    </label>
                                    <input
                                        type="text"
                                        name="ach_link"
                                        autoComplete="ach_link"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={achievements[idx]["ach_link"]}
                                        placeholder="e.g, https://www.kickstart.com/round-a/ranklist"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                onClick={() => deleteThisAch(idx)}
                            >
                                Delete Achievement
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
