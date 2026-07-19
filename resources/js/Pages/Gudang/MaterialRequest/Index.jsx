import { Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";




export default function Index({ requests }) {
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

                                        {mr.status === "Approved" ? (

                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                ✅ Approved
                                            </span>

                                        ) : (

                                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                ⏳ Waiting Approval
                                            </span>

                                        )}

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

        </AppLayout>

    );
}

