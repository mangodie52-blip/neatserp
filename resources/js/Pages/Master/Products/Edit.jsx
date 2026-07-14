import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


export default function Edit() {

    const { product } = usePage().props;


    const [data, setData] = useState({
        kode: product.kode,
        nama: product.nama,
        customer: product.customer ?? "",
        warna: product.warna ?? "",
        ukuran: product.ukuran ?? "",
        kategori: product.kategori ?? "",
        keterangan: product.keterangan ?? "",
    });


    const submit = (e) => {
        e.preventDefault();

        router.put(
            route("product.update", product.id),
            data,
            {
                onSuccess: () => {
                    alert("Product berhasil diupdate");
                }
            }
        );
    };


    return (

        <AppLayout>

            <div className="p-6">

                <h1 className="text-2xl font-bold mb-5">
                    Edit Product
                </h1>


                <div className="bg-white p-5 rounded shadow">

                    <form onSubmit={submit}>


                        {
                            Object.keys(data).map((field)=>(
                                
                                <div key={field} className="mb-3">

                                    <label className="block mb-1 capitalize">
                                        {field}
                                    </label>

                                    <input
                                        className="border w-full p-2 rounded"
                                        value={data[field]}
                                        onChange={(e)=>
                                            setData({
                                                ...data,
                                                [field]: e.target.value
                                            })
                                        }
                                    />

                                </div>

                            ))
                        }


                        <button
                            className="bg-green-600 text-white px-5 py-2 rounded"
                        >
                            Simpan
                        </button>


                    </form>

                </div>



                <div className="bg-white p-5 rounded shadow mt-5">

                    <h2 className="text-xl font-bold">
                        BOM Material
                    </h2>

                </div>


            </div>


        </AppLayout>

    );
}