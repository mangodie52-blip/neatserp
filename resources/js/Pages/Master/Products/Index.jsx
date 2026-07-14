import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";


export default function Index() {

    const { products } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [data, setData] = useState({
        kode: "",
        nama: "",
        customer: "",
        warna: "",
        ukuran: "",
        kategori: "",
        keterangan: "",
    });


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

        setEditMode(false);

        setSelectedId(null);
    };


    const submit = (e) => {
        e.preventDefault();

        if (editMode) {

            router.put(
                route("products.update", selectedId),
                data,
                {
                    onSuccess: () => {
                        setShowModal(false);
                        resetForm();
                    }
                }
            );

        } else {

            router.post(
                route("products.store"),
                data,
                {
                    onSuccess: () => {
                        setShowModal(false);
                        resetForm();
                    }
                }
            );

        }
    };


    const editProduct = (products) => {
        router.get(route("products.edit", products.id));
    };


    const deleteProduct = (id) => {

        if (confirm("Yakin hapus product?")) {

            router.delete(`/products/${id}`, {
                onSuccess: () => {
                    console.log("deleted");
                }
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


                                        <td className="px-1 py-3 flex gap-1">





                                            <button onClick={() => deleteProduct(product.id)}
                                                className="bg-yellow-600 text-white px-2 py-1 rounded">
                                                Hapus
                                            </button>

                                            <Link
                                                href={route("bom.index")}
                                                className="bg-blue-600 text-white px-2 py-1 rounded"
                                            >
                                                BOM
                                            </Link>




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
                                Object.keys(data).map((field) => (

                                    <input

                                        key={field}

                                        className="border w-full p-2 mb-3 rounded"

                                        placeholder={field}

                                        value={data[field]}

                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                [field]: e.target.value
                                            })
                                        }

                                    />



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