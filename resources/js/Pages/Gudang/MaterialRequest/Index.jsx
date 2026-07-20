import { Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { useState } from 'react';





export default function Index({ requests }) {

    const [selectedMr, setSelectedMr] = useState(null);

    const openStatusDetail = (mr) => {
        setSelectedMr(mr);
    };

    const closeStatusDetail = () => {
        setSelectedMr(null);
    };
    return (



        <AppLayout>

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-5">
                    Material Request
                </h1>


                <div className="bg-white shadow rounded">


                    <table className="w-full table-fixed border-collapse">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="border p-3 text-left">
                                    No MR
                                </th>

                                <th className="border p-3 text-center">
                                    Tanggal Kirim
                                </th>

                                <th className="border p-3 text-center">
                                    Jam Kirim
                                </th>

                                <th className="border p-3 text-center">
                                    Status
                                </th>

                                <th className="border p-3 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {requests.map((mr) => (

                                <tr
                                    key={mr.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3 text-left">
                                        {mr.nomor_mr}
                                    </td>

                                    <td className="p-3 text-center">
                                        {new Date(mr.created_at).toLocaleDateString("id-ID")}
                                    </td>

                                    <td className="p-3 text-center">
                                        {new Date(mr.created_at).toLocaleTimeString("id-ID", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>

                                    <td className="p-3 text-center">

                                        <td className="p-3 text-center">

                                            {mr.status === 'Waiting Approval' && (
                                                <td className="py-4 px-6 align-middle text-center">
                                                    <div className="w-full flex items-center justify-center translate-x-10">

                                                        <button
                                                            onClick={() => openStatusDetail(mr)}
                                                            className="min-w-[150px] inline-flex items-center justify-center bg-white-100 text-black-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-200 transition cursor-pointer"
                                                        >
                                                            ⏳ Waiting Approval
                                                        </button>
                                                    </div>
                                                </td>

                                            )}

                                            {mr.status === 'Pending' && (

                                                <td className="py-4 px-6 align-middle text-center">
                                                    <div className="w-full flex items-center justify-center translate-x-10">

                                                        <button
                                                            onClick={() => openStatusDetail(mr)}
                                                            className="min-w-[150px] inline-flex items-center justify-center bg-white-100 text-orange-700 px-2 py-2 rounded-full text-sm font-semibold hover:bg-orange-200 transition cursor-pointer"
                                                        >
                                                            ⚠️ Pending
                                                        </button>

                                                    </div>
                                                </td>
                                            )}

                                            {mr.status === 'Approved' && (

                                                <td className="py-4 px-6 align-middle text-center">
                                                    <div className="w-full flex items-center justify-center translate-x-10">

                                                        <button
                                                            onClick={() => openStatusDetail(mr)}
                                                            className="min-w-[150px] inline-flex items-center justify-center bg-white-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200 transition cursor-pointer"
                                                        >
                                                            ⚙️ Proses
                                                        </button>

                                                    </div>
                                                </td>
                                            )}

                                            {mr.status === 'Rejected' && (

                                                <button
                                                    onClick={() => openStatusDetail(mr)}
                                                    className="min-w-[150px] inline-flex items-center justify-center bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-200 transition cursor-pointer"
                                                >
                                                    ❌ Reject
                                                </button>
                                            )}

                                        </td>

                                    </td>

                                    <td className="p-3 text-center">

                                        <Link
                                            href={route(
                                                "material-requests.show",
                                                mr.id
                                            )}
                                            className="bg-white-500  hover:bg-blue-700 text-black px-5 py-2 rounded"
                                        >
                                            Detail
                                        </Link>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>


                </div>


            </div>
            {selectedMr && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">

                        <div className="flex justify-between items-center mb-4">

                            <h2 className="text-lg font-bold text-gray-800">
                                Detail Status MR
                            </h2>

                            <button
                                onClick={closeStatusDetail}
                                className="text-gray-400 hover:text-red-500 text-xl"
                            >
                                ✕
                            </button>

                        </div>

                        {/* Waiting */}
                        {selectedMr.status === 'Waiting Approval' && (
                            <>
                                <div className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg font-semibold mb-4">
                                    ⏳ Waiting Approval
                                </div>

                                <p className="text-sm text-gray-700 mb-4">
                                    Material Request masih menunggu approval dari bagian gudang.
                                </p>
                            </>
                        )}

                        {/* Pending */}
                        {selectedMr.status === 'Pending' && (
                            <>
                                <div className="bg-orange-100 text-orange-700 px-3 py-2 rounded-lg font-semibold mb-4">
                                    ⚠️ Pending
                                </div>

                                <p className="text-sm text-gray-700 mb-4">
                                    MR belum ditindaklanjuti oleh bagian gudang dalam batas waktu yang ditentukan.
                                </p>
                            </>
                        )}

                        {/* Proses */}
                        {selectedMr.status === 'Approved' && (
                            <>
                                <div className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-semibold mb-4">
                                    ⚙️ Proses
                                </div>

                                <p className="text-sm text-gray-700 mb-4">
                                    Material Request sudah disetujui dan sedang diproses oleh gudang.
                                </p>
                            </>
                        )}

                        {/* Reject */}
                        {selectedMr.status === 'Rejected' && (
                            <>
                                <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg font-semibold mb-4">
                                    ❌ Reject
                                </div>

                                <p className="text-sm text-gray-700 mb-4">
                                    {selectedMr.reject_reason || 'Tidak ada alasan penolakan.'}
                                </p>
                            </>
                        )}

                        <div className="border-t pt-4 space-y-2 text-sm">

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">No MR</span>
                                <span className="font-semibold">{selectedMr.nomor_mr}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Dibuat</span>
                                <span>
                                    {new Date(selectedMr.created_at).toLocaleString('id-ID')}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Sekarang</span>
                                <span>
                                    {new Date().toLocaleString('id-ID')}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>
            )}

        </AppLayout>

    );
}

