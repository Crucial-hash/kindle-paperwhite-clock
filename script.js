function displayTime(){
  var dateTime = new Date();
  var hrs = dateTime.getHours();
  var min = dateTime.getMinutes();

  function isDaylightSavingTime() {
    const today = new Date();
    const month = today.getMonth();
    const lastSundayInMarch = new Date(today.getFullYear(), 2, 31 - new Date(today.getFullYear(), 2, 31).getDay());
    const lastSundayInOctober = new Date(today.getFullYear(), 9, 31 - new Date(today.getFullYear(), 9, 31).getDay());
    const dstResult = (today >= lastSundayInMarch && today < lastSundayInOctober) ? 1 : 0;
    if (dstResult == 1) {
      hrs += 1;
    }
    return dstResult;
  }

  isDaylightSavingTime();

  if (hrs == 0){
      hrs = hrs +12
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
document.documentElement.style.cursor = 'none';

var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);
var trackurl = rootStyles.getPropertyValue('--trackurl');
var flagurl = rootStyles.getPropertyValue('--flagurl');
var tracknameallign = rootStyles.getPropertyValue('--tracknameallign');
var flagallign = rootStyles.getPropertyValue('--flagallign');
var raceweekend = rootStyles.getPropertyValue('--raceweekend');

function setProperties(trackImage,trackNameAllignX,trackNameAllignY,flagAllignX,flagAllignY,flagImage,raceWeekendX,raceWeekendY,raceWeekendTime,session,trackName){

root.style.setProperty('--trackurl', 'url(' + trackImage + ')')
root.style.setProperty('--tracknameallign', 'translate(' + trackNameAllignX + ',' + trackNameAllignY + ')')
root.style.setProperty('--flagallign', 'translate(' + flagAllignX + ',' + flagAllignY + ')')
root.style.setProperty('--flagurl', 'url(' + flagImage + ')')
root.style.setProperty('--raceweekend', 'translate(' + raceWeekendX + ',' + raceWeekendY + ')')
document.getElementById('raceweekendtime').innerHTML = raceWeekendTime
document.getElementById('session').innerHTML = session;
document.getElementById('trackname').innerHTML = trackName;
}

const button = document.getElementById("prayerbutton");
const prayer = document.getElementById("prayertext");
const sun = document.getElementById("suntext");
let state = 0;

button.addEventListener("click", function() {
  if (state === 0) {
    state = 1;
    minuteChanged()
    prayer.classList.add("white");
    sun.classList.remove("white");
  } else if (state === 1) {
    state = 2;
    minuteChanged()
    sun.classList.add("white");
    prayer.classList.remove("white");
  } else {
    state = 0;
    minuteChanged()
    prayer.classList.remove("white");
    sun.classList.remove("white");
    document.body.style.backgroundColor = '#ffffff';
    setTimeout(function() {
      document.body.style.backgroundColor = '#000000';
    }, 1000);
  }
});

minuteChanged()

function minuteChanged() {

  if (state === 1) {
    prayer.style.transform = "translate(3%, 2260%)";
  } else {
    prayer.style.transform = "none";
  }

  if (state === 2) {
    sun.style.transform = "translate(1%, 2260%)";
  } else {
    sun.style.transform = "none";
  }

  var xhrName = new XMLHttpRequest();
  xhrName.open("GET", "./name.txt", false);
  xhrName.send();

  if(xhrName.readyState === 4 && xhrName.status === 200) {
    var prayerName = xhrName.responseText;
  }

  var xhrHours = new XMLHttpRequest();
  xhrHours.open("GET", "./hours.txt", false);
  xhrHours.send();

  if(xhrHours.readyState === 4 && xhrHours.status === 200) {
    var prayerHours = parseInt(xhrHours.responseText);
  }

  var xhrMinutes = new XMLHttpRequest();
  xhrMinutes.open("GET", "./minutes.txt", false);
  xhrMinutes.send();

  if(xhrMinutes.readyState === 4 && xhrMinutes.status === 200) {
    var prayerMinutes = parseInt(xhrMinutes.responseText);
  }

  var xhrSunState = new XMLHttpRequest();
  xhrSunState.open("GET", "./sunstate.txt", false);
  xhrSunState.send();

  if(xhrSunState.readyState === 4 && xhrSunState.status === 200) {
    var sunState = xhrSunState.responseText;
  }

  var xhrSunHours = new XMLHttpRequest();
  xhrSunHours.open("GET", "./sunhours.txt", false);
  xhrSunHours.send();

  if(xhrSunHours.readyState === 4 && xhrSunHours.status === 200) {
    var sunHours = parseInt(xhrSunHours.responseText);
  }

  var xhrSunMinutes = new XMLHttpRequest();
  xhrSunMinutes.open("GET", "./sunminutes.txt", false);
  xhrSunMinutes.send();

  if(xhrSunMinutes.readyState === 4 && xhrSunMinutes.status === 200) {
    var sunMinutes = parseInt(xhrSunMinutes.responseText);
  }

  document.getElementById('prayertext').innerHTML = prayerName + " In " + 
      (prayerHours === 1 ? prayerHours + " Hour, " : prayerHours + " Hours, ") + 
      (prayerMinutes === 1 ? prayerMinutes + " Minute" : prayerMinutes + " Minutes").replace("1 Minutes", "1 Minute");

  document.getElementById('suntext').innerHTML = sunState +  " In " + 
      (sunHours === 1 ? sunHours + " Hour, " : sunHours + " Hours, ") +
      (sunMinutes === 1 ? sunMinutes + " Minute" : sunMinutes + " Minutes").replace("1 Minutes", "1 Minute");

  function isDaylightSavingTime() {
      const today = new Date();
      const month = today.getMonth();
      const lastSundayInMarch = new Date(today.getFullYear(), 2, 31 - new Date(today.getFullYear(), 2, 31).getDay());
      const lastSundayInOctober = new Date(today.getFullYear(), 9, 31 - new Date(today.getFullYear(), 9, 31).getDay());
      const dstResult = (today >= lastSundayInMarch && today < lastSundayInOctober) ? 1 : 0;
      if (dstResult === 1) {
        return true;
      }
      return false;
    }

    var tracktime;
    var hrs24;
    if (isDaylightSavingTime()) {
      tracktime = moment().add(1, 'hour').format('MMDDHHmm');
      hrs24 = moment().add(1, 'hour').format('HHmm');
    } else {
      tracktime = moment().format('MMDDHHmm');
      hrs24 = moment().format('HHmm');
    }

    if (
      hrs24 == '0645' ||
      hrs24 == '1000' ||
      hrs24 == '1300' ||
      hrs24 == '1800' ||
      hrs24 == '2200'
    ) {
      document.body.style.backgroundColor = '#ffffff';
      setTimeout(function() {
          document.body.style.backgroundColor = '#000000';
      }, 1000);
    } else {
      document.body.style.backgroundColor = '#000000';
    }

  //BAHRAIN

  if (tracktime < '03021630') { setProperties("./image/bahrain.png","37.5%","-24%","630%","140%","./image/bahrainflag.png","54.1%","145%","29 - 02 Feb/March","P1 P2 P3 Q R","Bahrain") }

  //BAHRAIN TO SAUDI

  if (tracktime >= '03021630') { setProperties("./image/saudi.png","38%","-24%","692%","140%","./image/saudiflag.png","60.5%","145%","07 - 09 March","P1 P2 P3 Q R","Saudi Arabia") }

  //SAUDI TO AUSTRALIA

  if (tracktime >= '03091830') { setProperties("./image/australia.png","37.5%","-24%","640%","140%","./image/australiaflag.png","60%","145%","22 - 24 March","P1 P2 P3 Q R","Australia") }

  //AUSTRALIA TO JAPAN

  if (tracktime >= '03240530') { setProperties("./image/japan.png","39%","-24%","620%","140%","./image/japanflag.png","62.5%","145%","05 - 07 April","P1 P2 P3 Q R","Japan") }

  //JAPAN TO CHINA

  if (tracktime >= '04070730') { setProperties("./image/china.png","37.5%","-20%","620%","175%","./image/chinaflag.png","63.5%","170%","19 - 21 April","P1 Q SS S R","China") }

  //CHINA TO MIAMI

  if (tracktime >= '04210930') { setProperties("./image/miami.png","37.5%","-24%","630%","140%","./image/usaflag.png","62.3%","145%","03 - 05 May","P1 Q SS S R","Miami") }

  //MIAMI TO IMOLA

  if (tracktime >= '05052230') { setProperties("./image/imola.png","37.5%","-24%","615%","140%","./image/italyflag.png","63%","145%","17 - 19 May","P1 P2 P3 Q R","Imola") }

  //IMOLA TO MONACO

  if (tracktime >= '05191530') { setProperties("./image/monaco.png","37.5%","-24%","630%","140%","./image/monacoflag.png","62.6%","145%","24 - 26 May","P1 P2 P3 Q R","Monaco") }

  //MONACO TO CANADA

  if (tracktime >= '05261530') { setProperties("./image/canada.png","37.5%","-24%","630%","140%","./image/canadaflag.png","61%","145%","07 - 09 June","P1 P2 P3 Q R","Canada") }

  //CANADA TO SPAIN

  if (tracktime >= '06092030') { setProperties("./image/spain.png","37.5%","-32%","630%","80%","./image/spainflag.png","63.4%","120%","21 - 23 June","P1 P2 P3 Q R","Spain") }

  //SPAIN TO AUSTRIA

  if (tracktime >= '06231530') { setProperties("./image/austria.png","43%","-20%","670%","160%","./image/austriaflag.png","67%","165%","28 - 30 June","P1 Q SS S R","Austria") }

  //AUSTRIA TO BRITAIN

  if (tracktime >= '06301530') { setProperties("./image/britain.png","39%","-15%","630%","200%","./image/britainflag.png","63.7%","220%","05 - 07 July","P1 P2 P3 Q R","Britain") }

  //BRITAIN TO HUNGARY

  if (tracktime >= '07071630') { setProperties("./image/hungary.png","40%","-21%","660%","159%","./image/hungaryflag.png","66%","155%","19 - 21 July","P1 P2 P3 Q R","Hungary") }

  //HUNGARY TO BELGIUM

  if (tracktime >= '07211530') { setProperties("./image/belgium.png","37.5%","-24%","630%","140%","./image/belgiumflag.png","62.7%","145%","26 - 28 July","P1 P2 P3 Q R","Belgium") }

  //BELGIUM TO NETHERLANDS

  if (tracktime >= '07281530') { setProperties("./image/netherlands.png","41%","-17%","700%","195%","./image/netherlandsflag.png","64.7%","185%","23 - 25 Aug","P1 P2 P3 Q R","Netherlands") }

  //NETHERLANDS TO MONZA

  if (tracktime >= '08251530') { setProperties("./image/monza.png","41%","-24%","620%","140%","./image/italyflag.png","59.9%","145%","30 - 01 Aug/Sep","P1 P2 P3 Q R","Italy") }

  //MONZA TO AZERBAIJAN

  if (tracktime >= '09011530') { setProperties("./image/azerbaijan.png","38.5%","-20%","680%","161%","./image/azerbaijanflag.png","64%","173%","13 - 15 Sep","P1 P2 P3 Q R","Azerbaijan") }

  //AZERBAIJAN TO SINGAPORE

  if (tracktime >= '09151330') { setProperties("./image/singapore.png","37.3%","-24%","666%","140%","./image/singaporeflag.png","63%","145%","20 - 22 Sep","P1 P2 P3 Q R","Singapore") }

  //SINGAPORE TO UNITED STATES

  if (tracktime >= '09221430') { setProperties("./image/cota.png","37.5%","-16%","690%","205%","./image/usaflag.png","62%","185%","18 - 20 Oct","P1 SQ S Q R","United States") }

  //UNITED STATES TO MEXICO

  if (tracktime >= '10202130') { setProperties("./image/mexico.png","38.1%","-24%","633%","140%","./image/mexicoflag.png","63.5%","145%","25 - 27 Oct","P1 P2 P3 Q R","Mexico") }

  //MEXICO TO BRAZIL

  if (tracktime >= '10272130') { setProperties("./image/brazil.png","35.8%","-24%","600%","140%","./image/brazilflag.png","61%","145%","01 - 03 Nov","P1 SQ S Q R","Brazil") }

  //BRAZIL TO LAS VEGAS

  if (tracktime >= '11031830') { setProperties("./image/lasvegas.png","37.5%","-22%","660%","154%","./image/usaflag.png","63.6%","160%","22 - 23 Nov","P1 P2 P3 Q R","Las Vegas") }

  //LAS VEGAS TO QATAR

  if (tracktime >= '11240730') { setProperties("./image/qatar.png","39%","-24%","635%","140%","./image/qatarflag.png","55%","145%","29 - 01 Nov/Dec","P1 SQ S Q R","Qatar") }

  //QATAR TO ABU DHABI

  if (tracktime >= '12011730') { setProperties("./image/abudhabi.png","37.5%","-24%","670%","140%","./image/abudhabiflag.png","62%","145%","06 - 08 Dec","P1 P2 P3 Q R","Abu Dhabi") }

  //ABU DHABI TO AUSTRALIA (NEXT YEAR)

  if (tracktime >= '12081430') { setProperties("./image/australia.png","37.5%","-24%","640%","140%","./image/australiaflag.png","60%","145%","14 - 16 March","P1 P2 P3 Q R","Australia") }

  function boldString(str, find){
    var re = new RegExp(find, 'g');
    return str.replace(re, '<b>'+find+'</b>');
  }
  var oldText = document.getElementById("session").innerHTML;
  var result = boldString(oldText, "R");
  document.getElementById("session").innerHTML = result;
}

function getCurrentMinute() {
    return new Date().getMinutes();
}

let currentMinute = getCurrentMinute();
setInterval(function() {
    const newMinute = getCurrentMinute();
    if (newMinute !== currentMinute) {
        minuteChanged();
        currentMinute = newMinute;
    }
}, 60000);
