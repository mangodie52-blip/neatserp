import DataTable from "@/Components/DataTable";
import Badge from "@/Components/Badge";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { router } from "@inertiajs/react";


export default function ProductionTable({
    orders,
    onEdit,
}) {

    return (

        <DataTable>

            <thead className="bg-slate-100">

                <tr>

                    <th className="px-4 py-3 text-center w-40">
                        No SPK
                    </th>

                    <th className="px-4 py-3 text-center w-40">
                        Product
                    </th>

                    <th className="px-4 py-3 text-center w-24">
                        Qty
                    </th>

                    <th className="px-4 py-3 text-center w-40">
                        Tanggal
                    </th>

                    <th className="px-4 py-3 text-center w-32">
                        Status
                    </th>

                    <th className="px-4 py-3 text-center w-72">
                        Aksi
                    </th>
                    

                </tr>

            </thead>

            <tbody>

                {orders && orders.length > 0 ? (

                    orders.map((order) => (

                        <tr
                            key={order.id}
                            className="border-b hover:bg-slate-50 transition"
                        >

                            <td className="px-4 py-3 text-center">
                                {order.nomor_spk}
                            </td>

                            <td className="px-4 py-3 text-center">
                                {order.product?.nama ?? '-'}
                            </td>

                            <td className="px-4 py-3 text-center">
                                {order.qty}
                            </td>

                            <td className="px-4 py-3 text-center">
                                {order.tanggal}
                            </td>

                            <td className="px-4 py-3 text-center">

                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                                    {order.status}
                                </span>

                            </td>

                            <td className="px-3 py-1">

                                <div className="flex justify-center gap-2">

                                    <SecondaryButton
                                        onClick={() => onEdit(order)}
                                    >
                                        Edit
                                    </SecondaryButton>


                                    <DangerButton
                                        onClick={() => {

                                            if (confirm("Hapus SPK ini?")) {
                                                router.delete(
                                                    `/production-orders/${order.id}`
                                                );
                                            }

                                        }}
                                    >
                                        Hapus
                                    </DangerButton>


                                </div>

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td
                            colSpan="6"
                            className="text-center py-8 text-gray-500"
                        >
                            Belum ada SPK Produksi

                        </td>

                    </tr>

                )}

            </tbody>

        </DataTable>

    );

}