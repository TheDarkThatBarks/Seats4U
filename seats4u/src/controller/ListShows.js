import { get } from "./API"
import { unlockShow2 } from '../controller/UnlockShow';

export function listShows() {
    // this sends the ACTUAL POST and retrieves the answer.
    get('/consumer/listShows')
        .then(function (response) {
            document.getElementById("data-show-list").value = JSON.stringify(response.shows);
            const searchStr = document.getElementById("data-search").value;
            if (searchStr !== "")
                response.shows = response.shows.filter((show) => {return show.name.toLowerCase().includes(searchStr.toLowerCase())});
            
            for (let s of response.shows) {
                let lockedUntil = s.lockedUntil;
                if(s.lockedUntil) {
                    if(Date.now() > lockedUntil) {
                        unlockShow2(s.showID);
                    }
                }

                let str = '';
                str += addPadding(s.year) + '-';
                str += addPadding(s.month) + '-';
                str += addPadding(s.day) + '-T';
                str += addPadding(s.hour) + ':';
                str += addPadding(s.minute) + ':00';
                let expireDate = new Date(str);
                //console.log('Date String: ' + str)
                if(Date.now() > expireDate.getTime())
                    console.log(expireDate.toString());
            }

            let str = ''
            for (let s of response.shows) {
                let lockedUntilDate = new Date(s.lockedUntil);
                let lockedUntilString = lockedUntilDate[Symbol.toPrimitive]('string');
                str += "Show ID: " + s.showID + " | Show: " + s.name + " | Venue Name: " + s.venueName + " | " + s.month + "/" + s.day + "/" + s.year + " | " + (Math.floor(s.hour / 10) === 0 ? "0" : "") + s.hour + ":" + (Math.floor(s.minute / 10) === 0 ? "0" : "") + s.minute + " | Locked: " + (s.locked == 0 ? "False" : lockedUntilString) + " | Seats Available: " + (s.seatsTotal == s.seatsSold ? "SOLD OUT" : s.seatsTotal - s.seatsSold) + '<br>';
            }

            // insert HTML in the <div> with 
            // constant-list
            let cd = document.getElementById('show-list')
            cd.innerHTML = str

        })
        .catch(function (error) {
            // not much to do
            console.log(error)
        })
    }

    const addPadding = (num) => {
        if(num < 10)
            return '0' + num;
        else
            return num;
    };

    const getTimeLeft = (date) => {
        let timeLeft = date - Date.now();
        let seconds = Math.floor((timeLeft / 1000) % 60);
        let minutes = Math.floor(timeLeft / (1000 * 60));
        let str = '';
        str += minutes + ":";
        if(seconds > 0) {
            if(seconds < 10)
                str += "0" + seconds;
            else
                str += seconds;
        } else {
            str += "00"
        }
        return str;
    };