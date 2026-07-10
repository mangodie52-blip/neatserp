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

export default function ProductionChart() {

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],

        datasets: [
            {
                label: "Jumlah Produksi",

                data: [1200, 1800, 1500, 2200, 2600, 2400, 2540],

                backgroundColor: [
                    "#2563eb",
                    "#16a34a",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#06b6d4",
                    "#ec4899",
                ],

                borderRadius: 8,
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

                position: "top",

                align: "start",

                labels: {
                    boxWidth: 18,
                    padding: 15,
                },

            },

            tooltip: {

                backgroundColor: "#1e293b",

                titleColor: "#fff",

                bodyColor: "#fff",

            },

        },

        layout: {

            padding: {

                top: 5,

                bottom: 5,

                left: 5,

                right: 5,

            },

        },

        scales: {

            x: {

                grid: {
                    display: false,
                },

                ticks: {
                    color: "#374151",
                },

            },

            y: {

                beginAtZero: true,

                ticks: {

                    stepSize: 500,

                    color: "#6b7280",

                },

                grid: {

                    color: "#e5e7eb",

                },

            },

        },

    };

    return (

        <div className="bg-white rounded-xl shadow-md p-5">

            <h3 className="text-lg font-bold mb-2">

                Grafik Produksi

            </h3>

            <div className="h-72">

                <Bar

                    data={data}

                    options={options}

                />

            </div>

        </div>

    );

}