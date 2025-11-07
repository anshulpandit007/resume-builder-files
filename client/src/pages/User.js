import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function User() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) return navigate("/login");
    }, [user, navigate]);

    return (
        <>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-20 md:mx-48 lg:mx-96">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Your Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Your Personal details.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {user.name}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {user.email}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    );
}
