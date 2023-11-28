import { post } from "./API.js"

export function createShow(requestRedraw) {
    // potentially modify the model
    let nameField = document.getElementById("show-name")
    let priceField = document.getElementById("show-price")
    let dateField = document.getElementById("show-date")
    let timeField = document.getElementById("show-time")

    // prepare payload for the post
    let data = {'showName': nameField.value, 
                'price': priceField.value,
                'date': dateField.value,
                'time': timeField.value}
    
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