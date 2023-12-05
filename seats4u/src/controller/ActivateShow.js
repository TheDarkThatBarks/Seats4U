import { post } from "./API.js";

export function activateShow(requestRedraw) {
    // potentially modify the model
    let idField = document.getElementById("show-ID");
    let nameField = document.getElementById("data-venue-name");
    let passwordField = document.getElementById("data-venue-password");

    // prepare payload for the post
    let data = {'showID': idField.value,
                'venueName': nameField.value,
                'venuePassword': passwordField.value};
    
    console.log(data);

    const handler = (json) => {
        console.log(json);
        idField.value = '';
        requestRedraw();
    }

    post('/venue/activateShow', data, handler);
}