import { Link } from "@inertiajs/react";

export default function Sidebar() {

    const path = window.location.pathname;

    const menuClass = (url) =>
        `block px-5 py-2 transition ${path.startsWith(url)
            ? "bg-blue-600 text-white"
            : "hover:bg-slate-700"
        }`;

    return (

        <aside className="w-64 bg-slate-800 text-white min-h-screen">

            <div className="p-5 text-center border-b border-slate-700">

                <img
                    src="/images/neatslogos.webp"
                    alt="NEATS ERP"
                    className="mx-auto w-20 h-20"
                />

                <h2 className="mt-3 text-xl font-bold">
                    NEATS ERP
                </h2>

            </div>

            <nav className="mt-5">

                {/* Dashboard */}

                <Link
                    href="/dashboard"
                    className={menuClass("/dashboard")}
                >
                    🏠 Dashboard
                </Link>

                {/* MASTER */}

                <div className="mt-5 border-t border-slate-700 pt-3 px-5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-blue-300">
                        Master
                    </h3>
                </div>

                <Link
                    href="/material"
                    className={menuClass("/material")}
                >
                    📦 Material
                </Link>

                <Link
                    href="/products"
                    className={menuClass("/products")}
                >
                    👜 Product
                </Link>

                <Link
                    href="/boms"
                    className={menuClass("/boms")}
                >
                    📋 BOM
                </Link>

                {/* PRODUKSI */}

                <div className="mt-5 border-t border-slate-700 pt-3 px-5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-blue-300">
                        Produksi
                    </h3>
                </div>


                <Link
                    href="/production-orders"
                    className={menuClass("/production-orders")}
                >
                    🏭 SPK Produksi
                </Link>

                <Link
                    href={route('production-progresses.index')}
                    className="block px-4 py-2 rounded hover:bg-slate-700"
                >
                    📈 Progress Produksi
                </Link>

                {/* GUDANG */}

                <div className="mt-5 border-t border-slate-700 pt-3 px-5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-blue-300">
                        Gudang
                    </h3>
                </div>

                <Link href={route('material-requests.index')}
                    className={menuClass("/material-requests")}
                >
                    📦 Material Request
                </Link>

                {/* QC */}


            </nav>

        </aside>

    );
}