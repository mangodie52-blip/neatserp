import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function Index({ orders, progresses }) {

    const { data, setData, post, processing } = useForm({

        production_order_id: '',
        tanggal: new Date().toISOString().slice(0, 10),
        line: '',
        operator: '',
        qty_selesai: '',
        keterangan: '',

    });

    const [search, setSearch] = useState('');

    const [sort, setSort] = useState({
        field: 'tanggal',
        direction: 'desc'
    });


    const submit = (e) => {

        e.preventDefault();

        post(route('production-progresses.store'));

    };


    // cari SPK yang dipilih
    const selectedOrder = orders.find(
        order => order.id == data.production_order_id
    );


    // sort
    const changeSort = (field) => {

        setSort({

            field,

            direction:
                sort.field === field &&
                    sort.direction === 'asc'
                    ?
                    'desc'
                    :
                    'asc'

        });

    };



    const filteredProgresses = progresses

        .filter(p => {


            const keyword = search.toLowerCase();


            return (

                p.production_order?.nomor_spk
                    ?.toLowerCase()
                    .includes(keyword)


                ||

                p.production_order?.product?.nama
                    ?.toLowerCase()
                    .includes(keyword)


                ||

                p.operator
                    ?.toLowerCase()
                    .includes(keyword)

            );


        })


        .sort((a, b) => {


            let x;
            let y;


            if (sort.field === 'nomor_spk') {


                x = a.production_order?.nomor_spk || '';

                y = b.production_order?.nomor_spk || '';


            }
            else if (sort.field === 'operator') {


                x = a.operator || '';

                y = b.operator || '';


            }
            else if (sort.field === 'qty') {


                x = a.qty_selesai;

                y = b.qty_selesai;


            }
            else {


                x = a[sort.field];

                y = b[sort.field];


            }



            if (sort.direction === 'asc') {

                return x > y ? 1 : -1;

            }


            return x < y ? 1 : -1;


        });




    return (

        <AppLayout>

            <div className="p-6">


                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-2xl font-bold">
                        📈 Progress Produksi
                    </h1>


                    <div className="flex gap-2">

                        <a
                            href={route('production-progresses.export-csv')}
                            className="
                            bg-green-600 
                            hover:bg-green-700 
                            text-white 
                            px-4 
                            py-2 
                            rounded-lg 
                            font-semibold
                            "
                        >
                            📊 Export Excel
                        </a>




                    </div>

                </div>
                <div className="mb-4">

                    <input

                        type="text"

                        placeholder="Cari SPK / Produk / Operator..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="
w-full
border
rounded-lg
p-3
"

                    />

                </div>





                <form
                    onSubmit={submit}
                    className="
                    bg-white
                    p-6
                    rounded-xl
                    shadow
                    mb-6
                    space-y-4
                    "
                >


                    <select

                        value={data.production_order_id}

                        onChange={(e) =>
                            setData(
                                'production_order_id',
                                e.target.value
                            )
                        }

                        className="
                        w-full
                        border
                        rounded-lg
                        p-3
                        "

                        required

                    >

                        <option value="">
                            Pilih SPK
                        </option>


                        {
                            orders.map(order => (

                                <option
                                    key={order.id}
                                    value={order.id}
                                >

                                    {order.nomor_spk}
                                    -
                                    {order.product?.nama}

                                </option>

                            ))
                        }


                    </select>




                    {
                        selectedOrder && (

                            <div
                                className="
                                bg-gray-100
                                p-4
                                rounded-lg
                                "
                            >

                                <p>
                                    <b>SPK :</b>
                                    {' '}
                                    {selectedOrder.nomor_spk}
                                </p>


                                <p>
                                    <b>Produk :</b>
                                    {' '}
                                    {selectedOrder.product?.nama}
                                </p>


                                <p>
                                    <b>Target :</b>
                                    {' '}
                                    {selectedOrder.qty}
                                </p>


                            </div>

                        )
                    }

                    <div className="grid grid-cols-2 gap-4">


                        <input

                            type="date"

                            value={data.tanggal}

                            onChange={(e) =>
                                setData(
                                    'tanggal',
                                    e.target.value
                                )
                            }

                            className="
                            border
                            rounded-lg
                            p-3
                            "

                            required

                        />



                        <input

                            type="number"

                            placeholder="Qty selesai hari ini"

                            value={data.qty_selesai}

                            onChange={(e) =>
                                setData(
                                    'qty_selesai',
                                    e.target.value
                                )
                            }

                            className="
                            border
                            rounded-lg
                            p-3
                            "

                            required

                        />


                    </div>





                    <div className="grid grid-cols-2 gap-4">


                        <input

                            type="text"

                            placeholder="Line"

                            value={data.line}

                            onChange={(e) =>
                                setData(
                                    'line',
                                    e.target.value
                                )
                            }

                            className="
                            border
                            rounded-lg
                            p-3
                            "

                        />



                        <input

                            type="text"

                            placeholder="Operator"

                            value={data.operator}

                            onChange={(e) =>
                                setData(
                                    'operator',
                                    e.target.value
                                )
                            }

                            className="
                            border
                            rounded-lg
                            p-3
                            "

                        />


                    </div>





                    <textarea

                        placeholder="Keterangan"

                        value={data.keterangan}

                        onChange={(e) =>
                            setData(
                                'keterangan',
                                e.target.value
                            )
                        }

                        className="
                        w-full
                        border
                        rounded-lg
                        p-3
                        "

                    />





                    <button

                        type="submit"

                        disabled={processing}

                        className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        font-semibold
                        "

                    >

                        💾 Simpan Progress

                    </button>


                </form>







                <div
                    className="
                    bg-white
                    rounded-xl
                    shadow
                    overflow-x-auto
                    "
                >


                    <table className="w-full">


                        <thead className="bg-gray-100">


                            <tr>

                                <th className="p-3 text-left">

                                    <button
                                     
                                    >

                                        Tanggal
                                    </button>

                                </th>


                                <th className="p-3 text-left">

                                    <button
                                        
                                    >

                                        SPK
                                    </button>

                                </th>


                                <th className="p-3 text-left">
                                    Nama Produk
                                </th>


                                <th className="p-3 text-left">
                                    Line
                                </th>


                                <th className="p-3 text-left">

                                    <button
                                        
                                    >

                                        Operator

                                    </button>

                                </th>


                                <th className="p-3 text-right">
                                    Qty
                                </th>


                            </tr>


                        </thead>



                        <tbody>


                            {
                                progresses.length > 0 ?


                                    filteredProgresses.map(p => (


                                        <tr
                                            key={p.id}
                                            className="border-b"
                                        >


                                            <td className="p-3">
                                                {p.tanggal}
                                            </td>


                                            <td className="p-3 font-semibold">
                                                {p.production_order?.nomor_spk}
                                            </td>


                                            <td className="p-3">
                                                {p.production_order?.product?.nama}
                                            </td>


                                            <td className="p-3">
                                                {p.line}
                                            </td>


                                            <td className="p-3">
                                                {p.operator}
                                            </td>


                                            <td className="
                                    p-3
                                    text-right
                                    font-bold
                                    text-green-600
                                    ">

                                                {p.qty_selesai}

                                            </td>


                                        </tr>


                                    ))


                                    :


                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="p-5 text-center text-gray-500"
                                        >

                                            Belum ada progress produksi

                                        </td>

                                    </tr>


                            }


                        </tbody>


                    </table>


                </div>


            </div>


        </AppLayout>

    );

}