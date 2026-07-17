import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index() {

    const { boms, products, materials } = usePage().props;

    // =========================
    // STATE
    // =========================

    const [showModal, setShowModal] = useState(false);
    const [showAutoBom, setShowAutoBom] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState("");

    const [qtyProduksi, setQtyProduksi] = useState("");

    const [data, setData] = useState({
        product_id: "",
        material_id: "",
        kebutuhan: "",
        satuan: "",
        waste: "",
    });

    // =========================
    // RESET FORM
    // =========================

   const resetForm = () => {

    setData({
        product_id: "",
        material_id: "",
        kebutuhan: "",
        satuan: "",
        waste: "",
    });

};

    // =========================
    // SIMPAN BOM
    // =========================

    const submit = (e) => {

    e.preventDefault();

    router.post(route("boms.store"), data, {

        preserveScroll: true,

        onSuccess: () => {

            setShowModal(false);
            resetForm();

        },

        onError: (err) => {
            console.log(err);
        }

    });

};

    // =========================
    // HAPUS BOM
    // =========================

    const deleteBom = (id) => {

        if (!confirm("Yakin ingin menghapus BOM?")) {
            return;
        }

        router.delete(route("boms.destroy", id));

    };

    // =========================
    // AUTO BOM
    // =========================

    const generateBom = () => {

        if (!selectedProduct) {

            alert("Pilih Product terlebih dahulu.");
            return;

        }

        setShowAutoBom(true);

    };

    // =========================
    // SEND TO GUDANG
    // =========================

 const sendToGudang = () => {

    console.log("Send To Gudang diklik");

    router.post(route("material-requests.store"), {
        product_id: selectedProduct,
        qty_produksi: qtyProduksi,
        boms: selectedBoms,
    });

};

    // =========================
    // FILTER BOM
    // =========================

    const selectedBoms = boms.filter(

        (bom) =>
            Number(bom.product_id) === Number(selectedProduct)

    );

    // =========================
    // VIEW
    // =========================

    return (

        <AppLayout>
            <div className="p-6">

                {/* Header */}

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-3xl font-bold">
                        Master BOM
                    </h1>

                    <button
                        onClick={() => {
                            resetForm();
                            setShowModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
                    >
                        + Tambah BOM
                    </button>

                </div>

                {/* Tabel */}

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-800 text-white">

                            <tr>

                                <th className="border px-4 py-3 w-16">
                                    No
                                </th>

                                <th className="border px-4 py-3">
                                    Product
                                </th>

                                <th className="border px-4 py-3">
                                    Material
                                </th>

                                <th className="border px-4 py-3">
                                    Satuan
                                </th>

                                <th className="border px-4 py-3">
                                    Waste (%)
                                </th>

                                <th className="border px-4 py-3 w-32">
                                    Aksi
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {boms.length > 0 ? (

                                boms.map((bom, index) => (

                                    <tr
                                        key={bom.id}
                                        className={`text-center border-b cursor-pointer hover:bg-blue-50 ${Number(selectedProduct) === Number(bom.product_id)
                                            ? "bg-blue-100"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            setSelectedProduct(bom.product_id)
                                        }
                                    >

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
                                            {bom.material?.satuan}
                                        </td>

                                        <td className="border px-4 py-2">
                                            {parseInt(bom.waste)} %
                                        </td>

                                        <td className="border px-4 py-2">

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteBom(bom.id);
                                                }}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                            >
                                                Hapus
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-8 text-gray-500"
                                    >
                                        Belum ada data BOM
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* AUTO BOM */}

                <div className="flex justify-center mt-6">

                    <PrimaryButton onClick={generateBom}>
                         BOOM
                    </PrimaryButton>

                </div>

            </div>
            {/* ===========================
                MODAL TAMBAH BOM
            =========================== */}

            {showModal && (

                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                    <div className="bg-white rounded-xl shadow-xl w-[500px] p-6">

                        <h2 className="text-2xl font-bold mb-6">
                            Tambah BOM
                        </h2>

                        <form onSubmit={submit}>

                            {/* Product */}

                            <div className="mb-4">

                                <label className="block font-semibold mb-2">
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
                                    className="w-full border rounded-lg p-2"
                                    required
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

                            </div>

                            {/* Material */}

                            <div className="mb-4">

                                <label className="block font-semibold mb-2">
                                    Material
                                </label>

                                <select
                                    value={data.material_id}
                                    onChange={(e) => {

                                        const material = materials.find(
                                            (m) => Number(m.id) === Number(e.target.value)
                                        );

                                        setData({
                                            ...data,
                                            material_id: e.target.value,
                                            satuan: material ? material.satuan : "",
                                        });

                                    }}
                                    className="w-full border rounded-lg p-2"
                                    required
                                >

                                    <option value="">
                                        Pilih Material
                                    </option>

                                    {materials.map((material) => (

                                        <option
                                            key={material.id}
                                            value={material.id}
                                        >
                                            {material.nama}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            {/* Satuan */}

                            <div className="mb-4">

                                <label className="block font-semibold mb-2">
                                    Satuan
                                </label>


                                <input
                                    type="text"
                                    value={
                                        materials.find(
                                            (m) =>
                                                Number(m.id) === Number(data.material_id)
                                        )?.satuan || ""
                                    }
                                    className="w-full border rounded-lg p-2 bg-gray-100"
                                    readOnly
                                />

                            </div>
                            {/* Kebutuhan */}

                            <div className="mb-4">

                                <label className="block font-semibold mb-2">
                                    Kebutuhan / PCS
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={data.kebutuhan}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            kebutuhan: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg p-2"
                                    placeholder="Contoh : 2"
                                    required
                                />

                            </div>

                            {/* Waste */}

                            <div className="mb-6">

                                <label className="block font-semibold mb-2">
                                    Waste (%)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={data.waste}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            waste: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg p-2"
                                    placeholder="Contoh : 2"
                                    required
                                />

                            </div>

                            {/* Button */}

                            <div className="flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
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

                    </div>

                </div>

            )}
            {/* ===========================
                MODAL AUTO BOM
            =========================== */}

            {showAutoBom && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl shadow-xl w-[900px] p-6">

                        {/* Header */}

                        <div className="flex justify-between items-center mb-6">

                            <div>

                                <h2 className="text-2xl font-bold">
                                    📋 AUTO BOM
                                </h2>

                                <p className="text-gray-600 mt-2">

                                    Product :

                                    <span className="font-bold ml-2">

                                        {
                                            products.find(
                                                (p) => Number(p.id) === Number(selectedProduct)
                                            )?.nama
                                        }

                                    </span>

                                </p>

                            </div>

                            <div className="flex gap-2">

                                <button
                                    onClick={sendToGudang}
                                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
                                >
                                    📦 Send To Gudang
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAutoBom(false);
                                        setQtyProduksi("");
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
                                >
                                    Tutup
                                </button>

                            </div>

                        </div>

                        {/* Qty Produksi */}

                        <div className="flex items-center gap-3 mb-5">

                            <label className="font-semibold">
                                Qty Produksi
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={qtyProduksi}
                                onChange={(e) => setQtyProduksi(e.target.value)}
                                placeholder="ty sesuai order"
                                className="border rounded-lg p-2 w-52"
                            />

                        </div>

                        {/* Tabel */}

                        <table className="w-full border-collapse">

                            <thead className="bg-slate-800 text-white">

                                <tr>

                                    <th className="border p-3">
                                        Material
                                    </th>

                                    <th className="border p-3">
                                        Satuan
                                    </th>

                                    <th className="border p-3">
                                        Waste
                                    </th>

                                    <th className="border p-3">
                                        Total Kebutuhan
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {selectedBoms.length > 0 ? (

                                    selectedBoms.map((bom) => {

                                        const qty = Number(qtyProduksi || 0);

                                        const kebutuhan = Number(bom.kebutuhan || 0);

                                        // kebutuhan material tanpa waste
                                        const subtotal = qty * kebutuhan;

                                        // hitung waste
                                        const waste =
                                            subtotal * Number(bom.waste || 0) / 100;

                                        // total material yang dibutuhkan
                                        const total =
                                            Math.ceil(subtotal + waste);


                                        return (

                                            <tr key={bom.id}>

                                                <td className="border p-3">
                                                    {bom.material?.nama}
                                                </td>


                                                <td className="border p-3 text-center">
                                                    {bom.kebutuhan} {bom.material?.satuan}
                                                </td>


                                                <td className="border p-3 text-center">
                                                    {parseInt(bom.waste || 0)} %
                                                </td>


                                                <td className="border p-3 text-center font-bold text-blue-600">
                                                    {qtyProduksi ? total : "-"}
                                                </td>


                                            </tr>

                                        );

                                    })

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center py-6 text-gray-500"
                                        >
                                            Tidak ada data BOM.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </AppLayout>

    );

}