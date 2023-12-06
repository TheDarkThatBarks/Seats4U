import { post } from "./API.js";

export function listSeats() {
    // potentially modify the model
    let showIDField = document.getElementById("data-show-id");

    // prepare payload for the post
    let data = {'showID': showIDField.value};

    const handler = (json) => {
        console.log(json);
        document.getElementById("data-seats-list").value = JSON.stringify(json.seats);
        let str = "";
        for (let s of json.seats)
            str += "Seat ID: " + s.seatID + " | Section: " + (s.section === "sideLeft" ? "Left" : (s.section === "center" ? "Center" : "Right")) + " | Row: " + s.r + " | Column: " + s.c + '<br>';

        document.getElementById("seats-list").innerHTML = str;
    }

    post('/consumer/listSeats', data, handler);
}