import DataTable from '@/Components/DataTable';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { router } from '@inertiajs/react';

export default function ProductionTable({ orders, onEdit }) {

    const sendToGudang = (order) => {

        if (!confirm(`Kirim ${order.nomor_spk} ke Gudang?`)) return;

        console.log('SEND TO GUDANG =>', order);

        router.post(route('material-requests.store'), {
            production_order_id: order.id,
            product_id: order.product_id,
            qty_produksi: order.qty,
            boms: order.product?.boms?.map(bom => ({
                material_id: bom.material_id,
                qty_request: bom.kebutuhan * order.qty,
                satuan: bom.satuan,
            })) || [],
        });
    };

    return (
        <DataTable>
            <thead className="bg-slate-100">
                <tr>
                    <th className="px-4 py-3 text-center w-40">No SPK</th>
                    <th className="px-4 py-3 text-center w-56">Product</th>
                    <th className="px-4 py-3 text-center w-24">Qty</th>
                    <th className="px-4 py-3 text-center w-40">Tanggal</th>
                    <th className="px-4 py-3 text-center w-32">Status</th>
                    <th className="px-4 py-3 text-center w-[220px]">Aksi</th>
                </tr>
            </thead>

            <tbody>
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <tr
                            key={order.id}
                            className="border-b hover:bg-slate-50 transition"
                        >
                            <td className="px-4 py-3 text-center font-semibold">
                                {order.nomor_spk}
                            </td>

                            <td className="px-4 py-3 text-center">
                                {order.product?.nama ?? '-'}
                            </td>

                            <td className="px-4 py-3 text-center font-semibold">
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


                            {/* SEND TO GUDANG */}


                            <td className="px-3 py-2">
                                <div className="flex justify-center flex-wrap gap-2">

                                    <button
                                        onClick={() => sendToGudang(order)}
                                        className="bg-white-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg text-sm font-semibold"
                                    >
                                        📦 Send To Gudang
                                    </button>



                                    {/* EDIT */}
                                    <SecondaryButton onClick={() => onEdit(order)}>
                                        Edit
                                    </SecondaryButton>

                                    {/* HAPUS */}
                                    <DangerButton
                                        onClick={() => {
                                            if (confirm('Hapus SPK ini?')) {
                                                router.delete(`/production-orders/${order.id}`);
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