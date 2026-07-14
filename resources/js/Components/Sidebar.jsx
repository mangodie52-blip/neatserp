import { Link } from '@inertiajs/react';


export default function Sidebar() {
    return (
        <aside className="w-64 bg-slate-800 text-white min-h-screen">
            <div className="p-5 text-center border-b border-slate-700">
                <img
                    src="/images/neatslogos.webp"
                    alt="NEATS ERP"
                    className="mx-auto"
                    style={{ width: "80px", height: "80px" }}
                />

                <h2 className="mt-3 text-xl font-bold">
                    NEATS ERP
                </h2>
            </div>

            <nav className="mt-5">

                <nav className="mt-5">

                    <Link href="/dashboard" className="block px-5 py-3 hover:bg-slate-700">
                        🏠 Dashboard
                    </Link>

                    <Link href="/products" className="block px-5 py-3 hover:bg-slate-700">
                        👜 Master Products
                    </Link>

                    <Link href="/bom" className="block px-5 py-3 hover:bg-slate-700">
                        📋 Master BOM
                    </Link>

                    <Link href="/material" className="block px-5 py-3 hover:bg-slate-700">
                        📦 Master Material
                    </Link>

                    <Link href="/produksi" className="block px-5 py-3 hover:bg-slate-700">
                        🏭 Produksi
                    </Link>

                </nav>





            </nav>

        </aside>
    );

}