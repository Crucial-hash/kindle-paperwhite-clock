function displayTime(){
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();

    if (hrs > 12){
        hrs = hrs -12
    }
    
    if (hrs > 12){
        hrs = hrs -12
    }

    if (hrs < 10){
        hrs = "0" + hrs
    }

    if (min < 10){
        min = "0" + min
    }

    document.getElementById('hours').innerHTML = hrs;
    document.getElementById('minutes').innerHTML = min;
}

setInterval(displayTime, 10);
var width = screen.width;
var height = screen.height;

console.log(moment().format('ddd D MMM'));