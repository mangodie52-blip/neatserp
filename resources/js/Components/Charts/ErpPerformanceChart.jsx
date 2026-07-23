import {
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";


ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);



export default function ErpPerformanceChart({
    performance
}) {


    const data = {


        labels: performance.labels,


        datasets: [


            {
                label:"Produksi",
                data:performance.production,
                tension:0.4,
                borderWidth:3,
            },


            {
                label:"Material Request",
                data:performance.material,
                tension:0.4,
                borderWidth:3,
            },


            {
                label:"Activity",
                data:performance.activity,
                tension:0.4,
                borderWidth:3,
            }


        ]

    };




    const options={


        responsive:true,


        plugins:{


            legend:{
                position:"bottom"
            }


        },


        scales:{


            y:{
                beginAtZero:true
            }


        }


    };



    return (

        <Line
            data={data}
            options={options}
        />

    );

}