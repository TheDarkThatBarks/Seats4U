import { post } from "./API.js";

export function listSeats(sortByRow, price) {
    console.log(sortByRow);
    // potentially modify the model
    let showIDField = document.getElementById("data-show-id");

    // prepare payload for the post
    let data = {'showID': showIDField.value};

    const handler = (json) => {
        console.log(json);
        document.getElementById("data-seats-list").value = JSON.stringify(json.seats);
        if (sortByRow)
            json.seats.sort((a, b) => a.r - b.r);
        //const price = document.getElementById("data-show-price").value;
        let str = "";
        for (let s of json.seats)
            //str += "Seat ID: " + s.seatID + " | Section: " + (s.section === "sideLeft" ? "Left" : (s.section === "center" ? "Center" : "Right")) + " | Row: " + s.r + " | Column: " + s.c + '<br>';
            str += "Seat ID: " + s.seatID + " | Section: " + (s.section === "sideLeft" ? "Left" : (s.section === "center" ? "Center" : "Right")) + " | " + String.fromCharCode(s.r + 64) + s.c + " | Price: $" + price + '<br>';

        document.getElementById("seats-list").innerHTML = str;
    }

    post('/consumer/listSeats', data, handler);
}