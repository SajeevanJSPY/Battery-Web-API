// Battery Status API

const batteryElement = document.getElementById('battery');
const batteryPercentage = document.getElementById('batteryPercentage');
const chargingTime = document.getElementById('chargingTime');
const dischargingTime = document.getElementById('dischargingTime');

try {
    navigator.getBattery()
    .then(battery => {
        // Default Values
        batteryLevel(battery.level)
        batteryCharging(battery.charging)
        batteryChargingTime(battery.chargingTime)
        batteryDischargingTime(battery.dischargingTime)
        console.log(battery.chargingTime)
        console.log(battery.dischargingTime)

        // Listening To Events
        battery.addEventListener('levelchange', e => {
            batteryLevel(battery.level)
        })
        battery.addEventListener('chargingchange', e => {
            batteryCharging(battery.charging)
        })
        battery.addEventListener('chargingtimechange', e => {
            batteryChargingTime(battery.chargingTime)
        })
        battery.addEventListener('dischargingtimechange', e => {
            batteryDischargingTime(battery.chargingTime)
        })

    })
    .catch(err => {
        throw new Error("Some Error Happened by Battery API", err)
    })

    function batteryLevel(level) {
        batteryPercentage.textContent = `${Math.round(level * 100)}%`
        batteryElement.style.width = `${Math.round(level * 100)}%`
    }

    function batteryCharging(charging) {
        if(charging) {
            batteryElement.style.backgroundColor = 'white'
        } else {
            batteryElement.style.backgroundColor = 'rgb(45, 243, 42)'
        }
    }

    function batteryChargingTime(time) {
        chargingTime.innerHTML = `Charging Time: ${time}`
    }

    function batteryDischargingTime(time) {
        dischargingTime.innerHTML = `Discharging Time: ${time}`
    }

} catch (e) {
    console.log(e)
}


// If the Promise Rejection UnHandled By Promise Chain
window.addEventListener('unhandledrejection', (e) => {
    console.log("Some Rejections are Not Handled By the Promise Chaining")
})