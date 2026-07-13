import AppLayout from "@/Layouts/AppLayout";
import ProductionChart from "@/Components/Charts/ProductionChart";
import FlowChart from "@/Components/Charts/FlowChart";
import RealtimeStatus from "@/Components/RealtimeStatus";

export default function Dashboard({
    user,
    totalMaterial,
    totalProduction,
    productionRunning,
    productionFinished,
    productionPending,
    latestProductions,
    chartData,
}) {

    return (

        <AppLayout>

            {/* Header */}

            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl shadow-lg p-6 text-white">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Selamat Datang, {user.name}
                        </h1>

                        <p>{user.role}</p>

                        <p className="opacity-80">
                            Smart Bag Manufacturing ERP
                        </p>

                    </div>

                    <div className="text-right">

                        <h2 className="text-3xl font-bold">
                            NEATS ERP
                        </h2>

                        <p>
                            {new Date().toLocaleDateString("id-ID")}
                        </p>

                    </div>

                </div>

            </div>


            {/* Statistik */}

            <div className="grid grid-cols-5 gap-5 mt-6">

                <Card
                    title="Total Produksi"
                    value={totalProduction}
                    color="bg-blue-600"
                />

                <Card
                    title="Total Material"
                    value={totalMaterial}
                    color="bg-green-600"
                />

                <Card
                    title="Production"
                    value={productionRunning}
                    color="bg-yellow-500"
                />

                <Card
                    title="Pending"
                    value={productionPending}
                    color="bg-orange-500"
                />

                <Card
                    title="Finished"
                    value={productionFinished}
                    color="bg-red-500"
                />

            </div>


            {/* Chart */}
            <div className="grid grid-cols-12 gap-1 mt-2">

                {/* Grafik Produksi */}
                <div className="col-span-8 bg-white rounded-xl shadow p-4">

                    <h2 className="text-lg font-bold mb-4">
                        Grafik Produksi
                    </h2>

                    <ProductionChart chartData={chartData} />

                </div>

                {/* Flow Produksi */}
                <div className="col-span-4 bg-white rounded-xl shadow p-6">

                    <FlowChart
                        productionRunning={productionRunning}
                        productionFinished={productionFinished}
                        productionPending={productionPending}
                    />

                </div>

            </div>

            {/* Produksi Terbaru */}
            <div className="bg-white rounded-xl shadow mt-6 p-5">

                <h2 className="text-xl font-bold mb-4">
                    Produksi Terbaru
                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left p-2">SPK</th>
                            <th className="text-left p-2">PO</th>
                            <th className="text-left p-2">Model</th>
                            <th className="text-left p-2">Line</th>
                            <th className="text-left p-2">Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {latestProductions.map((item) => (

                            <tr key={item.id} className="border-b hover:bg-gray-50">

                                <td className="p-2">{item.spk_no}</td>
                                <td className="p-2">{item.po_id}</td>
                                <td className="p-2">{item.model}</td>
                                <td className="p-2">{item.line}</td>

                                <td className="p-2">

                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-sm ${item.status === "Finished"
                                            ? "bg-green-500"
                                            : item.status === "Production"
                                                ? "bg-blue-500"
                                                : "bg-yellow-500"
                                            }`}
                                    >
                                        {item.status}
                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <div className="mt-6">
                <RealtimeStatus />
            </div>

        </AppLayout>

    );



    function Card({ title, value, color }) {

        return (

            <div className={`${color} rounded-xl p-5 text-white shadow`}>

                <h3 className="text-lg">

                    {title}

                </h3>

                <p className="text-4xl font-bold mt-3">

                    {value}

                </p>

            </div>

        );
    }
}