import AppLayout from "@/Layouts/AppLayout";
import ProductionChart from "@/Components/Charts/ProductionChart";
import FlowChart from "@/Components/Charts/FlowChart";
import RealtimeStatus from "@/Components/RealtimeStatus";
import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function Dashboard({
    user,
    totalMaterial,
    totalProduction,
    productionRunning,
    productionFinished,
    productionPending,
    latestProductions,
    chartData,
    activities,
}) {

    // 🔔 state notif

    const [toast, setToast] = useState(null);
    const lastActivityId = useRef(null);

    // polling activity setiap 5 detik
    useEffect(() => {

        const interval = setInterval(() => {

            router.reload({
                only: ["activities"],
                preserveScroll: true,
                preserveState: true,
            });

        }, 5000);

        return () => clearInterval(interval);

    }, []);
    
    const getIcon = (module) => {

        switch (module) {

            case "Produksi":
            case "Production":
                return "🏭";

            case "Material":
                return "🧵";

            case "Material Request":
                return "📦";

            case "Product":
                return "👜";

            default:
                return "📄";

        }

    };

    const getBadgeColor = (action) => {

        switch (action) {

            case "CREATE":
                return "bg-green-500";

            case "UPDATE":
                return "bg-blue-500";

            case "DELETE":
                return "bg-red-500";

            case "APPROVE":
                return "bg-emerald-500";

            case "REJECT":
                return "bg-orange-500";

            default:
                return "bg-gray-500";

        }

    };

    const getCardColor = (action) => {

        switch (action) {

            case "CREATE":
                return "bg-green-50 border-green-200";

            case "UPDATE":
                return "bg-blue-50 border-blue-200";

            case "DELETE":
                return "bg-red-50 border-red-200";

            case "APPROVE":
                return "bg-emerald-50 border-emerald-200";

            case "REJECT":
                return "bg-orange-50 border-orange-200";

            default:
                return "bg-white border-gray-200";

        }

    };

    function Card({ title, value, color }) {

        return (
            <div
                className={`${color} text-white rounded-2xl shadow-lg p-5`}
            >

                <div className="text-sm opacity-90">
                    {title}
                </div>

                <div className="text-4xl font-bold mt-3">
                    {value}
                </div>

            </div>
        );
    }

    return (

        <AppLayout>

            {/* HEADER */}

            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-2xl shadow-xl p-6 text-white">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-3xl font-bold">

                            Selamat Datang, {user.name}

                        </h1>

                        <p className="opacity-90">

                            {user.role}

                        </p>

                        <p className="opacity-70">

                            Smart Bag Manufacturing ERP

                        </p>

                    </div>

                    <div className="text-right">

                        <h2 className="text-4xl font-black">

                            NEATS ERP

                        </h2>

                        <p>

                            {new Date().toLocaleDateString("id-ID")}

                        </p>

                    </div>

                </div>

            </div>

            {/* KPI */}

            <div className="grid grid-cols-5 gap-5 mt-6">

                <Card
                    title="Total Produksi"
                    value={totalProduction}
                    color="bg-blue-600"
                />

                <Card
                    title="Total Material"
                    value={totalMaterial}
                    color="bg-purple-500"
                />

                <Card
                    title="Production"
                    value={productionRunning}
                    color="bg-green-500"
                />

                <Card
                    title="Pending"
                    value={productionPending}
                    color="bg-yellow-500"
                />

                <Card
                    title="Finished"
                    value={productionFinished}
                    color="bg-red-500"
                />

            </div>

            {/* Chart */}
            {/* Chart + Activity */}

            <div className="grid grid-cols-3 gap-6 mt-6">

                {/* Grafik Produksi */}

                <div className="col-span-2 bg-white rounded-2xl shadow-lg p-5">

                    <div className="flex justify-between items-center mb-4">

                        <h2 className="text-lg font-bold">
                            📈 Grafik Progress Produksi
                        </h2>

                        <span className="text-sm text-gray-500">
                            Realtime
                        </span>

                    </div>

                    <ProductionChart chartData={chartData} />

                </div>

                {/* Live Activity */}

                <div className="bg-white rounded-2xl shadow-lg p-5">

                    <h2 className="text-lg font-bold mb-5">

                        ⚡ Live Activity

                    </h2>

                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">

                        {activities.length === 0 ? (

                            <div className="text-center text-gray-400 py-10">

                                Belum ada aktivitas.

                            </div>

                        ) : (

                            activities.map((item) => (

                                <div

                                    key={item.id}

                                    className={`
                            ${getCardColor(item.action)}
                            border
                            rounded-2xl
                            shadow-sm
                            hover:shadow-lg
                            hover:-translate-y-1
                            transition-all
                            duration-300
                            p-4
                        `}

                                >

                                    <div className="flex justify-between items-center mb-3">

                                        <span

                                            className={`
                                    ${getBadgeColor(item.action)}
                                    text-white
                                    text-xs
                                    font-bold
                                    px-3
                                    py-1
                                    rounded-full
                                `}

                                        >

                                            {item.action}

                                        </span>

                                        <span className="text-xs text-gray-400">

                                            {new Date(item.created_at).toLocaleTimeString(
                                                "id-ID",
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )}

                                        </span>

                                    </div>

                                    <div className="text-sm font-semibold text-gray-800">

                                        {getIcon(item.module)} {item.description}

                                    </div>

                                    <div className="border-t my-3"></div>

                                    <div className="flex justify-between text-xs text-gray-500">

                                        <span>

                                            👤 {item.user?.name ?? "-"}

                                        </span>

                                        <span>

                                            {item.module}

                                        </span>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>
            {/* Produksi Terbaru */}

            <div className="grid grid-cols-3 gap-6 mt-6">

                {/* Produksi Terbaru */}

                <div className="col-span-2 bg-white rounded-2xl shadow-lg p-5">

                    <h2 className="text-lg font-bold mb-4">

                        🏭 Produksi Terbaru

                    </h2>

                    <table className="w-full text-sm">

                        <thead>

                            <tr className="border-b bg-gray-100">

                                <th className="p-3 text-left">SPK</th>

                                <th className="p-3 text-left">Product</th>

                                <th className="p-3 text-center">Qty</th>

                                <th className="p-3 text-center">Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {latestProductions.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center py-8 text-gray-400"
                                    >

                                        Belum ada data produksi.

                                    </td>

                                </tr>

                            ) : (

                                latestProductions.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        <td className="p-3 font-semibold">

                                            {item.nomor_spk}

                                        </td>

                                        <td className="p-3">

                                            {item.product?.nama}

                                        </td>

                                        <td className="p-3 text-center">

                                            {item.qty}

                                        </td>

                                        <td className="p-3 text-center">

                                            <span
                                                className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        text-white
                                        text-xs
                                        font-bold
                                        ${item.status === "Finished"
                                                        ? "bg-red-500"
                                                        : item.status === "Running"
                                                            ? "bg-green-500"
                                                            : "bg-yellow-500"
                                                    }
                                    `}
                                            >

                                                {item.status}

                                            </span>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

                {/* Flow + Realtime */}

                <div className="space-y-6">

                    <div className="bg-white rounded-2xl shadow-lg p-5">

                        <h2 className="text-lg font-bold mb-4">

                            🔄 Flow Produksi

                        </h2>

                        <FlowChart />

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5">

                        <h2 className="text-lg font-bold mb-4">

                            📡 Realtime Status

                        </h2>

                        <RealtimeStatus />

                    </div>

                </div>

            </div>

            {toast && (
                <div className="fixed top-20 right-6 z-50 w-96 bg-white border border-blue-200 shadow-2xl rounded-xl p-4">

                    <div className="font-bold text-blue-700 mb-1">
                        {toast.title}
                    </div>

                    <div className="text-gray-700 text-sm">
                        {toast.message}
                    </div>

                </div>
            )}

        </AppLayout>
    );
}
