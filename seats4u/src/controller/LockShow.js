import { post } from "./API.js";

export function lockShow() {
    // potentially modify the model
    let showIDField = document.getElementById("data-show-id");

    // prepare payload for the post
    let data = {'showID': showIDField.value};
    
    console.log(data);

    const handler = (json) => {
        console.log(json);
    }

    post('/consumer/lockShow', data, handler);
}