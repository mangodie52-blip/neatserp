import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Index() {

    const { boms, products, materials } = usePage().props;

    // =========================
    // FORMAT ANGKA
    // =========================
    const formatNumber = (num) => {
        const value = parseFloat(num || 0);

        return value % 1 === 0
            ? value.toString()
            : value.toFixed(4).replace(/\.?0+$/, '');
    };

    // format 1000 => 1.000
    const formatRibuan = (value) => {

        if (!value) return '';

        return Number(value).toLocaleString('id-ID');
    };



    // =========================
    // STATE
    // =========================

    const [showModal, setShowModal] = useState(false);

    // untuk tampilan input qty
    const [qtyDisplay, setQtyDisplay] = useState('');

    const [data, setData] = useState({
        product_id: '',
        material_id: '',
        kebutuhan: '',
        satuan: '',
        waste: 0,
    });

    // =========================
    // RESET FORM
    // =========================
    const resetForm = () => {

        setData({
            product_id: '',
            material_id: '',
            kebutuhan: '',
            satuan: '',
            waste: 0,
        });

        setQtyDisplay('');
    };

    // =========================
    // HANDLE QTY PERMINTAAN
    // =========================
    const handleQtyChange = (e) => {

        // ambil hanya angka
        const raw = e.target.value.replace(/\D/g, '');

        // simpan angka asli ke data
        setData({
            ...data,
            qty_permintaan: raw,
        });

        // tampilkan format ribuan
        setQtyDisplay(formatRibuan(raw));
    };


    // =========================
    // SAVE BOM
    // =========================
    const submit = (e) => {

        e.preventDefault();

        router.post(route('boms.store'), data, {

            preserveScroll: true,

            onSuccess: () => {

                alert('✅ BOM berhasil disimpan');

                setShowModal(false);
                resetForm();
            },

            onError: (errors) => {

                console.log(errors);
                alert('❌ Gagal menyimpan BOM');
            },
        });
    };

    // =========================
    // HAPUS BOM
    // =========================
    const deleteBom = (id) => {

        if (!confirm('Yakin ingin menghapus BOM?')) return;

        router.delete(route('boms.destroy', id));
    };

    const formatSatuan = (satuan) => {
        switch (satuan) {
            case 'M':
                return 'Meter';
            case 'KG':
                return 'Kg';
            case 'PCS':
                return 'PCS';
            case 'ROLL':
                return 'Roll';
            case 'PACK':
                return 'Pack';
            case 'BOX':
                return 'Box';
            default:
                return satuan; // kalau ada satuan baru, tampil apa adanya
        }
    };


    return (

        <AppLayout>

            <div className="p-6">

                {/* HEADER */}

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

                {/* TABEL BOM */}

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-800 text-white">

                            <tr>
                                <th className="border px-4 py-3 w-16">No</th>
                                <th className="border px-4 py-3">Product</th>
                                <th className="border px-4 py-3">Material</th>
                                <th className="border px-4 py-3">Qty Permintaan</th>
                                <th className="border px-4 py-3">Satuan</th>
                                <th className="border px-4 py-3">Kebutuhan / PCS</th>
                                <th className="border px-4 py-3">Jumlah Kemasan</th>
                                <th className="border px-4 py-3">Waste (%)</th>
                                <th className="border px-4 py-3 w-32">Aksi</th>
                            </tr>

                        </thead>

                        <tbody>

                            {boms.length > 0 ? (

                                boms.map((bom, index) => {

                                    // =========================
                                    // KONVERSI KE METER
                                    // =========================

                                    let kebutuhanMeter = parseFloat(bom.kebutuhan || 0);

                                    if (bom.satuan === 'CM') {
                                        kebutuhanMeter = kebutuhanMeter / 100;
                                    }

                                    if (bom.satuan === 'MM') {
                                        kebutuhanMeter = kebutuhanMeter / 1000;
                                    }

                                    // =========================
                                    // TOTAL KEBUTUHAN PRODUKSI
                                    // =========================

                                    const totalKebutuhan =
                                        kebutuhanMeter *
                                        parseFloat(bom.qty_permintaan || 0) *
                                        (1 + parseFloat(bom.waste || 0) / 100);

                                    // =========================
                                    // JUMLAH KEMASAN (ROLL)
                                    // =========================

                                    const jumlahKemasan =
                                        totalKebutuhan / parseFloat(bom.isi_kemasan || 1);

                                    return (

                                        <tr
                                            key={bom.id}
                                            className="text-center border-b hover:bg-blue-50 transition-colors"
                                        >

                                            {/* NO */}

                                            <td className="border px-4 py-2">
                                                {index + 1}
                                            </td>

                                            {/* PRODUCT */}

                                            <td className="border px-4 py-2 font-semibold">
                                                {bom.product?.nama}
                                            </td>

                                            {/* MATERIAL */}

                                            <td className="border px-4 py-2">
                                                {bom.material?.nama}
                                            </td>

                                            {/* QTY PERMINTAAN */}

                                            <td className="border px-4 py-2 font-medium text-blue-700">
                                                {formatNumber(bom.qty_permintaan)} pcs
                                            </td>

                                            {/* SATUAN PERMINTAAN */}

                                            <td className="border px-4 py-2">
                                                {formatSatuan(bom.satuan)}
                                            </td>

                                            {/* KEBUTUHAN / PCS */}

                                            <td className="border px-4 py-2">
                                                {formatNumber(bom.kebutuhan)}
                                            </td>


                                            {/* JUMLAH KEMASAN */}

                                            <td className="border px-4 py-2 font-semibold text-orange-700">
                                                {formatNumber(jumlahKemasan)} {bom.material?.satuan}
                                            </td>

                                            {/* WASTE */}

                                            <td className="border px-4 py-2">
                                                {formatNumber(bom.waste || 0)} %
                                            </td>

                                            {/* AKSI */}

                                            <td className="border px-4 py-2">

                                                <button
                                                    onClick={() => deleteBom(bom.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                                >
                                                    Hapus
                                                </button>

                                            </td>

                                        </tr>
                                    );
                                })

                            ) : (

                                <tr>

                                    <td
                                        colSpan="10"
                                        className="text-center py-8 text-gray-500"
                                    >
                                        Belum ada data BOM
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* ===========================
                MODAL TAMBAH BOM
            =========================== */}

            {showModal && (

                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                    <div className="bg-white rounded-xl shadow-xl w-[560px] p-6">

                        <h2 className="text-2xl font-bold mb-6">
                            Tambah BOM
                        </h2>

                        <form onSubmit={submit}>

                            {/* PRODUCT */}

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

                                    <option value="">Pilih Product</option>

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

                            {/* MATERIAL */}

                            <div className="mb-4">

                                <label className="block font-semibold mb-2">
                                    Material
                                </label>

                                <select
                                    value={data.material_id}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            material_id: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg p-2"
                                    required
                                >

                                    <option value="">Pilih Material</option>

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

                            {/* SATUAN PERMINTAAN BOM */}
                            {/* SATUAN PERMINTAAN BOM */}

                            <div className="mb-4 relative z-50">

                                <label className="block font-semibold mb-2">
                                    Satuan Permintaan BOM
                                </label>

                                <select
                                    value={data.satuan || ''}
                                    onChange={(e) =>
                                        setData(prev => ({
                                            ...prev,
                                            satuan: e.target.value
                                        }))
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >

                                    <option value="">Pilih Satuan</option>



                                    {/* ===== BERAT ===== */}
                                    <optgroup label="Berat">
                                        <option value="KG">Kilogram (KG)</option>
                                        <option value="GR">Gram (GR)</option>
                                        <option value="TON">Ton (TON)</option>
                                    </optgroup>

                                    {/* ===== VOLUME ===== */}
                                    <optgroup label="Volume">
                                        <option value="L">Liter (L)</option>
                                        <option value="ML">Mililiter (ML)</option>
                                    </optgroup>

                                    {/* ===== PANJANG ===== */}
                                    <optgroup label="Panjang">
                                        <option value="M">Meter (M)</option>
                                        <option value="CM">Centimeter (CM)</option>
                                        <option value="MM">Milimeter (MM)</option>
                                        <option value="YD">Yard (YD)</option>
                                    </optgroup>

                                    {/* ===== JUMLAH ===== */}
                                    <optgroup label="Jumlah">
                                        <option value="PCS">Pieces (PCS)</option>
                                        <option value="SET">Set (SET)</option>
                                        <option value="PAIR">Pair / Pasang (PAIR)</option>
                                        <option value="LUSIN">Lusin (12 PCS)</option>
                                    </optgroup>

                                    {/* ===== KEMASAN ===== */}
                                    <optgroup label="Kemasan">
                                        <option value="PACK">Pack</option>
                                        <option value="BOX">Box</option>
                                        <option value="ROLL">Roll</option>
                                        <option value="CONE">Cone</option>
                                        <option value="KARUNG">Karung</option>
                                        <option value="DRUM">Drum</option>
                                        <option value="PALLET">Pallet</option>
                                    </optgroup>

                                </select>

                                <p className="text-xs text-gray-500 mt-1">
                                    Pilih satuan kebutuhan material per pcs produksi.
                                </p>

                            </div>

                            {/* KEBUTUHAN */}

                            <div className="mb-4">
                                <label className="block font-semibold mb-2">
                                    Kebutuhan / PCS
                                </label>

                                <input
                                    type="number"
                                    step="0.0001"
                                    value={data.kebutuhan}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            kebutuhan: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg p-2"
                                    placeholder="0.5"
                                    required
                                />

                                <p className="text-xs text-gray-500 mt-1">
                                    Sistem akan otomatis mengkonversi satuan stok material
                                    ke satuan permintaan BOM.
                                </p>

                            </div>

                            {/* QTY PERMINTAAN */}

                            <div className="mb-4">
                                <label className="block font-semibold mb-2">
                                    QTY Permintaan
                                </label>

                                <input
                                    type="text"
                                    value={qtyDisplay}
                                    onChange={handleQtyChange}
                                    className="w-full border rounded-lg p-2 text-left font-semibold"
                                    placeholder="1.000"
                                    required
                                />

                                <p className="text-xs text-gray-500 mt-1">
                                    Jumlah permintaan customer / qty SPK.
                                </p>

                            </div>

                            {/* WASTE */}

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
                                    placeholder="contoh: 5"
                                    required
                                />

                            </div>

                            {/* BUTTON */}

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
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
                                >
                                    💾 Save BOM
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </AppLayout>
    );
}