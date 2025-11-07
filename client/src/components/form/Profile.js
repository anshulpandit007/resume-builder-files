import React from "react";

export default function Profile({ profiles, setProfiles, idx }) {
    const handleOnChange = (e) => {
        const list = [...profiles];
        list[idx][e.target.name] = e.target.value;
        setProfiles(list);
    };

    const deleteThisProfile = () => {
        const list = [...profiles];
        list.splice(idx, 1);
        setProfiles(list);
    };

    return (
        <div className="mt-10 sm:mt-0">
            <div className="mt-10 mx-auto w-8/12 md:w-9/12 max-sm:w-full max-sm:p-2 max-sm:pt-0   ">
                <div className="mt-5 md:col-span-2 md:mt-0">
                    <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="profile_about"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Profile
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="profile_about"
                                        value={profiles[idx]["profile_about"]}
                                        id="profile_about"
                                        autoComplete="profile_about"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="e.g, StackOverflow"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="profile_link"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Profile Link
                                    </label>
                                    <input
                                        type="text"
                                        name="profile_link"
                                        id="profile_link"
                                        autoComplete="profile_link"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={profiles[idx]["profile_link"]}
                                        placeholder="e.g, https://www.stackoverflow.com/user"
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                onClick={() => deleteThisProfile(idx)}
                            >
                                Delete Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
