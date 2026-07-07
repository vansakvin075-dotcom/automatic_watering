// =========================================
// ELEMENTS
// =========================================

const soilValue = document.getElementById("soilValue");
const pumpStatus = document.getElementById("pumpStatus");
const statusValue = document.getElementById("statusValue");
const modeValue = document.getElementById("modeValue");
const percent = document.getElementById("percent");
const circle = document.querySelector(".circle");
const arduinoStatus = document.getElementById("arduinoStatus");

const onBtn = document.getElementById("onBtn");
const offBtn = document.getElementById("offBtn");


// =========================================
// CLOCK
// =========================================

function updateClock() {

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleString();
}

setInterval(updateClock, 1000);
updateClock();


// =========================================
// UPDATE GAUGE
// =========================================

function updateGauge(value){

    let moisture = Math.round((1023 - value) / 1023 * 100);

    if(moisture < 0) moisture = 0;
    if(moisture > 100) moisture = 100;

    percent.innerHTML = moisture + "%";

    let degree = moisture * 3.6;

    circle.style.background =
        `conic-gradient(
            #22c55e ${degree}deg,
            #334155 ${degree}deg
        )`;

}


// =========================================
// LOAD DATA
// =========================================

async function loadData(){

    try{

        const response = await fetch("/api/data");

        const data = await response.json();

        soilValue.innerHTML = data.soil;

        pumpStatus.innerHTML = data.pump;

        statusValue.innerHTML = data.status;

        modeValue.innerHTML = data.mode;

        updateGauge(data.soil);

        updateChart(data.soil);


        // Arduino Status

        if(data.arduino){

            arduinoStatus.innerHTML="🟢 ONLINE";

            arduinoStatus.className="online";

        }
        else{

            arduinoStatus.innerHTML="🔴 OFFLINE";

            arduinoStatus.className="offline";

        }


        // Pump Color

        if(data.pump==="ON"){

            pumpStatus.style.color="#22c55e";

        }
        else{

            pumpStatus.style.color="#ef4444";

        }

    }

    catch(error){

        console.log(error);

    }

}

setInterval(loadData,1000);

loadData();


// =========================================
// MANUAL PUMP ON
// =========================================

onBtn.onclick = () => {

    fetch("/pump", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            state:"ON"
        })
    });

}

offBtn.onclick = () => {

    fetch("/pump", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            state:"OFF"
        })
    });

}