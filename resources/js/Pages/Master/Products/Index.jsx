import React, { useState } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


export default function Index() {
    const [editMode, setEditMode] = useState(false);

    const { products } = usePage().props;

    // ===========================
    // STATE
    // ===========================

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [data, setData] = useState({
        kode: "",
        nama: "",
        customer: "",
        warna: "",
        ukuran: "",
        kategori: "",
        keterangan: "",
    });

    const [editData, setEditData] = useState({
        id: "",
        kode: "",
        nama: "",
        customer: "",
        warna: "",
        ukuran: "",
        kategori: "",
        keterangan: "",
    });

    const placeholders = {
        kode: 'KODE',
        nama: 'NAMA PRODUK TAS',
        customer: 'NAMA COSTUMER',
        warna: 'WARNA PERMINTAAN',
        ukuran: 'NONE',
        kategori: 'KATEGORI',
        keterangan: 'KETERANGAN',
    };

    const labels = {
        kode: 'Kode Product',
        nama: 'Nama Product',
        customer: 'Customer',
        warna: 'Warna',
        ukuran: 'Ukuran',
        kategori: 'Kategori',
        keterangan: 'Keterangan',
    };

    // ===========================
    // RESET FORM
    // ===========================

    const resetForm = () => {
        setData({
            kode: "",
            nama: "",
            customer: "",
            warna: "",
            ukuran: "",
            kategori: "",
            keterangan: "",
        });
    };

    // ===========================
    // TAMBAH PRODUCT
    // ===========================

    const submit = (e) => {

        e.preventDefault();

        router.post(
            route("products.store"),
            data,
            {
                preserveScroll: true,

                onSuccess: () => {
                    setShowModal(false);
                    resetForm();
                },
            }
        );

    };

    // ===========================
    // BUKA MODAL EDIT
    // ===========================
    const [editingId, setEditingId] = useState(null);
    const editProduct = (product) => {

        setData({
            kode: product.kode || '',
            nama: product.nama || '',
            customer: product.customer || '',
            warna: product.warna || '',
            ukuran: product.ukuran || '',
            kategori: product.kategori || '',
            keterangan: product.keterangan || '',
        });

        setEditingId(product.id); // simpan ID yang sedang diedit
        setShowModal(true);       // buka modal
    };

    // ===========================
    // UPDATE PRODUCT
    // ===========================

    const updateProduct = (e) => {

        e.preventDefault();

        router.put(
            route("products.update", editData.id),
            editData,
            {
                preserveScroll: true,

                onSuccess: () => {
                    setShowEditModal(false);
                },
            }
        );

    };

    // ===========================
    // HAPUS PRODUCT
    // ===========================

    const deleteProduct = (id) => {

        if (confirm("Yakin hapus product?")) {

            router.delete(route("products.destroy", id), {
                preserveScroll: true,

                onSuccess: () => {
                    console.log("Product berhasil dihapus");
                },
            });

        }

    };

    return (

        <AppLayout>

            <div className="p-6">

                <div className="flex justify-between mb-5">

                    <h1 className="text-2xl font-bold">
                        Master Products
                    </h1>


                    <button
                        onClick={() => {
                            resetForm();
                            setShowModal(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Tambah Products
                    </button>

                </div>


                <div className="bg-white rounded shadow overflow-x-auto">

                    <table className="w-full table-fixed border-collapse">

                        <thead className="bg-slate-800 text-white">

                            <tr>

                                <th className="p-3">Kode</th>
                                <th className="p-3">Nama</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Warna</th>
                                <th className="p-3">Ukuran</th>
                                <th className="p-3">Kategori</th>
                                <th className="p-3">Keterangan</th>
                                <th className="p-3">Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                products.map((product) => (

                                    <tr key={product.id} className="border-b hover:bg-gray-50">

                                        <td className="px-4 py-3 text-center">
                                            {product.kode}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {product.nama}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {product.customer}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {product.warna}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {product.ukuran}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {product.kategori}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {product.keterangan}
                                        </td>


                                        <td className="px-10 py-3 flex gap-1">


                                            <button
                                                onClick={() => editProduct(product)}
                                                className="bg-white-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
                                            >
                                                Edit
                                            </button>


                                            <button onClick={() => deleteProduct(product.id)}
                                                className="hover:bg-red-600 text-black px-3 py-1 rounded"
                                            >
                                                Hapus
                                            </button>

                                        </td>


                                    </tr>

                                ))
                            }


                        </tbody>

                    </table>

                </div>


            </div>



            {
                showModal &&

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">


                    <div className="bg-white p-6 rounded-lg w-[500px]">


                        <h2 className="text-xl font-bold mb-4">

                            {
                                editMode
                                    ? "Edit Product"
                                    : "Tambah Product"
                            }

                        </h2>



                        <form onSubmit={submit}>


                            {

                                ['kode', 'nama', 'customer', 'warna', 'ukuran', 'kategori', 'keterangan'].map((field) => (

                                    <div key={field} className="mb-4">

                                        {/* Judul di atas kotak */}
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">

                                            {field === 'kode' && 'Kode Product'}
                                            {field === 'nama' && 'Nama Product'}
                                            {field === 'customer' && 'Customer'}
                                            {field === 'warna' && 'Warna'}
                                            {field === 'ukuran' && 'Ukuran'}
                                            {field === 'kategori' && 'Kategori'}
                                            {field === 'keterangan' && 'Keterangan'}

                                        </label>

                                        {/* Kotak input */}
                                        <input
                                            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder={placeholders[field]}
                                            value={data[field]}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    [field]: e.target.value
                                                })
                                            }
                                        />

                                    </div>

                                ))
                            }

                            <div className="flex justify-end gap-2">


                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    className="px-4 py-2 bg-gray-400 text-white rounded"
                                >
                                    Batal
                                </button>


                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                >
                                    Simpan
                                </button>


                            </div>


                        </form>


                    </div>


                </div>

            }


        </AppLayout>

    );

}