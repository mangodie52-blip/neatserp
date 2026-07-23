import {
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
} from "chart.js";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
);


export default function PerformanceMonitor({
    performance
}) {


    const data = {

        labels: performance.time,

        datasets:[

            {
                label:"Production Load",

                data:performance.production,

                borderWidth:3,

                tension:0.4,

                fill:true,

            },


            {
                label:"Material Flow",

                data:performance.material,

                borderWidth:3,

                tension:0.4,

                fill:false,

            }

        ]

    };


    const options={

        responsive:true,

        animation:{
            duration:500
        },


        plugins:{
            legend:{
                position:"bottom"
            }
        },


        scales:{

            y:{
                min:0,
                max:100
            }

        }

    };


    return (

        <div className="
            bg-white
            rounded-2xl
            shadow-lg
            p-5
        ">


            <div className="flex justify-between mb-4">

                <h2 className="font-bold text-lg">

                    ⚡ Performance Monitor

                </h2>


                <span className="text-green-600 font-bold">

                    LIVE

                </span>

            </div>


            <Line
                data={data}
                options={options}
            />


        </div>

    );

}