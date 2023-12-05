import { post } from "./API.js";

export function listSeats() {
    // potentially modify the model
    let showIDField = document.getElementById("data-show-id");

    // prepare payload for the post
    let data = {'showID': showIDField.value};

    const handler = (json) => {
        console.log(json);
        let str = "";
        for (let s of json.seats)
            str += "Seat ID: " + s.seatID + " | Row: " + s.r + " | Column: " + s.c + '<br>';

        document.getElementById("seats-list").innerHTML = str;
    }

    post('/consumer/listSeats', data, handler);
}