import { get } from "./API.js";

export function getVenues() {
    // this sends the ACTUAL POST and retrieves the answer.
    get('/venue/listVenues')
        .then(function (response) {
            let str = '';
            for (let c of response.constants) {
                str += c.name + '=' + c.value + '<br>';
            }

            // insert HTML in the <div> with 
            // constant-list
            let cd = document.getElementById('venue-list')
            cd.innerHTML = str

        }).catch(function (error) {
            // not much to do
            console.log(error)
        })
}