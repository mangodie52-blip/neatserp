import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';


export default function Detail() {

    const { mr, flash = {} } = usePage().props;


    // =========================
    // FORMAT ANGKA DECIMAL
    // =========================
    const formatNumber = (num) => {

        const value = parseFloat(num || 0);

        return value % 1 === 0
            ? value.toString()
            : value.toFixed(4).replace(/\.?0+$/, '');

    };


    // =========================
    // CEK STOK KURANG
    // =========================
    const shortageItems = (mr.details || []).filter((d) => {

        const stok = Number(d.material?.stok || 0);
        const request = Number(d.qty_request || 0);

        return stok < request;

    });



    // =========================
    // APPROVE MR
    // =========================
    const approve = (id) => {

        const detailText = (mr.details || [])
            .map((d, i) =>
                `${i + 1}. ${d.material?.nama || '-'}\n   ${formatNumber(d.qty_request)} ${d.satuan}`
            )
            .join('\n\n');


        if (!confirm(
            `Approve Material Request ${mr.nomor_mr}?\n\n` +
            detailText +
            `\n\nStok gudang akan langsung berkurang.`
        )) {
            return;
        }


        router.post(
            route('material-requests.approve', id),
            {},
            {
                onSuccess: () => {

                    alert(
                        '✅ Material Request berhasil di approve.'
                    );

                },
            }
        );

    };



    return (

        <AppLayout>

            <div className="p-6">


                {flash.error && (

                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">

                        {flash.error}

                    </div>

                )}


                {flash.success && (

                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">

                        {flash.success}

                    </div>

                )}


                {shortageItems.length > 0 && (

                    <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">

                        <div className="font-semibold mb-2">

                            ⚠️ Material stok kurang

                        </div>


                        <ul className="list-disc pl-5">

                            {shortageItems.map((item) => (

                                <li key={item.id}>

                                    <b>
                                        {item.material?.nama}
                                    </b>

                                    {' '}
                                    Kurang :

                                    {' '}

                                    {formatNumber(
                                        Number(item.qty_request) -
                                        Number(item.material?.stok || 0)
                                    )}

                                    {' '}

                                    {item.satuan}

                                </li>

                            ))}

                        </ul>


                    </div>

                )}


                <h1 className="text-2xl font-bold mb-5">

                    Material Request

                </h1>
                <div className="bg-white p-5 rounded shadow">


                    {/* =========================
                        HEADER MR
                    ========================= */}

                    <div className="mb-5 space-y-2">


                        <p>
                            <span className="font-medium">
                                No MR :
                            </span>

                            {' '}

                            <span className="font-bold">
                                {mr.nomor_mr}
                            </span>

                        </p>



                        <p>
                            <span className="font-medium">
                                No SPK :
                            </span>

                            {' '}

                            <span className="font-bold">
                                {mr.production_order?.nomor_spk ?? '-'}
                            </span>

                        </p>



                        <p>
                            <span className="font-medium">
                                Produk :
                            </span>

                            {' '}

                            <span className="font-bold">
                                {mr.production_order?.product?.nama ?? '-'}
                            </span>

                        </p>



                        <p>
                            <span className="font-medium">
                                Tanggal :
                            </span>

                            {' '}

                            {mr.tanggal}

                        </p>



                        <p>
                            <span className="font-medium">
                                Status :
                            </span>

                            {' '}

                            <span className="font-semibold text-blue-700">
                                {mr.status}
                            </span>

                        </p>


                    </div>



                    {/* =========================
                        TABEL MATERIAL
                    ========================= */}

                    <div className="overflow-x-auto">


                        <table className="w-full border border-gray-300 border-collapse">


                            <thead className="bg-gray-100">


                                <tr>


                                    <th className="border px-4 py-3 text-left">
                                        Material
                                    </th>


                                    <th className="border px-4 py-3 text-center">
                                        Request
                                    </th>


                                    <th className="border px-4 py-3 text-center">
                                        Approved
                                    </th>


                                    <th className="border px-4 py-3 text-center">
                                        Terpakai
                                    </th>


                                    <th className="border px-4 py-3 text-center">
                                        Konversi
                                    </th>


                                </tr>


                            </thead>



                            <tbody>


                                {(mr.details || []).map((detail) => {


                                    const isiKemasan =
                                        Number(
                                            detail.material?.isi_kemasan || 1
                                        );


                                    const approved =
                                        Number(
                                            detail.qty_approved || 0
                                        );



                                    // CM menjadi meter

                                    const approvedMeter =
                                        detail.satuan === 'CM'
                                            ? approved / 100
                                            : approved;



                                    const rollTerpakai =
                                        approvedMeter / isiKemasan;



                                    return (


                                        <tr key={detail.id}>


                                            {/* MATERIAL */}

                                            <td className="border px-4 py-3 font-medium">

                                                {detail.material?.nama ?? '-'}

                                            </td>



                                            {/* REQUEST */}

                                            <td className="border px-4 py-3 text-center">


                                                {formatNumber(
                                                    detail.qty_request
                                                )}

                                                {' '}

                                                {detail.satuan}


                                            </td>



                                            {/* APPROVED */}

                                            <td className="border px-4 py-3 text-center">


                                                {approved > 0 ? (


                                                    <span className="text-green-700 font-semibold">


                                                        {formatNumber(
                                                            approved
                                                        )}

                                                        {' '}

                                                        {detail.satuan}


                                                    </span>


                                                ) : (

                                                    '-'

                                                )}



                                            </td>



                                            {/* TERPAKAI */}

                                            <td className="border px-4 py-3 text-center">


                                                {approved > 0 ? (


                                                    <span className="text-blue-700 font-semibold">


                                                        {formatNumber(
                                                            rollTerpakai
                                                        )}

                                                        {' '}

                                                        {detail.material?.satuan}


                                                    </span>


                                                ) : (

                                                    '-'

                                                )}



                                            </td>



                                            {/* KONVERSI */}

                                            <td className="border px-4 py-3 text-center">


                                                {approved > 0 ? (


                                                    <div>


                                                        <div className="font-semibold text-blue-700">

                                                            {formatNumber(
                                                                rollTerpakai
                                                            )}

                                                            {' '}

                                                            {detail.material?.satuan}


                                                        </div>


                                                        <div className="text-xs text-gray-500">


                                                            1 {detail.material?.satuan}
                                                            {' '}
                                                            =
                                                            {' '}
                                                            {isiKemasan}
                                                            {' '}
                                                            M


                                                        </div>


                                                    </div>


                                                ) : (

                                                    '-'

                                                )}



                                            </td>



                                        </tr>


                                    );


                                })}



                            </tbody>


                        </table>


                    </div>
                    {/* =========================
                        CATATAN
                    ========================= */}

                    <div className="mt-5">


                        <label className="font-medium">

                            Catatan :

                        </label>


                        <textarea
                            className="w-full border rounded mt-2 p-3"
                            rows="3"
                            placeholder="Tambahkan catatan bila diperlukan..."
                        />


                    </div>



                    {/* =========================
                        BUTTON ACTION
                    ========================= */}

                    <div className="mt-5 flex gap-3 flex-wrap">


                        {(mr.status === 'Waiting Approval' ||
                            mr.status === 'Pending') && (

                                <button
                                    onClick={() => approve(mr.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                                >

                                    ✅ Approve

                                </button>

                            )}

                        {mr.status === 'Waiting Approval' && (
                            <button
                                onClick={() => {
                                    const reason = prompt('Alasan reject material request:');

                                    if (reason && reason.trim() !== '') {
                                        router.post(route('material-requests.reject', mr.id), {
                                            reason,
                                        });
                                    }
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                            >
                                ❌ Reject
                            </button>
                        )}

                        {(mr.status === 'Approved' || mr.status === 'Partial') && (
                            <button
                                onClick={() => {
                                    if (confirm('Keluarkan material dari gudang?')) {
                                        router.post(route('material-issues.store', mr.id));
                                    }
                                }}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold"
                            >
                                📦 Keluarkan Material
                            </button>
                        )}

                      


                        <a

                            href={route(
                                'material-requests.print',
                                mr.id
                            )}

                            target="_blank"

                            rel="noreferrer"

                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"

                        >

                            🖨 Print

                        </a>



                        <Link

                            href={route(
                                'material-requests.index'
                            )}

                            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition"

                        >

                            Close

                        </Link>


                    </div>


                </div>


            </div>


        </AppLayout>

    );

}