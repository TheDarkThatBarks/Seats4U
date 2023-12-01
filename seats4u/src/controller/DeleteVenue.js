import { post } from "./API.js";

export function deleteVenue(requestRedraw) {
    // potentially modify the model
    let nameField = document.getElementById("venue-name");
    let passwordField = document.getElementById("venue-password");

    // prepare payload for the post
    let data = {'venueName': nameField.value,
                'venuePassword': passwordField.value};
    
    console.log(data)

    const handler = (json) => {
        console.log(json)
        // clear inputs
        nameField.value = '';
        passwordField.value = '';

        if(json.statusCode === 200) {
            document.getElementById("db-response").value = "SUCCESS!";
        } else {
            document.getElementById("db-response").value = "Failure...";
        }
        requestRedraw();
    }

    post('/venue/deleteVenue', data, handler);
}

export function deleteVenueAdmin(name, password) {
    // prepare payload for the post
    let data = {'venueName': name,
                'venuePassword': password};
    
    console.log(data)

    const handler = (json) => {
        console.log(json)
    }

    post('/venue/deleteVenue', data, handler);
}