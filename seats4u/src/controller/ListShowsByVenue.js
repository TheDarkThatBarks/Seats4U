import { post } from "./API.js";

export function listShowsByVenue() {
    // potentially modify the model
    let nameField = document.getElementById("data-venue-name");
    let passwordField = document.getElementById("data-venue-password");

    // prepare payload for the post
    let data = {'venueName': nameField.value,
                'venuePassword': passwordField.value};
    
    console.log(data)

    const handler = (json) => {
        console.log(json);
        let str = "";
            for (let s of json.shows)
            str += "Show ID: " + s.showID + " | Show: " + s.name + " | Venue Name: " + s.venueName + " | " + s.month + "/" + s.day + "/" + s.year + " | " + (Math.floor(s.hour / 10) === 0 ? "0" : "") + s.hour + ":" + (Math.floor(s.minute / 10) === 0 ? "0" : "") + s.minute + " | Active: " + (s.active ? "Yes" : "No") + " | Seats Sold: " + s.seatsSold + " | Seats Remaining: " + (s.seatsTotal - s.seatsSold) + " | Total Proceeds: $" + (s.seatsSold * s.startingPrice) + '<br>';

        document.getElementById("venue-show-list").innerHTML = str;
    }

    post('/venue/listShows', data, handler);
}