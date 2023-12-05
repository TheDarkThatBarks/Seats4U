import { get } from "./API"

export function listSeats(showID) {
    // this sends the ACTUAL POST and retrieves the answer.
    get('/consumer/listSeats')
        .then(function (response) {
            if (searchStr !== "")
                response.seats = response.seats.filter((show) => {return show.name.toLowerCase().includes(searchStr.toLowerCase())});
            
            let str = ''
            for (let s of response.shows)
                str += "Seat: " + s.seatID + " | Venue Name: " + s.venueName + " | " + s.month + "/" + s.day + "/" + s.year + " | " + (Math.floor(s.hour / 10) === 0 ? "0" : "") + s.hour + ":" + (Math.floor(s.minute / 10) === 0 ? "0" : "") + s.minute + '<br>';

            // insert HTML in the <div> with 
            // constant-list
            let cd = document.getElementById('seat-list')
            cd.innerHTML = str

        })
        .catch(function (error) {
            // not much to do
            console.log(error)
        })
    }