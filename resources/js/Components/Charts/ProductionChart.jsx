import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ProductionChart({ chartData = [] }) {

    if (chartData.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="text-lg font-bold mb-3">
                    Progress Produksi
                </h3>

                <p className="text-gray-500">
                    Belum ada data produksi.
                </p>
            </div>
        );
    }

    const data = {
        labels: chartData.map(item => item.spk),

        datasets: [
            {
                label: "Progress Produksi (%)",

                data: chartData.map(item => item.progress),

                backgroundColor: chartData.map(item =>
                    item.status === "Finished"
                        ? "#22c55e"
                        : item.status === "Production"
                        ? "#2563eb"
                        : "#f59e0b"
                ),

                borderRadius: 3,
                borderSkipped: false,
                maxBarThickness: 45,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        animation: {
            duration: 1500,
        },

        plugins: {
            legend: {
                display: false,
            },

            tooltip: {
                callbacks: {
                    label: function (context) {
                        return "Progress : " + context.raw + "%";
                    },
                },
            },
        },

        scales: {
            y: {
                beginAtZero: true,
                max: 100,

                ticks: {
                    callback: (value) => value + "%",
                },
            },
        },
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-5">

            <h3 className="text-lg font-bold mb-3">
                Progress Produksi
            </h3>

            <div className="h-80">
                <Bar
                    data={data}
                    options={options}
                />
            </div>

        </div>
    );
}