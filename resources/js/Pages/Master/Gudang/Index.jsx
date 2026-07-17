import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";

export default function Index() {

    const { mrs } = usePage().props;

    return (
        <AppLayout>

            <div className="p-6">

                <h1 className="text-2xl font-bold mb-6">
                    Gudang
                </h1>

                <div className="bg-white rounded-lg shadow">

                    <table className="w-full border-collapse">

                        <thead className="bg-slate-800 text-white">

                            <tr>

                                <th className="p-3 border">No MR</th>

                                <th className="p-3 border">SPK</th>

                                <th className="p-3 border">Product</th>

                                <th className="p-3 border">Status</th>

                                <th className="p-3 border">Aksi</th>

                            </tr>

                        </thead>

                        <tbody>

                            {mrs.length > 0 ? (

                                mrs.map((mr) => (

                                    <tr key={mr.id}>

                                        <td className="border p-3">
                                            {mr.nomor_mr}
                                        </td>

                                        <td className="border p-3">
                                            {mr.production_order?.nomor_spk}
                                        </td>

                                        <td className="border p-3">
                                            {mr.production_order?.product?.nama}
                                        </td>

                                        <td className="border p-3 text-center">
                                            {mr.status}
                                        </td>

                                        <td className="border p-3 text-center">

                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">

                                                Detail

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        Belum ada Material Request
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </AppLayout>
    );
}