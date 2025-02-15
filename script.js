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
      startTime: 202412081430,
      endTime: 202502281730,
      properties: ["./image/bahrain.png","37.5%","-24%","630%","140%","./image/bahrainflag.png","62.2%","145%","26 - 28 Feb","    D1 D2 D3","Bahrain"]
    },
    {
      name: "Australia",
      startTime: 202502281730,
      endTime: 202503160530,
      properties: ["./image/australia.png","37.5%","-24%","640%","140%","./image/australiaflag.png","60%","145%","14 - 16 March","P1 P2 P3 Q R","Australia"]
    },
    {
      name: "China",
      startTime: 202503160530,
      endTime: 202503230830,
      properties: ["./image/china.png","39.5%","-20%","610%","175%","./image/chinaflag.png","61.5%","170%","21 - 23 March","P1 SQ S Q R","China"]
    },
    {
      name: "Japan",
      startTime: 202503230830,
      endTime: 202504060730,
      properties: ["./image/japan.png","39%","-24%","620%","140%","./image/japanflag.png","62%","145%","04 - 06 April","P1 P2 P3 Q R","Japan"]
    },
    {
      name: "Bahrain",
      startTime: 202504060730,
      endTime: 202504131730,
      properties: ["./image/bahrain.png","37.5%","-24%","630%","140%","./image/bahrainflag.png","62.5%","145%","11 - 13 April","P1 P2 P3 Q R","Bahrain"]
    },
    {
      name: "Saudi Arabia",
      startTime: 202504131730,
      endTime: 202504201930,
      properties: ["./image/saudi.png","39%","-24%","690%","140%","./image/saudiflag.png","61%","145%","18 - 20 April","P1 P2 P3 Q R","Saudi Arabia"]
    },
    {
      name: "Miami",
      startTime: 202504201930,
      endTime: 202505042230,
      properties: ["./image/miami.png","38.5%","-24%","625%","140%","./image/usaflag.png","62.8%","145%","02 - 04 May","P1 SQ S Q R","Miami"]
    },
    {
      name: "Imola",
      startTime: 202505042230,
      endTime: 202505181530,
      properties: ["./image/imola.png","37.5%","-24%","615%","140%","./image/italyflag.png","63%","145%","16 - 18 May","P1 P2 P3 Q R","Imola"]
    },
    {
      name: "Monaco",
      startTime: 202505181530,
      endTime: 202505251530,
      properties: ["./image/monaco.png","37.5%","-24%","630%","140%","./image/monacoflag.png","61.8%","145%","23 - 25 May","P1 P2 P3 Q R","Monaco"]
    },
    {
      name: "Spain",
      startTime: 202505251530,
      endTime: 202506011530,
      properties: ["./image/spain.png","39.3%","-32%","623%","80%","./image/spainflag.png","58%","115%","30 - 01 May/June","P1 P2 P3 Q R","Spain"]
    },
    {
      name: "Canada",
      startTime: 202506011530,
      endTime: 202506152030,
      properties: ["./image/canada.png","37.5%","-24%","630%","140%","./image/canadaflag.png","61.45%","145%","13 - 15 June","P1 P2 P3 Q R","Canada"]
    },
    {
      name: "Austria",
      startTime: 202506152030,
      endTime: 202506291530,
      properties: ["./image/rotated-austria.png","37.5%","-20%","620%","160%","./image/austriaflag.png","62.5%","165%","27 - 29 June","P1 P2 P3 Q R","Austria"]
    },
    {
      name: "Britain",
      startTime: 202506291530,
      endTime: 202507061630,
      properties: ["./image/britain.png","36%","-15.5%","606%","205%","./image/britainflag.png","60.5%","225%","04 - 06 July","P1 P2 P3 Q R","Britain"]
    },
    {
      name: "Belgium",
      startTime: 202507061630,
      endTime: 202507271530,
      properties: ["./image/belgium.png","37.5%","-18%","630%","185%","./image/belgiumflag.png","61.9%","190%","25 - 27 July","P1 SQ S Q R","Belgium"]
    },
    {
      name: "Hungary",
      startTime: 202507271530,
      endTime: 202508031530,
      properties: ["./image/hungary.png","37.8%","-21%","640%","162%","./image/hungaryflag.png","63%","160%","01 - 03 Aug","P1 P2 P3 Q R","Hungary"]
    },
    {
      name: "Netherlands",
      startTime: 202508031530,
      endTime: 202508311530,
      properties: ["./image/netherlands.png","37%","-15%","670%","205%","./image/netherlandsflag.png","63%","195%","29 - 31 Aug","P1 P2 P3 Q R","Netherlands"]
    },
    {
      name: "Italy",
      startTime: 202508311530,
      endTime: 202509071530,
      properties: ["./image/monza.png","39.5%","-23.9%","607%","140%","./image/italyflag.png","63.7%","145%","05 - 07 Sep","P1 P2 P3 Q R","Italy"]
    },
    {
      name: "Azerbaijan",
      startTime: 202509071530,
      endTime: 202509211330,
      properties: ["./image/azerbaijan.png","38.8%","-20%","675%","168%","./image/azerbaijanflag.png","66%","173%","19 - 21 Sep","P1 P2 P3 Q R","Azerbaijan"]
    },
    {
      name: "Singapore",
      startTime: 202509211330,
      endTime: 202510051440,
      properties: ["./image/singapore.png","37.3%","-21%","666%","164%","./image/singaporeflag.png","63%","160%","03 - 05 Oct","P1 P2 P3 Q R","Singapore"]
    },
    {
      name: "United States",
      startTime: 202510051440,
      endTime: 202510192130,
      properties: ["./image/cota.png","37.5%","-16%","690%","205%","./image/usaflag.png","62%","185%","19 - 19 Oct","P1 SQ S Q R","United States"]
    },
    {
      name: "Mexico",
      startTime: 202510192130,
      endTime: 202510262130,
      properties: ["./image/mexico.png","38.1%","-24%","633%","140%","./image/mexicoflag.png","63.5%","145%","24 - 26 Oct","P1 P2 P3 Q R","Mexico"]
    },
    {
      name: "Brazil",
      startTime: 202510262130,
      endTime: 202511091830,
      properties: ["./image/brazil.png","38%","-21%","608%","155%","./image/brazilflag.png","62.5%","155%","07 - 09 Nov","P1 SQ S Q R","Brazil"]
    },
    {
      name: "Las Vegas",
      startTime: 202511091830,
      endTime: 202511230530,
      properties: ["./image/lasvegas.png","37.5%","-22%","660%","154%","./image/usaflag.png","63.6%","160%","21 - 23 Nov","P1 P2 P3 Q R","Las Vegas"]
    },
    {
      name: "Qatar",
      startTime: 202511230530,
      endTime: 202511301730,
      properties: ["./image/qatar.png","38%","-22%","615%","158%","./image/qatarflag.png","62.7%","160%","28 - 30 Nov","P1 SQ S Q R","Qatar"]
    },
    {
      name: "Abu Dhabi",
      startTime: 202511301730,
      endTime: 202512071440,
      properties: ["./image/abudhabi.png","35.8%","-24%","650%","140%","./image/abudhabiflag.png","60.4%","145%","05 - 07 Dec","P1 P2 P3 Q R","Abu Dhabi"]
    },
    {
      name: "Next Year's Pre-Season Testing",
      startTime: 202512071440,
      endTime: 202599999999,
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
