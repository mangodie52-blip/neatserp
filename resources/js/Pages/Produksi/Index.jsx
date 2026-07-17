import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import Modal from "@/Components/Modal";
import { useForm, router } from "@inertiajs/react";

export default function Index({ productions }) {

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, put, processing, reset } = useForm({

        spk_no: "",
        po_id: "",
        po_date: "",
        model: "",
        line: "",
        qty_awal: 0,
        qty_akhir: 0,
        deadline: "",
        status: "Pending"

    });

    const openCreateModal = () => {
        reset();

        setEditMode(false);

        setSelectedId(null);

        setShowModal(true);
    };

    const editProduction = (item) => {

        console.log("EDIT DIKLIK", item);

        setEditMode(true);
        setSelectedId(item.id);

        setData({
            spk_no: item.spk_no,
            po_id: item.po_id,
            po_date: item.po_date,
            model: item.model,
            line: item.line,
            qty_awal: item.qty_awal,
            qty_akhir: item.qty_akhir,
            deadline: item.deadline,
            status: item.status,
        });

        setShowModal(true);
    };

    const deleteProduction = (id) => {

        console.log("DELETE ID:", id);

        if (!confirm("Yakin ingin menghapus data ini?")) return;

        router.delete(route("produksi.destroy", id));

    };

    const submit = (e) => {
        e.preventDefault();

        console.log("Edit Mode:", editMode);
        console.log("Selected ID:", selectedId);
        console.log("Data:", data);

        if (editMode) {

            put(route("produksi.update", selectedId), {
                onSuccess: () => {
                    console.log("Update berhasil");
                    setShowModal(false);
                    reset();
                    setEditMode(false);
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });

        } else {

            post(route("produksi.store"), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });

        }
    };
    return (
        <AppLayout>
            <div className="p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Produksi
                        </h1>
                        <p className="text-gray-500">
                            Kelola data produksi
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        + Tambah Produksi
                    </button>
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl shadow p-4 mb-5">
                    <input
                        type="text"
                        placeholder="Cari produksi..."
                        className="w-full border rounded-lg px-4 py-2"
                    />
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow overflow-x-auto">

                    <table className="w-full text-sm text-left">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-3">No SPK</th>
                                <th className="p-3">ID PO</th>
                                <th className="p-3">Tanggal Masuk PO</th>
                                <th className="p-3">Model PO</th>
                                <th className="p-3">User / Line</th>
                                <th className="p-3 text-center">Qty Awal</th>
                                <th className="p-3 text-center">Qty Akhir</th>
                                <th className="p-3 text-center">Deadline</th>
                                <th className="p-3 text-center">Status</th>
                                <th className="p-3 text-center">Aksi</th>

                            </tr>

                        </thead>

                        <tbody>

                            {productions.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="text-center p-8 text-gray-500"
                                    >
                                        Belum ada data produksi
                                    </td>

                                </tr>

                            ) : (

                                productions.map((item) => (

                                    <tr key={item.id} className="border-t hover:bg-gray-50">

                                        <td className="p-3">{item.spk_no}</td>

                                        <td className="p-3">{item.po_id}</td>

                                        <td className="p-3">{item.po_date}</td>

                                        <td className="p-3">{item.model}</td>

                                        <td className="p-3">{item.line}</td>

                                        <td className="p-3 text-center">
                                            {item.qty_awal}
                                        </td>

                                        <td className="p-3 text-center">
                                            {item.qty_akhir}
                                        </td>

                                        <td className="p-3 text-center">
                                            {item.deadline}
                                        </td>

                                        <td className="p-3 text-center">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${item.status === "Finished"
                                                        ? "bg-green-100 text-green-700"
                                                        : item.status === "Production"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>

                                        </td>

                                        <td className="p-3 text-center">

                                            <button
                                                onClick={() => editMaterial(item)}
                                                className="hover:bg-yellow-600 text-black px-3 py-1 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteMaterial(item.id)}
                                                className="hover:bg-red-600 text-black px-3 py-1 rounded"
                                            >
                                                Hapus
                                            </button>
                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
            >

                <form onSubmit={submit}>

                    <div className="p-6">

                        <h2 className="text-2xl font-bold mb-6">
                            {editMode ? "Edit Produksi" : "Tambah Produksi"}
                        </h2>


                        <div className="grid grid-cols-2 gap-4">


                            {/* No SPK */}
                            <div>

                                <label className="block mb-1">
                                    No SPK
                                </label>

                                <input
                                    value={data.spk_no || ""}
                                    onChange={(e) => setData("spk_no", e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                    placeholder="Contoh : SPK-001"
                                />

                            </div>



                            {/* ID PO */}
                            <div>

                                <label className="block mb-1">
                                    ID PO
                                </label>

                                <input
                                    value={data.po_id || ""}
                                    onChange={(e) => setData("po_id", e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                    placeholder="Nomor PO"
                                />

                            </div>


                            {/* Tanggal Masuk PO */}
                            <div>
                                <label className="block mb-1">Tanggal Masuk PO</label>

                                <input
                                    type="date"
                                    value={data.po_date}
                                    onChange={(e) => setData("po_date", e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>



                            {/* Model */}
                            <div>

                                <label className="block mb-1">
                                    Model PO
                                </label>

                                <input
                                    value={data.model || ""}
                                    onChange={(e) => setData("model", e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                    placeholder="Nama Model Tas"
                                />

                            </div>



                            {/* Line */}
                            <div>

                                <label className="block mb-1">
                                    User / Line
                                </label>

                                <select
                                    value={data.line || ""}
                                    onChange={(e) => setData("line", e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                >

                                    <option value="">
                                        Pilih Line
                                    </option>

                                    <option value="Line A">
                                        Line A
                                    </option>

                                    <option value="Line B">
                                        Line B
                                    </option>

                                    <option value="Line C">
                                        Line C
                                    </option>

                                    <option value="Line D">
                                        Line D
                                    </option>


                                </select>

                            </div>



                            {/* Qty Awal */}
                            <div>

                                <label className="block mb-1">
                                    Quantity Awal
                                </label>

                                <input
                                    type="number"
                                    value={data.qty_awal || ""}
                                    onChange={(e) => setData(
                                        "qty_awal",
                                        Number(e.target.value)
                                    )}
                                    className="w-full border rounded-lg p-2"
                                />

                            </div>




                            {/* Qty Akhir */}
                            <div>

                                <label className="block mb-1">
                                    Quantity Akhir
                                </label>

                                <input
                                    type="number"
                                    value={data.qty_akhir || ""}
                                    onChange={(e) => setData(
                                        "qty_akhir",
                                        Number(e.target.value)
                                    )}
                                    className="w-full border rounded-lg p-2"
                                />

                            </div>




                            {/* Deadline */}
                            <div>

                                <label className="block mb-1">
                                    Deadline
                                </label>

                                <input
                                    type="date"
                                    value={data.deadline || ""}
                                    onChange={(e) => setData(
                                        "deadline",
                                        e.target.value
                                    )}
                                    className="w-full border rounded-lg p-2"
                                />

                            </div>




                            {/* Status */}
                            <div>

                                <label className="block mb-1">
                                    Status
                                </label>


                                <select
                                    value={data.status || "Pending"}
                                    onChange={(e) => setData(
                                        "status",
                                        e.target.value
                                    )}
                                    className="w-full border rounded-lg p-2"
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>


                                    <option value="Production">
                                        Production
                                    </option>


                                    <option value="Finished">
                                        Finished
                                    </option>


                                </select>


                            </div>


                        </div>



                        <div className="flex justify-end gap-3 mt-6">


                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                            >

                                Batal

                            </button>



                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                            >

                                {
                                    processing
                                        ?
                                        "Menyimpan..."
                                        :
                                        editMode
                                            ?
                                            "✏ Update"
                                            :
                                            "💾 Simpan"
                                }

                            </button>


                        </div>


                    </div>


                </form>


            </Modal>
        </AppLayout>
    );
}