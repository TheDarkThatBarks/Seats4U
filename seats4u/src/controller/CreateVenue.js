import { post } from "./API.js";

export function createVenue(requestRedraw) {
    // potentially modify the model
    let nameField = document.getElementById("venue-name");
    let sideLeftRowsField = document.getElementById("venue-sideLeft-rows");
    let sideLeftColsField = document.getElementById("venue-sideLeft-columns");
    let centerRowsField = document.getElementById("venue-center-rows");
    let centerColsField = document.getElementById("venue-center-columns");
    let sideRightRowsField = document.getElementById("venue-sideRight-rows");
    let sideRightColsField = document.getElementById("venue-sideRight-columns");
    let passwordField = document.getElementById("venue-password");

    // prepare payload for the post
    let data = {'venueName': nameField.value, 
                'sideLeftRows': sideLeftRowsField.value,
                'sideLeftColumns': sideLeftColsField.value,
                'centerRows': centerRowsField.value,
                'centerColumns': centerColsField.value,
                'sideRightRows': sideRightRowsField.value,
                'sideRightColumns': sideRightColsField.value,
                'password': passwordField.value};
    
    console.log(data)

    const handler = (json) => {
        console.log(json)
        // clear inputs
        nameField.value = '';
        sideLeftRowsField.value = '';
        sideLeftColsField.value = '';
        centerRowsField.value = '';
        centerColsField.value = '';
        sideRightRowsField.value = '';
        sideRightColsField.value = '';
        passwordField.value = '';

        if(json.statusCode === 200) {
            document.getElementById("db-response").value = "SUCCESS!";
        } else {
            document.getElementById("db-response").value = "Failure...";
        }
        requestRedraw();
    }

    post('/venue/createVenue', data, handler);
}