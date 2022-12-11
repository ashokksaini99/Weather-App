const time = document.querySelector(".time");
const date = document.querySelector(".date");

let currTime = () => {
    let currDate = new Date();
    let localTime = currDate.toLocaleTimeString();
    time.innerHTML = localTime;
};

let currDay = () => {
    let day = new Date();
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    let today = day.toLocaleDateString('en-US', options);
    date.innerHTML = today;
};

currDay();
setInterval(currTime, 1000);