import { post } from "./API.js";

export function listVenues() {
    // this sends the ACTUAL POST and retrieves the answer.

    let adminPass = document.getElementById("admin-pass");

    let data = { 'adminPassword': adminPass.value }

    const handler = (json) => {
        console.log(json)

        if (json.statusCode === 200) {
            document.getElementById("db-response").value = "SUCCESS!";
            let str = '';
            for (let v of json.venues)
                str += v.name + '<br>';

            // insert HTML in the <div> with 
            // constant-list
            let cd = document.getElementById('venue-list')
            cd.innerHTML = str
        } else {
            document.getElementById("db-response").value = "Failure...";
        }
    }

    post('/admin/listVenues', data, handler)
}