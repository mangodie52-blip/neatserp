import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";

export default function ProductionForm({
    show,
    onClose,
    products,
    order = null,
    
}) {

    const [data, setData] = useState({
        nomor_spk: "",
        product_id: "",
        qty: "",
        tanggal: "",
        status: "Draft",
    });

    useEffect(() => {

        if (order) {

            setData({
                nomor_spk: order.nomor_spk,
                product_id: order.product_id,
                qty: order.qty,
                tanggal: order.tanggal,
                status: order.status,
            });

        } else {

            setData({
                nomor_spk: "",
                product_id: "",
                qty: "",
                tanggal: "",
                status: "Draft",
            });

        }

    }, [order]);

    const submit = (e) => {

        e.preventDefault();

        if (order) {

            router.put(`/production-orders/${order.id}`, data, {
                onSuccess: () => onClose(),
            });

        } else {

            router.post("/production-orders", data, {
                onSuccess: () => onClose(),
            });

        }

    };

    if (!show) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">

                <h2 className="text-xl font-bold mb-6">

                    {order ? "Edit SPK" : "Tambah SPK"}

                </h2>

                <form onSubmit={submit} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Nomor SPK"
                        value={data.nomor_spk}
                        onChange={(e) =>
                            setData({
                                ...data,
                                nomor_spk: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-2"
                    />

                    <select
                        value={data.product_id}
                        onChange={(e) =>
                            setData({
                                ...data,
                                product_id: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-2"
                    >

                        <option value="">
                            Pilih Product
                        </option>

                        {products.map((product) => (

                            <option
                                key={product.id}
                                value={product.id}
                            >
                                {product.nama}
                            </option>

                        ))}

                    </select>

                    <input
                        type="number"
                        placeholder="Qty"
                        value={data.qty}
                        onChange={(e) =>
                            setData({
                                ...data,
                                qty: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-2"
                    />

                    <input
                        type="date"
                        value={data.tanggal}
                        onChange={(e) =>
                            setData({
                                ...data,
                                tanggal: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-2"
                    />

                    <select
                        value={data.status}
                        onChange={(e) =>
                            setData({
                                ...data,
                                status: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-2"
                    >

                        <option>Draft</option>
                        <option>Proses</option>
                        <option>Selesai</option>

                    </select>

                    <div className="flex justify-end gap-2">

                        <DangerButton
                            type="button"
                            onClick={onClose}
                        >
                            Batal
                        </DangerButton>

                        <PrimaryButton
                            type="submit"
                        >
                            Simpan
                        </PrimaryButton>

                    </div>

                </form>

            </div>

        </div>

    );

}