import { Link, usePage } from "@inertiajs/react";
import { FaBell, FaSearch, FaBars } from "react-icons/fa";

export default function Navbar() {

    const { auth } = usePage().props;

    return (

        <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">

            {/* Kiri */}
            <div className="flex items-center gap-4">

                <FaBars
                    className="text-2xl text-gray-600 cursor-pointer"
                />

               

                <div>

                    <h1 className="text-xl font-bold text-blue-700 tracking-wide">
                        NEATS ERP
                    </h1>

                    <p className="text-xs text-gray-500">
                        Smart Bag Manufacturing System
                    </p>

                </div>

            </div>

            {/* Tengah */}
            <div className="w-96">

                <div className="relative">

                    <FaSearch
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Cari Produk, Order, Supplier..."
                        className="w-full border rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

            </div>

            {/* Kanan */}
            <div className="flex items-center gap-5">

                <button className="relative">

                    <FaBell className="text-2xl text-gray-600"/>

                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        3
                    </span>

                </button>

                <div className="flex items-center gap-3">

                    <img
                        src={
                            auth.user.photo
                                ? `/storage/${auth.user.photo}`
                                : "/images/logoneats.webp"
                        }
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                        alt="User"
                    />

                    <div>

                        <h3 className="font-semibold">
                            {auth.user.name}
                        </h3>

                        <small className="text-gray-500">
                            Administrator
                        </small>

                    </div>

                </div>

                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                    Logout
                </Link>

            </div>

        </nav>

    );

}