from flask import Flask, render_template, jsonify, request
import serial
import threading
import time


app = Flask(__name__)


SERIAL_PORT = "COM4"
BAUD_RATE = 9600


arduino = None


try:
    arduino = serial.Serial(
        SERIAL_PORT,
        BAUD_RATE,
        timeout=1
    )

    time.sleep(2)

    print("Arduino Connected")


except Exception as e:
    print("Arduino Error:", e)



data = {
    "soil":0,
    "pump":"OFF",
    "arduino":False
}



lock = threading.Lock()



def read_serial():

    while True:

        if arduino:

            try:

                if arduino.in_waiting:

                    line = arduino.readline().decode().strip()

                    print(line)


                    with lock:

                        data["arduino"] = True


                        if line.startswith("Soil:"):

                            value = line.split(":")[1]
                            data["soil"] = int(value)



                        elif line == "PUMP_ON":

                            data["pump"]="ON"



                        elif line == "PUMP_OFF":

                            data["pump"]="OFF"


            except Exception as e:
                print(e)


        time.sleep(0.1)





@app.route("/")
def index():

    return render_template("index.html")





@app.route("/api/data")
def api():

    return jsonify(data)





@app.route("/pump", methods=["POST"])
def pump():

    state = request.json["state"]

    print("BUTTON:",state)



    if arduino:


        if state=="ON":

            arduino.write(b'1')


        elif state=="OFF":

            arduino.write(b'0')



    return jsonify({
        "success":True,
        "pump":state
    })






if __name__=="__main__":

    threading.Thread(
        target=read_serial,
        daemon=True
    ).start()


    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True,
        use_reloader=False
    )