import { post } from "./API"

export function createVenue(requestRedraw) {
    // potentially modify the model
    let nameField = document.getElementById("venue-name")
    let sideLeftRowsField = document.getElementById("venue-sideLeft-rows")
    let sideLeftColsField = document.getElementById("venue-sideLeft-columns")
    let centerRowsField = document.getElementById("venue-center-rows")
    let centerColsField = document.getElementById("venue-center-columns")
    let sideRightRowsField = document.getElementById("venue-sideRight-rows")
    let sideRightColsField = document.getElementById("venue-sideRight-columns")
    let password = document.getElementById("venue-password")

    // prepare payload for the post
    let data = {'name': nameField.value, 
                'sideLeftRows': sideLeftRowsField.value,
                'sideLeftColumns': sideLeftColsField.value,
                'centerRows': centerRowsField.value,
                'centerColumns': centerColsField.value,
                'sideRightRows': sideRightRowsField.value,
                'sideRightColomns': sideRightColsField.value,
                'password': password.value}
    
    console.log(data)

    const handler = (json) => {
        console.log(json)
        // clear inputs
        //nameField.value = ''
        //valueField.value = ''
        requestRedraw()
    }

    post('/venue/createVenue', data, handler)
}