import { get } from "./API"

export function listShows() {
    // this sends the ACTUAL POST and retrieves the answer.
    get('/consumer/listShows')
        .then(function (response) {

            let str = ''
            for (let s of response.shows)
                str += "Show: " + s.name + " | Venue Name: " + s.venueName + " | " + s.month + "/" + s.day + "/" + s.year + " | " + (Math.floor(s.hour / 10) == 0 ? "0" : "") + s.hour + ":" + (Math.floor(s.hour / 10) == 0 ? "0" : "") + s.minute + '<br>';

            // insert HTML in the <div> with 
            // constant-list
            let cd = document.getElementById('show-list')
            cd.innerHTML = str

        })
        .catch(function (error) {
            // not much to do
            console.log(error)
        })
    }
