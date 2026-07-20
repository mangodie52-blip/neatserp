import AppLayout from '@/Layouts/AppLayout';
import { router, usePage, Link } from '@inertiajs/react';

export default function Show() {

    const { materialRequest } = usePage().props;

    return (

        <AppLayout>

            <div className="p-6">

                <div className="flex items-center gap-3 mb-6">

                    <Link
                        href={route('material-requests.index')}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        ← Kembali
                    </Link>

                    <h1 className="text-2xl font-bold text-gray-800">
                        Detail Material Request
                    </h1>

                </div>
                {/* HEADER INFO */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

                    <div className="grid grid-cols-2 gap-6 text-sm">

                        <div>
                            <p className="text-gray-500">No MR</p>
                            <p className="font-semibold text-lg">
                                {materialRequest.nomor_mr}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Status</p>
                            <p className="font-semibold">
                                {materialRequest.status}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Tanggal Kirim</p>
                            <p className="font-semibold">
                                {new Date(materialRequest.tanggal).toLocaleDateString('id-ID')}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Jam Kirim</p>
                            <p className="font-semibold">
                                {new Date(materialRequest.created_at).toLocaleTimeString('id-ID', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>

                    </div>

                </div>

                {/* DETAIL MATERIAL */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div className="p-5 border-b">
                        <h2 className="text-lg font-bold text-gray-800">
                            Detail Material
                        </h2>
                    </div>

                    <table className="w-full text-sm">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="py-3 px-5 text-left font-semibold">
                                    Material
                                </th>

                                <th className="py-3 px-5 text-center font-semibold">
                                    Qty
                                </th>

                                <th className="py-3 px-5 text-center font-semibold">
                                    Satuan
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {materialRequest.details?.map((item) => (

                                <tr key={item.id}>

                                    <td className="py-3 px-5">
                                        {item.material?.nama}
                                    </td>

                                    <td className="py-3 px-5 text-center font-semibold">
                                        {item.qty_request}
                                    </td>

                                    <td className="py-3 px-5 text-center">
                                        {item.satuan}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                                {/* ACTION */}
                <div className="flex justify-end gap-3 mt-6 border-t pt-5">

                    {/* Hanya tampil saat Pending / Waiting Approval */}
                    {(materialRequest.status === 'Pending' ||
                      materialRequest.status === 'Waiting Approval') && (
                        <>

                            {/* APPROVE */}
                            <button
                                onClick={() =>
                                    router.post(
                                        route('material-requests.approve', materialRequest.id)
                                    )
                                }
                                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold shadow-md transition"
                            >
                                ✓ Approve
                            </button>

                            {/* DELETE / CANCEL */}
                            <button
                                onClick={() => {
                                    if (confirm('Yakin ingin membatalkan Material Request ini?')) {
                                        router.post(
                                            route('material-requests.cancel', materialRequest.id)
                                        );
                                    }
                                }}
                                className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold shadow-md transition"
                            >
                                🗑 Delete
                            </button>

                        </>
                    )}

                    {/* Kalau sudah Approved */}
                    {materialRequest.status === 'Approved' && (
                        <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-semibold">
                            ⚙️ Sedang Diproses Gudang
                        </div>
                    )}

                    {/* Kalau sudah Rejected */}
                    {materialRequest.status === 'Rejected' && (
                        <div className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-semibold">
                            ❌ Material Request Ditolak
                        </div>
                    )}

                    {/* Kalau sudah Cancelled */}
                    {materialRequest.status === 'Cancelled' && (
                        <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold">
                            🗑 Material Request Dibatalkan
                        </div>
                    )}

                </div>

            </div>

        </AppLayout>
    );
}