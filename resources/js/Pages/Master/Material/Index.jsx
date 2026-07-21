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

                                        <td className="p-3 text-center">
                                            {Math.floor(Number(item.stok))}
                                        </td>

                                        <td className="p-3 text-center">{item.satuan}</td>

                                        <td className="p-3 text-right">
                                            Rp {Number(item.harga).toLocaleString('id-ID')}
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

                    {/* Kode Material */}
                    <div className="mb-4">

                        <label className="block font-semibold mb-2">
                            Kode Material
                        </label>

                        <input
                            type="text"
                            value={data.kode}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    kode: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-2"
                            placeholder="Contoh: KNV-001"
                            required
                        />

                    </div>

                    {/* Nama Material */}
                    <div className="mb-4">

                        <label className="block font-semibold mb-2">
                            Nama Material
                        </label>

                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    nama: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-2"
                            placeholder="Contoh: Kain Canvas"
                            required
                        />

                    </div>

                    {/* Kategori */}
                    <div className="mb-4">

                        <label className="block font-semibold mb-2">
                            Kategori
                        </label>

                        <select
                            value={data.kategori}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    kategori: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-2"
                            required
                        >

                            <option value="">Pilih Kategori</option>

                            <option value="Kain">Kain</option>

                            <option value="Aksesoris">Aksesoris</option>

                            <option value="Benang">Benang</option>

                            <option value="Lem">Lem</option>

                            <option value="Busa">Busa</option>

                            <option value="Webbing">Webbing</option>

                            <option value="Hardware">Hardware</option>

                            <option value="Kemasan">Kemasan</option>

                            <option value="Lainnya">Lainnya</option>

                        </select>

                    </div>

                    {/* Satuan */}
                    <div className="mb-4">

                        <label className="block font-semibold mb-2">
                            Satuan
                        </label>

                        <select
                            value={data.satuan}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    satuan: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-2"
                            required
                        >

                            <option value="">Pilih Satuan</option>

                            <option value="PCS">PCS</option>

                            <option value="M">Meter (M)</option>

                            <option value="CM">Centimeter (CM)</option>

                            <option value="MM">Milimeter (MM)</option>

                            <option value="Roll">Roll</option>

                            <option value="Box">Box</option>

                            <option value="Dus">Dus</option>

                            <option value="Cone">Cone</option>

                            <option value="Kg">Kilogram (Kg)</option>

                            <option value="Gram">Gram</option>

                            <option value="Liter">Liter</option>

                            <option value="Kaleng">Kaleng</option>

                        </select>

                    </div>

                    {/* Stok Awal */}
                    <div className="mb-4">

                        <label className="block font-semibold mb-2">
                            Stok Awal
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.0001"
                            value={data.stok}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    stok: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-2"
                            placeholder="Contoh: 50.0000"
                            required
                        />

                    </div>

                    {/* Isi Kemasan */}
                    <div className="mb-4">

                        <label className="block font-semibold mb-2">
                            Isi Kemasan
                        </label>

                        <input
                            type="number"
                            min="0.0001"
                            step="0.0001"
                            value={data.isi_kemasan}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    isi_kemasan: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-2"
                            placeholder="Contoh: 50.0000"
                            required
                        />

                        <p className="text-xs text-gray-500 mt-1">
                            Contoh: 50 meter per roll, 100 pcs per box, 5 kg per kaleng.
                        </p>

                    </div>

                    {/* Stok Minimum */}
                    <div className="mb-4">

                        <label className="block font-semibold mb-2">
                            Stok Minimum
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.0001"
                            value={data.stok_minimum}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    stok_minimum: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-2"
                            placeholder="Contoh: 5.0000"
                            required
                        />

                    </div>

                    {/* Harga */}
                    <div className="mb-6">

                        <label className="block font-semibold mb-2">
                            Harga
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={data.harga}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    harga: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-2"
                            placeholder="Contoh: 25000"
                            required
                        />

                    </div>

                    {/* Tombol */}
                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                        >
                            Simpan
                        </button>

                    </div>

                </form>

            </Modal>
        </AppLayout>


    );
}
