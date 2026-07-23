import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import AppLayout from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';


export default function Index({ materials }) {

    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');

    const filteredMaterials = materials.filter((m) =>
        (m.nama || '').toLowerCase().includes(search.toLowerCase()) ||
        (m.kode || '').toLowerCase().includes(search.toLowerCase()) ||
        (m.kategori || '').toLowerCase().includes(search.toLowerCase())
    );

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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                            <div className="bg-white rounded-xl border p-4 shadow-sm">
                                <p className="text-sm text-gray-500">Total Material</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {materials.length}
                                </p>
                            </div>

                            <div className="bg-white rounded-xl border p-4 shadow-sm">
                                <p className="text-sm text-gray-500">Stok Menipis</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {materials.filter(m => Number(m.stok) <= Number(m.stok_minimum)).length}
                                </p>
                            </div>

                            <div className="bg-white rounded-xl border p-4 shadow-sm">
                                <p className="text-sm text-gray-500">Stok Aman</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {materials.filter(m => Number(m.stok) > Number(m.stok_minimum)).length}
                                </p>
                            </div>

                        </div>
                        <p className="text-gray-500">
                            Kelola data bahan baku produksi
                        </p>
                    </div>
                    <PrimaryButton onClick={() => setShowModal(true)}>
                        + Tambah Material
                    </PrimaryButton>
                </div>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Cari material berdasarkan kode, nama, atau kategori..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />



                {/* Table */}
                <div className="bg-white rounded-xl shadow overflow-x-auto">
                    <div className="mb-2 text-sm text-red-600 font-bold">
                        DEBUG: {filteredMaterials.length} material ditemukan
                    </div>
                    <table className="min-w-full text-sm">


                        <thead className="bg-gray-100">

                            <tr>
                                <th className="p-3 text-left">Kode</th>
                                <th className="p-3 text-left">Nama Material</th>
                                <th className="p-3 text-left">Kategori</th>
                                <th className="p-3 text-center">Satuan</th>
                                <th className="p-3 text-center">Stok</th>
                                <th className="p-3 text-center">Stok Minimum</th>
                                <th className="p-3 text-center">Status</th>
                                <th className="p-3 text-center">Aksi</th>
                            </tr>


                        </thead>


                        <tbody>
                            {filteredMaterials.length > 0 ? (
                                filteredMaterials.map((material) => (
                                    <tr key={material.id} className="border-t hover:bg-gray-50">

                                        <td className="p-3 font-mono text-sm font-semibold text-gray-700">
                                            {material.kode}
                                        </td>

                                        <td className="p-3 font-medium text-gray-900">
                                            {material.nama}
                                        </td>

                                        <td className="p-3 text-gray-700">
                                            {material.kategori}
                                        </td>

                                        <td className="p-3 text-center">
                                            <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm">
                                                {material.satuan}
                                            </span>
                                        </td>

                                        <td className="p-3 text-center font-semibold">
                                            {material.stok}
                                        </td>

                                        <td className="p-3 text-center">
                                            {material.stok_minimum}
                                        </td>

                                        <td className="p-3 text-center">
                                            {Number(material.stok) <= Number(material.stok_minimum) ? (
                                                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                                                    Stok Menipis
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                                    Aman
                                                </span>
                                            )}
                                        </td>

                                        {/* Aksi */}
                                        <td className="p-3 text-center">
                                            <div className="flex items-center justify-center gap-2 whitespace-nowrap">

                                                <SecondaryButton onClick={() => editMaterial(material)}>
                                                    Edit
                                                </SecondaryButton>

                                                <DangerButton onClick={() => deleteMaterial(material.id)}>
                                                    Hapus
                                                </DangerButton>

                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="p-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">📦</span>
                                            <p className="font-medium">Belum ada material</p>
                                            <p className="text-sm">
                                                Klik <b>+ Tambah Material</b> untuk menambahkan bahan baku produksi.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
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
                            placeholder="KNV-001"
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
                            placeholder=""
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
                            placeholder=""
                            required
                        />

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
                            placeholder=""
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
                            placeholder=""
                            required
                        />

                        <p className="text-xs text-gray-500 mt-1">
                            Contoh: 50 meter per roll, 100 pcs per box, 5 kg per kaleng.
                        </p>

                    </div>

                    {/* Tombol */}
                    <div className="flex justify-end gap-3">

                        <SecondaryButton onClick={() => setShowModal(false)} type="button">
                            Batal
                        </SecondaryButton>

                        <PrimaryButton type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </PrimaryButton>

                    </div>

                </form>

            </Modal>
        </AppLayout>


    );
}
