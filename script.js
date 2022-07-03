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

        if(!chargingState) {
            switch (newLevel) {
                case 20:  
                    if(!window.confirm("Your Battery Percentage is 20%, Do You Want To Continue?")) {
                        window.close()
                    }
                    break
                case (newLevel <= 20):
                    batteryElement.style.backgroundColor = 'orange'
                    break
                case 10:
                    if(!window.confirm("Your Battery Percentage is 10%, Do You Want To Continue?")) {
                        window.close()
                    }
                    break
                case (newLevel <= 10):
                    batteryElement.style.backgroundColor = 'red'
                    break
                default:
                   batteryElement.style.backgroundColor = 'rgb(45, 243, 42)'
                   break
            }
        } else {
            batteryElement.style.backgroundColor = 'white'
        }

        batteryPercentage.textContent = `${newLevel}%`
        batteryElement.style.width = `${newLevel}%`
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

} catch (e) {
    console.log(e)
}


// If the Promise Rejection UnHandled By Promise Chain
window.addEventListener('unhandledrejection', (e) => {
    console.log("Some Rejections are Not Handled By the Promise Chaining")
})