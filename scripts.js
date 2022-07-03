// Battery Status API

const batteryElement = document.getElementById('battery');
const batteryPercentage = document.getElementById('batteryPercentage');
const chargingTime = document.getElementById('chargingTime');
const dischargingTime = document.getElementById('dischargingTime');

try {
    navigator.getBattery()
    .then(battery => {
        // Default Values
        batteryLevel(battery.level, battery.charging)
        batteryChargingTime(battery.chargingTime)
        batteryDischargingTime(battery.dischargingTime)

        // Listening To Events
        battery.addEventListener('levelchange', e => {
            batteryLevel(battery.level, battery.charging)
        })
        battery.addEventListener('chargingchange', e => {
            batteryCharging(battery.charging, battery.level)
            batteryLevel(battery.level, battery.charging)
        })
        battery.addEventListener('chargingtimechange', e => {
            batteryChargingTime(battery.chargingTime)
        })
        battery.addEventListener('dischargingtimechange', e => {
            batteryDischargingTime(battery.chargingTime)
        })

    })
    .catch(err => {
        throw new Error("Thrown an error by Battery API", err)
    })

    function batteryLevel(level, chargingState) {
        let newLevel = Math.round(level * 100)
        batteryPercentage.textContent = `${newLevel}%`
        batteryElement.style.width = `${newLevel}%`

        if(!chargingState) {
            if(newLevel === 20) {
                if(!alert(20)) {
                    window.close()
                }
                batteryElement.style.backgroundColor = 'orange'
            } else if(newLevel < 20) {
                batteryElement.style.backgroundColor = 'orange'
            } else if(newLevel === 10) {
                if(!alert(10)) {
                    window.close()
                }
                batteryElement.style.backgroundColor = 'red'
            } else if (newLevel < 10) {
                batteryElement.style.backgroundColor = 'red'
            } else {
                batteryElement.style.backgroundColor = 'rgb(45, 243, 42)'
            }

        } else {
            batteryElement.style.backgroundColor = 'white'
        }

    }

    function batteryCharging(chargingState, level) {
        let newLevel = level * 100
        if(newLevel === 10) {
        }else if((newLevel < 20) && !chargingState) {
            if(!alert(newLevel)) {
                window.close()
            }
        }
    }

    function batteryChargingTime(time) {
        if(time === Infinity || time === -Infinity) {
            chargingTime.innerHTML = `Charging Time: N/A`
        } else {
            chargingTime.innerHTML = `Charging Time: ${time}s`
        }
    }

    function batteryDischargingTime(time) {
        if(time === Infinity || time === -Infinity) {
            dischargingTime.innerHTML = `Discharging Time: N/A`
        } else {
            dischargingTime.innerHTML = `Discharging Time: ${time}s`
        }
    }

    function alert(level) {
        let value = window.confirm(`Your Battery Percentage is ${level}%, Do You Want To Continue?`)
        return value
    }


} catch (e) {
    console.log(e)
}


// If the Promise Rejection UnHandled By Promise Chain
window.addEventListener('unhandledrejection', (e) => {
    console.log("Some Rejections are Not Handled By the Promise Chaining")
})