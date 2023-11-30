import { post } from "./API.js"

export function createShow(requestRedraw) {
    // potentially modify the model
    let venueName = document.getElementById("venue-name")
    let nameField = document.getElementById("show-name")
    let priceField = document.getElementById("show-price")
    let monthField = document.getElementById("show-month")
    let dayField = document.getElementById("show-day")
    let yearField = document.getElementById("show-year")
    let hourField = document.getElementById("show-hour")
    let minuteField = document.getElementById("show-minute")
    let venuePassword = document.getElementById("venue-password")

    // prepare payload for the post
    let data = {'venueName': venueName.value,
                'showName': nameField.value, 
                'startingPrice': priceField.value,
                'month': monthField.value,
                'day': dayField.value,
                'year': yearField.value,
                'hour': hourField.value,
                'minute': minuteField.value,
                'venuePassword': venuePassword.value}
    
    console.log(data)

    const handler = (json) => {
        console.log(json)
        // clear inputs
        //nameField.value = ''
        //valueField.value = ''
        if(json.statusCode === 200) {
            document.getElementById("db-response").value = "SUCCESS!";
        } else {
            document.getElementById("db-response").value = "Failure...";
        }
        requestRedraw();
    }

    post('/venue/createShow', data, handler);
}