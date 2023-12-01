import { post } from "./API.js";

export function activateShow(requestRedraw) {
    // potentially modify the model
    let nameField = document.getElementById("show-name");
    let passwordField = document.getElementById("venue-password");

    // prepare payload for the post
    let data = {'showName': nameField.value,
                'venuePassword': passwordField.value};
    
    console.log(data)

    const handler = (json) => {
        console.log(json)
        // clear inputs
        nameField.value = '';
        passwordField.value = '';

        if(json.statusCode === 200) {
            //document.getElementById("db-response").value = "SUCCESS!";
        } else {
            //document.getElementById("db-response").value = "Failure...";
        }
        requestRedraw();
    }

    post('/venue/activateShow', data, handler);
}