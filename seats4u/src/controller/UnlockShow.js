import { post } from "./API.js";

export function unlockShow() {
    // potentially modify the model
    let showIDField = document.getElementById("data-show-id");

    // prepare payload for the post
    let data = {'showID': showIDField.value};
    
    console.log(data);

    const handler = (json) => {
        console.log(json);
    }

    post('/consumer/unlockShow', data, handler);
}

export function unlockShow2(showID) {
    // prepare payload for the post
    let data = {'showID': showID};
    
    console.log(data);

    const handler = (json) => {
        console.log(json);
    }

    post('/consumer/unlockShow', data, handler);
}