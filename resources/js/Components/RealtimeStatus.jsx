import {
    FaWifi,
    FaUsers,
    FaClipboardList,
    FaTruck,
    FaExclamationTriangle,
} from "react-icons/fa";

export default function RealtimeStatus() {

    const data = {
        online: true,
        operator: 12,
        order: 35,
        delivery: 8,
        stockAlert: 2,
    };

    return (

        <div className="grid grid-cols-5 gap-5 mt-6">

            {/* Sistem */}
            <div className="bg-green-500 rounded-xl text-white p-4 shadow flex items-center gap-4">

                <FaWifi size={28}/>

                <div>
                    <p className="text-sm">Status Sistem</p>
                    <h3 className="font-bold text-lg">
                        {data.online ? "ONLINE" : "OFFLINE"}
                    </h3>
                </div>

            </div>

            {/* Operator */}
            <div className="bg-blue-500 rounded-xl text-white p-4 shadow flex items-center gap-4">

                <FaUsers size={28}/>

                <div>
                    <p className="text-sm">Operator Aktif</p>
                    <h3 className="font-bold text-lg">
                        {data.operator}
                    </h3>
                </div>

            </div>

            {/* Order */}
            <div className="bg-purple-500 rounded-xl text-white p-4 shadow flex items-center gap-4">

                <FaClipboardList size={28}/>

                <div>
                    <p className="text-sm">Order Hari Ini</p>
                    <h3 className="font-bold text-lg">
                        {data.order}
                    </h3>
                </div>

            </div>

            {/* Pengiriman */}
            <div className="bg-orange-500 rounded-xl text-white p-4 shadow flex items-center gap-4">

                <FaTruck size={28}/>

                <div>
                    <p className="text-sm">Pengiriman</p>
                    <h3 className="font-bold text-lg">
                        {data.delivery}
                    </h3>
                </div>

            </div>

            {/* Alert */}
            <div className="bg-red-500 rounded-xl text-white p-4 shadow flex items-center gap-4">

                <FaExclamationTriangle size={28}/>

                <div>
                    <p className="text-sm">Stok Menipis</p>
                    <h3 className="font-bold text-lg">
                        {data.stockAlert}
                    </h3>
                </div>

            </div>

        </div>

    );

}