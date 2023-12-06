import { post } from "./API.js"

export function buySeat(requestRedraw) {
    // potentially modify the model
    const seatIDField = document.getElementById("seat-id");
    const showIDField = document.getElementById("data-show-id");

    // prepare payload for the post
    let data = {'showID': showIDField.value,
                'seatID': seatIDField.value}
    
    console.log(data);

    const handler = (json) => {
        console.log(json);
        // clear inputs
        seatIDField.value = '';
        if(json.statusCode === 200) {
            document.getElementById("db-response").value = "SUCCESS!";
        } else {
            document.getElementById("db-response").value = "Failure...";
        }
        requestRedraw();
    }

    post('/consumer/purchaseSeat', data, handler);
};