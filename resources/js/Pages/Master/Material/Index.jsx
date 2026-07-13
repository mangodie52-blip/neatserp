import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import AppLayout from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";


export default function Index({ materials }) {

    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const {
        data,
        setData,
        post,
        put,
        processing,
        reset,
    } = useForm({
        kode: "",
        nama: "",
        kategori: "",
        satuan: "PCS",
        stok: "",
        stok_minimum: "",
        harga: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (editMode) {
            put(`/material/${selectedId}`, {
                onSuccess: () => {
                    reset();
                    setShowModal(false);
                    setEditMode(false);
                },
            });
        } else {
            post("/material", {
                onSuccess: () => {
                    reset();
                    setShowModal(false);
                },
            });
        }
    };

    const editMaterial = (item) => {

        setEditMode(true);

        setSelectedId(item.id);

        setData({
            kode: item.kode,
            nama: item.nama,
            kategori: item.kategori,
            satuan: item.satuan,
            stok: item.stok,
            stok_minimum: item.stok_minimum,
            harga: item.harga,
        });

        setShowModal(true);
    };

    const deleteMaterial = (id) => {

        if (confirm("Yakin ingin menghapus material ini?")) {

            router.delete(`/material/${id}`);

        }

    };

    return (
        <AppLayout>
            <div className="p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Master Material
                        </h1>
                        <p className="text-gray-500">
                            Kelola data bahan baku produksi
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        + Tambah Material
                    </button>
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl shadow p-4 mb-5">
                    <input
                        type="text"
                        placeholder="Cari material..."
                        className="w-full border rounded-lg px-4 py-2"
                    />
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow">

                    <table className="w-full text-sm text-left">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-3 text-left">Kode</th>
                                <th className="p-3 text-left">Nama</th>
                                <th className="p-3 text-left">Kategori</th>
                                <th className="p-3 text-center">Stok</th>
                                <th className="p-3 text-center">Satuan</th>
                                <th className="p-3 text-right">Harga</th>
                                <th className="p-3 text-center">Aksi</th>

                            </tr>

                        </thead>


                        <tbody>
                            {materials.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center p-8 text-gray-500">
                                        Belum ada data material
                                    </td>
                                </tr>
                            ) : (
                                materials.map((item) => (
                                    <tr key={item.id} className="border-t">

                                        <td className="p-3">{item.kode}</td>

                                        <td className="p-3">{item.nama}</td>

                                        <td className="p-3">{item.kategori}</td>

                                        <td className="p-3 text-center">{item.stok}</td>

                                        <td className="p-3 text-center">{item.satuan}</td>

                                        <td className="p-3 text-right">
                                            Rp {Number(item.harga).toLocaleString('id-ID')}
                                        </td>

                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => editMaterial(item)}
                                                className="bg-white-500 hover:bg-yellow-200 text-white px-3 py-1 rounded"
                                            >
                                                ✏ Edit
                                            </button>
                                            <button
                                                onClick={() => deleteMaterial(item.id)}
                                                className="bg-white-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                                            >
                                                🗑 Hapus
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
                            Tambah Material
                        </h2>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className="block mb-1">Kode Material</label>

                                <input
                                    value={data.kode}
                                    onChange={(e) => setData("kode", e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Nama Material</label>

                                <input
                                    value={data.nama}
                                    onChange={(e) => setData("nama", e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Kategori</label>

                                <input
                                    value={data.kategori}
                                    onChange={(e) => setData("kategori", e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Satuan</label>

                                <select
                                    value={data.satuan}
                                    onChange={(e) => setData("satuan", e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                >
                                    <option value="PCS">PCS</option>
                                    <option value="Meter">Meter</option>
                                    <option value="Roll">Roll</option>
                                    <option value="Kg">Kg</option>
                                </select>

                            </div>

                            <div>
                                <label className="block mb-1">Stok Awal</label>

                                <input
                                    type="number"
                                    value={data.stok}
                                    onChange={(e) => setData("stok", e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Stok Minimum</label>

                                <input
                                    type="number"
                                    value={data.stok_minimum}
                                    onChange={(e) => setData("stok_minimum", e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>

                            <div className="col-span-2">

                                <label className="block mb-1">Harga</label>

                                <input
                                    type="number"
                                    value={data.harga}
                                    onChange={(e) => setData("harga", e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                />

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
                                {processing ? "Menyimpan..." : "💾 Simpan"}
                            </button>

                        </div>

                    </div>

                </form>

            </Modal>
        </AppLayout>


    );
}
