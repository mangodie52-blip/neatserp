import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index() {

    const { boms, products, materials } = usePage().props;

    // =========================
    // FORMAT ANGKA
    // =========================
    const formatNumber = (num) => {
        const value = parseFloat(num || 0);

        // hilangkan nol di belakang koma
        return value % 1 === 0
            ? value.toString()
            : value.toFixed(4).replace(/\.?0+$/, '');
    };

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

        router.post(
            route('material-requests.store'),
            {
                production_order_id: selectedProductionOrder,
                product_id: selectedProduct,
                qty_produksi: qtyProduksi,
                boms: calculatedBoms,
            },
            {
                preserveScroll: true,

                onSuccess: () => {
                    alert('✅ Material Request berhasil dikirim ke Gudang.');
                    setShowAutoBom(false);
                    setQtyProduksi('');
                },

                onError: (errors) => {
                    console.log(errors);
                    alert('❌ Gagal mengirim Material Request. Cek console.');
                }
            }
        );

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

    router.post(
        route("production-orders.store"),
        data,
        {
            onSuccess: () => {

                // reset form
                setData({
                    nomor_spk: "",
                    product_id: "",
                    qty: "",
                    tanggal: new Date().toISOString().slice(0, 10),
                    status: "Draft",
                    send_to_gudang: true,
                });

                onClose();
            },
        }
    );

    const sendToGudang = () => {

        if (!selectedProduct) {
            alert('Pilih product terlebih dahulu.');
            return;
        }

        if (!qtyProduksi || Number(qtyProduksi) <= 0) {
            alert('Masukkan Qty Produksi.');
            return;
        }

        // hitung kebutuhan berdasarkan BOM
        const calculatedBoms = selectedBoms.map((bom) => {

            const qty = Number(qtyProduksi);
            const kebutuhan = Number(bom.kebutuhan || 0);
            const waste = Number(bom.waste || 0);

            // total kebutuhan produksi
            const total =
                kebutuhan *
                qty *
                (1 + waste / 100);

            return {
                material_id: bom.material_id,
                qty_request: Number(total.toFixed(4)),
                satuan: bom.satuan, // ✅ SATUAN DARI BOM
            };
        });

        router.post(
            route('material-requests.store'),
            {
                product_id: selectedProduct,
                qty_produksi: qtyProduksi,
                boms: calculatedBoms,
            },
            {
                preserveScroll: true,

                onSuccess: () => {
                    alert('✅ Material Request berhasil dikirim ke Gudang.');
                    setShowAutoBom(false);
                    setQtyProduksi('');
                },

                onError: (errors) => {
                    console.log(errors);
                    alert('❌ Gagal mengirim Material Request. Cek console.');
                }
            }
        );
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

                                        <td className="border p-3 text-center align-middle">
                                            <div className="font-semibold flex items-center justify-center min-h-[44px]">
                                                {bom.material?.nama}
                                            </div>
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

                            {/* Satuan BOM */}
                            <div className="mb-4">

                                <label className="block font-semibold mb-2">
                                    Satuan BOM
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

                                    <option value="">
                                        Pilih Satuan
                                    </option>

                                    <option value="PCS">
                                        PCS
                                    </option>

                                    <option value="M">
                                        Meter (M)
                                    </option>

                                    <option value="CM">
                                        Centimeter (CM)
                                    </option>

                                    <option value="MM">
                                        Milimeter (MM)
                                    </option>

                                    <option value="Roll">
                                        Roll
                                    </option>

                                    <option value="Box">
                                        Box
                                    </option>

                                    <option value="Dus">
                                        Dus
                                    </option>

                                    <option value="Cone">
                                        Cone
                                    </option>

                                    <option value="Kg">
                                        Kilogram (Kg)
                                    </option>

                                    <option value="Gram">
                                        Gram
                                    </option>

                                    <option value="Liter">
                                        Liter
                                    </option>

                                    <option value="Kaleng">
                                        Kaleng
                                    </option>

                                </select>

                            </div>
                            {/* Kebutuhan */}

                            <div className="mb-4">

                                <label className="block font-semibold mb-2">
                                    Kebutuhan / PCS
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.0001"
                                    value={data.kebutuhan}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            kebutuhan: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg p-2"
                                    placeholder=""
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
                                    placeholder=""
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
                                placeholder="sesuai order permintaan"
                                className="border rounded-lg p-2 w-52"
                            />

                        </div>

                        {/* Tabel */}

                        <table className="w-full border-collapse text-center">

                            <thead className="bg-slate-900 text-white">

                                <tr>

                                    <th className="border border-gray-300 px-6 py-5 text-lg font-bold text-center align-middle">
                                        Material
                                    </th>

                                    <th className="border border-gray-300 px-6 py-5 text-lg font-bold text-center align-middle">
                                        Satuan
                                    </th>

                                    <th className="border border-gray-300 px-6 py-5 text-lg font-bold text-center align-middle">
                                        Waste
                                    </th>

                                    <th className="border border-gray-300 px-6 py-5 text-lg font-bold text-center align-middle">
                                        Total Kebutuhan
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {selectedBoms.length > 0 ? (

                                    selectedBoms.map((bom) => {

                                        const qty = Number(qtyProduksi || 0);

                                        // kebutuhan per pcs
                                        const kebutuhan = Number(bom.kebutuhan || 0);

                                        // waste %
                                        const waste = Number(bom.waste || 0);

                                        // isi kemasan dari material
                                        const isiKemasan = Number(
                                            bom.material?.isi_kemasan || 1
                                        );

                                        const kemasan =
                                            isiKemasan <= 0 ? 1 : isiKemasan;

                                        // =========================
                                        // RUMUS BARU DECIMAL
                                        // (kebutuhan × qty produksi × (1 + waste%)) ÷ isi kemasan
                                        // =========================
                                        const total =
                                            kebutuhan *
                                            qty *
                                            (1 + waste / 100);

                                        return (

                                            <tr
                                                key={bom.id}
                                                className="hover:bg-gray-50 transition-colors"
                                            >

                                                {/* Material */}
                                                <td className="border border-gray-300 px-6 py-5 text-center align-middle">
                                                    <div className="font-semibold text-lg flex items-center justify-center min-h-[44px]">
                                                        {bom.material?.nama}
                                                    </div>
                                                </td>

                                                {/* Kebutuhan per PCS */}
                                                <td className="border border-gray-300 px-6 py-5 text-center align-middle">
                                                    <div className="font-medium text-base">
                                                        {formatNumber(bom.kebutuhan)} {bom.satuan}
                                                    </div>
                                                </td>

                                                {/* Waste */}
                                                <td className="border border-gray-300 px-6 py-5 text-center align-middle">
                                                    <div className="font-medium text-base">
                                                        {formatNumber(bom.waste || 0)} %
                                                    </div>
                                                </td>

                                                {/* Total kebutuhan */}
                                                <td className="border border-gray-300 px-6 py-5 text-center align-middle">
                                                    <div className="font-bold text-lg text-blue-700">
                                                        {qty > 0
                                                            ? `${formatNumber(total)} ${bom.satuan}`
                                                            : '-'}
                                                    </div>
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