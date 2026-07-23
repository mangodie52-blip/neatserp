import {
    FaWifi,
    FaUsers,
    FaClipboardList,
    FaTruck,
    FaExclamationTriangle,
} from "react-icons/fa";


export default function RealtimeStatus({ realtime }) {


    const data = realtime;



    return (

        <div className="grid grid-cols-5 gap-4">


            {/* SYSTEM */}

            <div className="bg-green-500 rounded-xl text-white p-4 shadow">

                <FaWifi size={25}/>

                <p className="text-sm mt-2">
                    Sistem
                </p>

                <h3 className="font-bold text-xl">
                    {data.online ? "ONLINE":"OFFLINE"}
                </h3>

            </div>




            {/* USER */}

            <div className="bg-blue-500 rounded-xl text-white p-4 shadow">

                <FaUsers size={25}/>

                <p className="text-sm mt-2">
                    User Aktif
                </p>

                <h3 className="font-bold text-xl">
                    {data.operator}
                </h3>

            </div>





            {/* PRODUKSI */}

            <div className="bg-purple-500 rounded-xl text-white p-4 shadow">


                <FaClipboardList size={25}/>


                <p className="text-sm mt-2">
                    SPK Running
                </p>


                <h3 className="font-bold text-xl">

                    {data.production_running}

                </h3>


            </div>






            {/* MR GUDANG */}

            <div className="bg-orange-500 rounded-xl text-white p-4 shadow">


                <FaTruck size={25}/>


                <p className="text-sm mt-2">
                    MR Gudang
                </p>


                <h3 className="font-bold text-xl">

                    {data.material_request}

                </h3>


            </div>






            {/* STOCK */}

            <div className="bg-red-500 rounded-xl text-white p-4 shadow">


                <FaExclamationTriangle size={25}/>


                <p className="text-sm mt-2">
                    Stok Kritis
                </p>


                <h3 className="font-bold text-xl">

                    {data.stock_alert}

                </h3>


            </div>



        </div>

    );

}