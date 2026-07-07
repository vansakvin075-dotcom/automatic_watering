
const ctx = document.getElementById("chart").getContext("2d");

const labels = [];
const values = [];

const soilChart = new Chart(ctx, {

    type: "line",

    data: {

        labels: labels,

        datasets: [

            {

                label: "Soil Moisture",

                data: values,

                borderColor: "#22c55e",

                backgroundColor: "rgba(34,197,94,.2)",

                fill: true,

                tension: .4,

                borderWidth: 3,

                pointRadius: 3,

                pointBackgroundColor: "#22c55e"

            }

        ]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        animation: {

            duration: 500

        },

        plugins: {

            legend: {

                labels: {

                    color: "#ffffff"

                }

            }

        },

        scales: {

            x: {

                ticks: {

                    color: "#94a3b8"

                },

                grid: {

                    color: "rgba(255,255,255,.05)"

                }

            },

            y: {

                beginAtZero: true,

                max: 1023,

                ticks: {

                    color: "#94a3b8"

                },

                grid: {

                    color: "rgba(255,255,255,.05)"

                }

            }

        }

    }

});


// ======================================
// UPDATE CHART
// ======================================

function updateChart(value){

    const now = new Date();

    const time =

        now.getHours().toString().padStart(2,"0")

        + ":"

        +

        now.getMinutes().toString().padStart(2,"0")

        + ":"

        +

        now.getSeconds().toString().padStart(2,"0");


    labels.push(time);

    values.push(value);


    if(labels.length>20){

        labels.shift();

        values.shift();

    }

    soilChart.update();

}