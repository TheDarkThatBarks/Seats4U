import { post } from "./API.js"

export function buySeat(requestRedraw) {
    // potentially modify the model
    let seatID = document.getElementById("seat-id")

    // prepare payload for the post
    let data = {'seatID': seatID.value}
    
    console.log(data)

    const handler = (json) => {
        console.log(json)
        // clear inputs
        seatID.value = ''
        if(json.statusCode === 200) {
            document.getElementById("db-response").value = "SUCCESS!";
        } else {
            document.getElementById("db-response").value = "Failure...";
        }
        requestRedraw();
    }

    post('/consumer/purchaseSeat', data, handler);
}