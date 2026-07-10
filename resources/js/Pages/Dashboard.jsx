import AppLayout from "@/Layouts/AppLayout";
import ProductionChart from "@/Components/Charts/ProductionChart";
import FlowChart from "@/Components/Charts/FlowChart";
import { router } from "@inertiajs/react";
import RealtimeStatus from "@/Components/RealtimeStatus";

export default function Dashboard({ user }) {
    return (
        <AppLayout>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-6 text-white">

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                    

                        <div>

                            <h1 className="text-3xl font-bold">
                                Selamat Datang, {user.name}
                            </h1>

                            <p className="opacity-90">
                                {user.role}
                            </p>

                            <p className="text-sm opacity-80">
                                Smart Bag Manufacturing ERP
                            </p>

                        </div>

                    </div>

                    <div className="text-right">

                        <h2 className="text-2xl font-bold">
                            NEATS ERP
                        </h2>

                        <p className="text-sm">
                            Dashboard Administrator
                        </p>

                        <p className="text-sm mt-2">
                            {new Date().toLocaleDateString("id-ID")}
                        </p>

                    </div>

                </div>

            </div>


            {/* Card Statistik */}
            <div className="grid grid-cols-12 gap-6 mt-2">

                <div className="col-span-8">
                    <ProductionChart />
                </div>

                <div className="col-span-4">
                    <FlowChart />
                </div>

            </div>


            <div className="grid grid-cols-4 gap-6 mt-6">

                <div className="bg-blue-500 text-white rounded-xl p-5 shadow">
                    <h3>Total Produksi</h3>
                    <p className="text-3xl font-bold mt-2">2.540</p>
                </div>

                <div className="bg-green-500 text-white rounded-xl p-5 shadow">
                    <h3>Barang Masuk</h3>
                    <p className="text-3xl font-bold mt-2">820</p>
                </div>

                <div className="bg-yellow-500 text-white rounded-xl p-5 shadow">
                    <h3>Barang Keluar</h3>
                    <p className="text-3xl font-bold mt-2">780</p>
                </div>

                <div className="bg-red-500 text-white rounded-xl p-5 shadow">
                    <h3>Reject</h3>
                    <p className="text-3xl font-bold mt-2">18</p>
                </div>

            </div>
            {/* Bagian bawah */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                {/* Aktivitas */}
                <div className="bg-white rounded-xl shadow-md p-5">
                    <h3 className="text-xl font-bold mb-4">
                        Aktivitas Hari Ini
                    </h3>

                    <table className="table-auto w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">Jam</th>
                                <th className="text-left py-2">Aktivitas</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b">
                                <td>08:00</td>
                                <td>Produksi dimulai</td>
                            </tr>

                            <tr className="border-b">
                                <td>09:30</td>
                                <td>Barang Masuk</td>
                            </tr>

                            <tr className="border-b">
                                <td>10:45</td>
                                <td>QC Selesai</td>
                            </tr>

                            <tr>
                                <td>13:15</td>
                                <td>Purchasing membuat PO</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>

                {/* Stok */}
                <div className="bg-white rounded-xl shadow-md p-5">
                    <h3 className="text-xl font-bold mb-4">
                        Stok Hampir Habis
                    </h3>

                    <ul className="space-y-3">
                        <li className="flex justify-between">
                            <span>Kulit Sintetis</span>
                            <span className="text-red-600 font-bold">
                                20 pcs
                            </span>
                        </li>

                        <li className="flex justify-between">
                            <span>Benang</span>
                            <span className="text-red-600 font-bold">
                                12 Roll
                            </span>
                        </li>

                        <li className="flex justify-between">
                            <span>Resleting</span>
                            <span className="text-red-600 font-bold">
                                35 pcs
                            </span>
                        </li>
                    </ul>
                    <RealtimeStatus />
                </div>

            </div>


        </AppLayout>
    );
}