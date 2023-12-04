import { post } from "./API.js";

export function deleteShowVM(requestRedraw) {
    // potentially modify the model
    let nameField = document.getElementById("data-venue-name");
    let passwordField = document.getElementById("data-venue-password");
    let showIDField = document.getElementById("show-ID");

    // prepare payload for the post
    let data = {'venueName': nameField.value,
                'venuePassword': passwordField.value,
                'showID': showIDField.value};
    
    console.log(data)

    const handler = (json) => {
        console.log(json)
        requestRedraw();
    }

    post('/venue/deleteShow', data, handler);
}