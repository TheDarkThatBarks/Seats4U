import { post } from "./API.js"

export function createShow(requestRedraw) {
    // potentially modify the model
    let nameField = document.getElementById("show-name")
    let priceField = document.getElementById("show-price")
    let monthField = document.getElementById("show-month")
    let dayField = document.getElementById("show-day")
    let yearField = document.getElementById("show-year")
    let hourField = document.getElementById("show-hour")
    let minuteField = document.getElementById("show-minute")

    // prepare payload for the post
    let data = {'showName': nameField.value, 
                'price': priceField.value,
                'month': monthField.value,
                'day': dayField.value,
                'year': yearField.value,
                'hour': hourField.value,
                'minute': minuteField.value}
    
    console.log(data)

    const handler = (json) => {
        console.log(json)
        // clear inputs
        //nameField.value = ''
        //valueField.value = ''
        requestRedraw()
    }

    post('/show/createShow', data, handler);
}