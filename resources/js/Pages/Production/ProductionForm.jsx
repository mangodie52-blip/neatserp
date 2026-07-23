import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export default function ProductionForm({
    show,
    products,
    order,
    onClose
}) {

    const [data, setData] = useState({
        nomor_spk: "",
        product_id: "",
        qty: "",
        tanggal: "",
        status: "Draft",
        send_to_gudang: true,
    });

    const initialState = {
        nomor_spk: "",
        product_id: "",
        qty: "",
        tanggal: "", // kosong
        status: "Draft",
        send_to_gudang: true,
    };
    const resetForm = () => setData(initialState);

    // isi form saat edit
    useEffect(() => {

        if (show) {

            if (order) {

                setData({
                    nomor_spk: order.nomor_spk || "",
                    product_id: order.product_id || "",
                    qty: order.qty || "",
                    tanggal: order.tanggal || "",
                    status: order.status || "Draft",
                    send_to_gudang: true,
                });

            } else {

                resetForm(); // kosong + tanggal hari ini

            }
        }

    }, [show, order]);

    if (!show) return null;

    // simpan / update
    const submit = (e) => {

        e.preventDefault();

        if (order) {

            router.put(
                route("production-orders.update", order.id),
                data,
                {
                    onSuccess: () => onClose(),
                }
            );

        } else {

            router.post(
                route("production-orders.store"),
                data,
                {
                    onSuccess: () => onClose(),
                }
            );

        }

    };


    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-[560px] p-6">

                <h2 className="text-2xl font-bold mb-5">

                    {order ? "Edit SPK" : "Tambah SPK"}

                </h2>

                <form onSubmit={submit} className="space-y-4">

                    {/* No SPK */}
                    <div>
                        <label className="block font-semibold mb-2">
                            No SPK
                        </label>

                        <input
                            type="text"
                            value={data.nomor_spk}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    nomor_spk: e.target.value
                                })
                            }
                            className="w-full border rounded-lg p-3"
                            placeholder="SPK-001"
                            required
                        />
                    </div>

                    {/* Product */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Product
                        </label>

                        <select
                            value={data.product_id}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    product_id: e.target.value
                                })
                            }
                            className="w-full border rounded-lg p-3"
                            required
                        >

                            <option value="">
                                Pilih Product
                            </option>

                            {products.map((p) => (

                                <option key={p.id} value={p.id}>
                                    {p.nama}
                                </option>

                            ))}

                        </select>
                    </div>

                    {/* Qty */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Qty Produksi
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={data.qty}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    qty: e.target.value
                                })
                            }
                            className="w-full border rounded-lg p-3"
                            placeholder="100"
                            required
                        />
                    </div>

                    {/* Tanggal */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Tanggal
                        </label>

                        <input
                            type="date"
                            value={data.tanggal}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    tanggal: e.target.value
                                })
                            }
                            className="w-full border rounded-lg p-3"
                            required
                        />
                    </div>

                    {/* Status saat edit */}
                    {order && (
                        <div>
                            <label className="block font-semibold mb-2">
                                Status
                            </label>

                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        status: e.target.value
                                    })
                                }
                                className="w-full border rounded-lg p-3"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Planning">Planning</option>
                                <option value="Produksi">Produksi</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Cancel">Cancel</option>
                            </select>
                        </div>
                    )}

                    {/* Auto MR */}
                    {!order && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <label className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={data.send_to_gudang}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            send_to_gudang: e.target.checked
                                        })
                                    }
                                />

                                <span className="font-medium text-blue-800">
                                    Langsung buat Material Request ke Gudang
                                </span>

                            </label>
                        </div>
                    )}

                    {/* Button */}
                    <div className="flex justify-end gap-3 pt-3">

                        <button
                            type="button"
                            onClick={() => {
                                resetForm();
                                onClose();
                            }}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"

                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >
                            {order ? "Update SPK" : "Simpan SPK"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}