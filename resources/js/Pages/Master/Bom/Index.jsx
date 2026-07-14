import { usePage, router } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";

export default function Index() {
    const { boms, products, materials } = usePage().props;

    const [showModal, setShowModal] = useState(false);

    const [data, setData] = useState({
        product_id: "",
        material_id: "",
        qty_per_pcs: "",
        waste: "",
    });

    const submit = (e) => {
        e.preventDefault();

        console.log("Submit jalan");
        console.log(data);

        router.post(route("bom.store"), data, {
            onSuccess: () => {
                setShowModal(false);

                setData({
                    product_id: "",
                    material_id: "",
                    qty_per_pcs: "",
                    waste: "",
                });
            },
        });
    };

    return (
        <AppLayout>
            <div className="p-6">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">
                        Master BOM
                    </h1>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        + Tambah BOM
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead className="bg-gray-100">

                            <tr>
                                <th className="px-4 py-3 border">No</th>
                                <th className="px-4 py-3 border">Product</th>
                                <th className="px-4 py-3 border">Material</th>
                                <th className="px-4 py-3 border">Qty / PCS</th>
                                <th className="px-4 py-3 border">Waste (%)</th>
                                <th className="px-4 py-3 border">Aksi</th>
                            </tr>

                        </thead>

                        <tbody>

                            {boms.length > 0 ? (

                                boms.map((bom, index) => (

                                    <tr key={bom.id} className="text-center">

                                        <td className="border px-4 py-2">
                                            {index + 1}
                                        </td>

                                        <td className="border px-4 py-2">
                                            {bom.product?.nama}
                                        </td>

                                        <td className="border px-4 py-2">
                                            {bom.material?.nama}
                                        </td>

                                        <td className="border px-4 py-2">
                                            {bom.qty_per_pcs}
                                        </td>

                                        <td className="border px-4 py-2">
                                            {bom.waste} %
                                        </td>

                                        <td className="border px-4 py-2 flex justify-center gap-2">

                                            <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                                                Edit
                                            </button>

                                            <button className="bg-red-600 text-white px-3 py-1 rounded">
                                                Hapus
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-5 text-gray-500"
                                    >
                                        Belum ada data BOM
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

                    <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">

                        <h2 className="text-2xl font-bold mb-5">
                            Tambah BOM
                        </h2>

                        <form onSubmit={submit}>

                            {/* Product */}

                            <label className="font-semibold">
                                Product
                            </label>

                            <select
                                value={data.product_id}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        product_id: e.target.value,
                                    })
                                }
                                className="w-full border rounded p-2 mb-4"
                            >
                                <option value="">Pilih Product</option>

                                {products.map((product) => (

                                    <option
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {product.nama}
                                    </option>

                                ))}

                            </select>

                            {/* Material */}

                            <label className="font-semibold">
                                Material
                            </label>

                            <select
                                value={data.material_id}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        material_id: e.target.value,
                                    })
                                }
                                className="w-full border rounded p-2 mb-4"
                            >
                                <option value="">Pilih Material</option>

                                {materials.map((material) => (

                                    <option
                                        key={material.id}
                                        value={material.id}
                                    >
                                        {material.nama}
                                    </option>

                                ))}

                            </select>

                            {/* Qty */}

                            <label className="font-semibold">
                                Qty / PCS
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={data.qty_per_pcs}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        qty_per_pcs: e.target.value,
                                    })
                                }
                                className="w-full border rounded p-2 mb-4"
                            />

                            {/* Waste */}

                            <label className="font-semibold">
                                Waste (%)
                            </label>

                            <input
                                type="number"
                                value={data.waste}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        waste: e.target.value,
                                    })
                                }
                                className="w-full border rounded p-2 mb-5"
                            />

                            <div className="flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Batal
                                </button>

                                <button type="submit">
                                    Simpan
                                </button>
                            </div>

                        </form>

                    </div>

                </div>
            )}
        </AppLayout>
    );
}