import { post } from "./API.js";

export function lockShow() {
    // potentially modify the model
    let showIDField = document.getElementById("data-show-id");
    let lockedUntilField = document.getElementById("data-date");

    // prepare payload for the post
    let data = {'showID': showIDField.value,
                'lockedUntil': lockedUntilField.value};
    
    console.log(data);

    const handler = (json) => {
        console.log("Lock Show Response: " + json);
    }

    post('/consumer/lockShow', data, handler);
}