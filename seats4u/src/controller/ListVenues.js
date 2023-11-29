import { post } from "./API.js";

export function listVenues() {
    // this sends the ACTUAL POST and retrieves the answer.

    let adminPass = document.getElementById("admin-pass");

    let data = {'adminPassword': adminPass.value}

    const handler = (json) => {
        console.log(json)

        if(json.statusCode === 200) {
            document.getElementById("db-response").value = "SUCCESS!";
        } else {
            document.getElementById("db-response").value = "Failure...";
        }

        let str = '';
            for (let v of json.venues) {
                str += "Venue Name: " + v.name + " | Password: " + v.password + '<br>';
            }

            // insert HTML in the <div> with 
            // constant-list
            let cd = document.getElementById('venue-list')
            cd.innerHTML = str
    }

    post('/admin/listVenues', data, handler)
        /*.then(function (response) {
            console.log(response.venues)
            let str = '';
            for (let v of response.venues) {
                str += v.name + '<br>';
            }

            // insert HTML in the <div> with 
            // constant-list
            let cd = document.getElementById('venue-list')
            cd.innerHTML = str

        }).catch(function (error) {
            // not much to do
            console.log(error)
        })*/
}