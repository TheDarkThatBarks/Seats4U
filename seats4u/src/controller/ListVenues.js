import { post } from "./API.js";

export function listVenues() {
    // this sends the ACTUAL POST and retrieves the answer.

    let adminPass = document.getElementById("admin-pass");

    let data = { 'adminPassword': adminPass.value }

    const handler = (json) => {
        console.log(json)

        if (json.statusCode === 200) {
            document.getElementById("db-response").value = "SUCCESS!";
            let cd = document.getElementById('venue-list');
            cd.innerHTML = "";
            for (let v of json.venues) {
                cd.innerHTML += `Name: `
                cd.innerHTML += `${v.name}`
                cd.innerHTML += ` | Password: `
                cd.innerHTML += `${v.password}`
                cd.innerHTML += `<br>`
            }
        } else {
            document.getElementById("db-response").value = "Failure...";
        }
    }

    post('/admin/listVenues', data, handler)
}