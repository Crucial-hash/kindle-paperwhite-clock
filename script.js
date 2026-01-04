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

  const currentYear = new Date().getFullYear();
  const currentDateTime = parseInt(currentYear.toString() + tracktime);

  const raceSchedule = [
    {
      name: "Bahrain Pre-Season Testing",
      startTime: 202512071440, // Previous year's testing end time
      endTime: 202602132359, // Testing end time unknown so have set to 23:59
      properties: ["./image/bahrain.png","37.5%","-24%","630%","140%","./image/bahrainflag.png","62.2%","145%","11 - 13 Feb","    D1 D2 D3","Bahrain"]
    },
    {
      name: "Bahrain Pre-Season Testing",
      startTime: 202602132359, // There are two testing sessions before the season starts
      endTime: 202602202359, // Testing end time unknown so have set to 23:59
      properties: ["./image/bahrain.png","37.5%","-24%","630%","140%","./image/bahrainflag.png","62.2%","145%","18 - 20 Feb","    D1 D2 D3","Bahrain"]
    },
    {
      name: "Australia",
      startTime: 202602202359,
      endTime: 202603080530,
      properties: ["./image/australia.png","37.5%","-24%","640%","140%","./image/australiaflag.png","59%","145%","06 - 08 March","P1 P2 P3 Q R","Australia"]
    },
    {
      name: "China",
      startTime: 202603080530,
      endTime: 202603150830,
      properties: ["./image/china.png","39.5%","-20%","610%","175%","./image/chinaflag.png","61.5%","170%","13 - 15 March","P1 SQ S Q R","China"]
    },
    {
      name: "Japan",
      startTime: 202603150830,
      endTime: 202603290730,
      properties: ["./image/japan.png","39%","-24%","620%","140%","./image/japanflag.png","61.3%","145%","27 - 29 March","P1 P2 P3 Q R","Japan"]
    },
    {
      name: "Bahrain",
      startTime: 202603290730,
      endTime: 202604121730,
      properties: ["./image/bahrain.png","37.5%","-24%","630%","140%","./image/bahrainflag.png","62%","145%","10 - 12 April","P1 P2 P3 Q R","Bahrain"]
    },
    {
      name: "Saudi Arabia",
      startTime: 202604121730,
      endTime: 202604191930,
      properties: ["./image/saudi.png","39%","-24%","690%","140%","./image/saudiflag.png","62.5%","145%","17 - 19 April","P1 P2 P3 Q R","Saudi Arabia"]
    },
    {
      name: "Miami",
      startTime: 202604191930,
      endTime: 202605032230,
      properties: ["./image/miami.png","38.5%","-24%","625%","140%","./image/usaflag.png","63%","145%","01 - 03 May","P1 SQ S Q R","Miami"]
    },
    {
      name: "Canada",
      startTime: 202605032230,
      endTime: 202605242230,
      properties: ["./image/canada.png","37.5%","-24%","630%","140%","./image/canadaflag.png","61.45%","145%","22 - 24 May","P1 SQ S Q R","Canada"] 
    },
    {
      name: "Monaco",
      startTime: 202605242230,
      endTime: 202606071530,
      properties: ["./image/monaco.png","37.5%","-24%","630%","140%","./image/monacoflag.png","61.2%","145%","05 - 07 June","P1 P2 P3 Q R","Monaco"]
    },
    {
      name: "Barcelona",
      startTime: 202606071530,
      endTime: 202606141530,
      properties: ["./image/barcelona.png","41.2%","-32%","665%","80%","./image/spainflag.png","64.5%","115%","12 - 14 June","P1 P2 P3 Q R","Barcelona"]
    },
    {
      name: "Austria",
      startTime: 202606141530,
      endTime: 202606281530,
      properties: ["./image/rotated-austria.png","37.5%","-20%","620%","160%","./image/austriaflag.png","62.5%","165%","26 - 28 June","P1 P2 P3 Q R","Austria"]
    },
    {
      name: "Great Britain",
      startTime: 202606281530,
      endTime: 202607051630,
      properties: ["./image/britain.png","36%","-15.5%","672%","205.5%","./image/britainflag.png","62%","225%","03 - 05 July","P1 SQ S Q R","Great Britain"]
    },
    {
      name: "Belgium",
      startTime: 202607051630,
      endTime: 202607191530,
      properties: ["./image/belgium.png","37.5%","-18%","630%","185%","./image/belgiumflag.png","62.2%","190%","17 - 19 July","P1 P2 P3 Q R","Belgium"]
    },
    {
      name: "Hungary",
      startTime: 202607191530,
      endTime: 202607261530,
      properties: ["./image/hungary.png","37.8%","-21%","640%","162%","./image/hungaryflag.png","63%","160%","24 - 26 July","P1 P2 P3 Q R","Hungary"]
    },
    {
      name: "Netherlands",
      startTime: 202607261530,
      endTime: 202608231530,
      properties: ["./image/netherlands.png","37%","-15%","670%","205%","./image/netherlandsflag.png","61.5%","195%","21 - 23 Aug","P1 SQ S Q R","Netherlands"]
    },
    {
      name: "Italy",
      startTime: 202608231530,
      endTime: 202609061530,
      properties: ["./image/monza.png","39.5%","-23.9%","607%","140%","./image/italyflag.png","63.7%","145%","04 - 06 Sep","P1 P2 P3 Q R","Italy"]
    },
    {
      name: "Spain",
      startTime: 202609061530,
      endTime: 202609131530,
      properties: ["./image/spain.png","37.3%","-22%","610%","154%","./image/spainflag.png","63.5%","164%","11 - 13 Sep","P1 P2 P3 Q R","Spain"]
    },
    {
      name: "Azerbaijan",
      startTime: 202609131530,
      endTime: 202609261330,
      properties: ["./image/azerbaijan.png","38.8%","-20%","675%","168%","./image/azerbaijanflag.png","66%","173%","24 - 26 Sep","P1 P2 P3 Q R","Azerbaijan"]
    },
    {
      name: "Singapore",
      startTime: 202609261330,
      endTime: 202610111430,
      properties: ["./image/singapore.png","37.3%","-21%","666%","164%","./image/singaporeflag.png","63%","160%","09 - 11 Oct","P1 SQ S Q R","Singapore"]
    },
    {
      name: "United States",
      startTime: 202610111430,
      endTime: 202610252130,
      properties: ["./image/cota.png","37.5%","-16%","690%","205%","./image/usaflag.png","62.3%","185%","23 - 25 Oct","P1 P2 P3 Q R","United States"]
    },
    {
      name: "Mexico",
      startTime: 202610252130,
      endTime: 202611012130,
      properties: ["./image/mexico.png","38.1%","-24%","633%","140%","./image/mexicoflag.png","57.3%","145%","30 - 01 Oct/Nov","P1 P2 P3 Q R","Mexico"]
    },
    {
      name: "Brazil",
      startTime: 202611012130,
      endTime: 202611081830,
      properties: ["./image/brazil.png","38%","-21%","608%","155%","./image/brazilflag.png","62.3%","155%","06 - 08 Nov","P1 P2 P3 Q R","Brazil"]
    },
    {
      name: "Las Vegas",
      startTime: 202611081830,
      endTime: 202611220530,
      properties: ["./image/lasvegas.png","37.5%","-22%","660%","154%","./image/usaflag.png","63.6%","160%","20 - 22 Nov","P1 P2 P3 Q R","Las Vegas"]
    },
    {
      name: "Qatar",
      startTime: 202611220530,
      endTime: 202611291730,
      properties: ["./image/qatar.png","38%","-22%","615%","158%","./image/qatarflag.png","62.7%","160%","27 - 29 Nov","P1 P2 P3 Q R","Qatar"]
    },
    {
      name: "Abu Dhabi",
      startTime: 202611291730,
      endTime: 202612061430,
      properties: ["./image/abudhabi.png","35.8%","-24%","650%","140%","./image/abudhabiflag.png","60.4%","145%","04 - 06 Dec","P1 P2 P3 Q R","Abu Dhabi"]
    },
    {
      name: "Next Year's Pre-Season Testing",
      startTime: 202612061430,
      endTime: 202799999999,
      properties: ["./image/bahrain.png","37.5%","-22%","630%","150%","./image/bahrainflag.png","71%","155%","TBA","    D1 D2 D3","Bahrain"]
    }
  ];

  for (const event of raceSchedule) {
    if (currentDateTime >= event.startTime && currentDateTime < event.endTime) {
      setProperties(...event.properties);
      break;
    }
  }

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
