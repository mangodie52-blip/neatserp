import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function FlowChart() {

    const data = {

        labels: [

            "Gudang",

            "Produksi",

            "QC",

            "Reject",

        ],

        datasets: [

            {

                data: [

                    820,

                    640,

                    120,

                    18,

                ],

                backgroundColor: [

                    "#2563eb",

                    "#22c55e",

                    "#facc15",

                    "#ef4444",

                ],

                borderWidth: 2,

                borderColor: "#fff",

                hoverOffset: 15,

            },

        ],

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        cutout: "65%",

        animation: {

            duration: 1500,

        },

        plugins: {

            legend: {

                position: "top",

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

            padding: 5,

        },

    };

    return (

        <div className="bg-white rounded-xl shadow-md p-5">

            <h3 className="text-lg font-bold mb-2">

                Flow Barang

            </h3>

            <div className="h-72">

                <Doughnut

                    data={data}

                    options={options}

                />

            </div>

        </div>

    );

}