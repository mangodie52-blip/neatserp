import { Link } from '@inertiajs/react';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-slate-800 text-white min-h-screen">
            <div className="p-5 text-center border-b border-slate-700">
                <img
                    src="/images/Neatslogo.png"
                    className="w-16 mx-auto"
                    alt="NEATS ERP"
                />

                <h2 className="mt-3 text-xl font-bold">
                    NEATS ERP
                </h2>
            </div>

            <nav className="mt-5">

                <Link
                    href="/dashboard"
                    className="block px-5 py-3 hover:bg-slate-700"
                >
                    🏠 Dashboard
                </Link>

                <Link
                    href="/material"
                    active={route().current("material")}
                >
                    📦 Material
                </Link>

                <Link
                    href="/customer"
                    className="block px-5 py-3 hover:bg-slate-700"
                >
                    👥 Customer
                </Link>

                <Link
                    href="/produk"
                    className="block px-5 py-3 hover:bg-slate-700"
                >
                    📦 Produk
                </Link>

                <Link
                    href="/produksi"
                    className="block px-5 py-3 hover:bg-slate-700"
                >
                    🏭 Produksi
                </Link>

                <Link
                    href="/gudang"
                    className="block px-5 py-3 hover:bg-slate-700"
                >
                    📦 Gudang
                </Link>

                <Link
                    href="/laporan"
                    className="block px-5 py-3 hover:bg-slate-700"
                >
                    📊 Laporan
                </Link>

                <Link
                    href="/setting"
                    className="block px-5 py-3 hover:bg-slate-700"
                >
                    ⚙ Setting
                </Link>


            </nav>

        </aside>
    );
}