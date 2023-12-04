import { post } from "./API.js";

export function deleteShowAdmin(requestRedraw) {
    // potentially modify the model
    let passwordField = document.getElementById("data-admin-password");
    let showIDField = document.getElementById("show-ID");

    // prepare payload for the post
    let data = {'adminPassword': passwordField.value,
                'showID': showIDField.value};
    
    console.log(data)

    const handler = (json) => {
        console.log(json)
        requestRedraw();
    }

    post('/admin/deleteShow', data, handler);
}