import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


export default function Detail({ mr }) {
    return (

        <AppLayout>

            <div className="p-6">


                <h1 className="text-2xl font-bold mb-5">
                    Material Request
                </h1>


                <div className="bg-white p-5 rounded shadow">


                    <div className="mb-5">

                        <p>
                            No MR : <b>{mr.nomor_mr}</b>
                        </p>


                        <p>
                            Tanggal : {mr.tanggal}
                        </p>

                    </div>



                    <table className="w-full border">


                        <thead>

                            <tr className="bg-gray-100">

                                <th className="w-1/4 p-3 border text-left">
                                    Material
                                </th>

                                <th className="w-1/4 p-3 border text-center">
                                    Request
                                </th>

                                <th className="w-1/4 p-3 border text-center">
                                    Stock
                                </th>

                                <th className="w-1/4 p-3 border text-center">
                                    Approved
                                </th>

                            </tr>

                        </thead>


                        <tbody>


                            {mr.details.map((item) => (


                                <tr key={item.id}>


                                    <td className="p-3 border">

                                        {item.material.nama}

                                    </td>


                                    <td className="border text-center">

                                       {Number(item.qty_request).toLocaleString()}

                                    </td>


                                    <td className="border text-center">

                                        {item.material.stok}

                                    </td>


                                    <td className="border text-center">

                                       {Number(item.qty_approved ?? 0).toLocaleString()}

                                    </td>


                                </tr>


                            ))}


                        </tbody>


                    </table>



                    <div className="mt-5">


                        <label>
                            Catatan :
                        </label>


                        <textarea
                            className="w-full border rounded mt-2"
                            rows="3"
                        />


                    </div>



                    <div className="mt-5 flex gap-3">


                        <button

                            onClick={() =>

                                router.post(
                                    route(
                                        'material-requests.approve',
                                        mr.id
                                    )

                                )

                            }

                            className="bg-green-600 text-white px-5 py-2 rounded"

                        >

                            Approve

                        </button>


                        <button
                            className="bg-red-600 text-white px-5 py-2 rounded"
                        >

                            Reject

                        </button>


                        <Link
                            href={route('material-requests.index')}
                            className="bg-gray-500 text-white px-5 py-2 rounded"
                        >

                            Close

                        </Link>


                    </div>


                </div>


            </div>
        </AppLayout>

    );
}
