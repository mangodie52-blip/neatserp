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

                        <thead>

                            <tr className="bg-gray-100 border-b">


                                <th className="w-1/4 p-3 text-left">
                                    No MR
                                </th>


                                <th className="w-1/4 p-3 text-center">
                                    Tanggal
                                </th>


                                <th className="w-1/4 p-3 text-center">
                                    Status
                                </th>


                                <th className="w-1/4 p-3 text-center">
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
                                        {mr.tanggal}
                                    </td>


                                    <td className="p-3 text-center">
                                        {mr.status}
                                    </td>


                                    <td className="p-3 text-center">

                                        <Link
                                            href={route(
                                                'material-requests.show',
                                                mr.id
                                            )}

                                            className="hover:bg-blue-600 text-black px-3 py-1 rounded"
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

