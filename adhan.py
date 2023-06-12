from bs4 import BeautifulSoup
import requests
from datetime import datetime, time


while True:


    website = 'https://www.halaltrip.com/prayertimes/muslim-salat-prayer-times/?name=Slough&f=Slough%2C+UK&l=Slough&s=&c=United+Kingdom&lat=51.4989355&lng=-0.5612772&no_days=7&cal_method=3&asr_method=2&higher_lat=2&cruising_height=11800' #Change the URL to the placve you live
    result = requests.get(website)
    content = result.text


    soup = BeautifulSoup(content, 'lxml')


    prayerTime = soup.find('ul', class_='tm-horizontal-listitem clearfix highlighted').get_text()


    lines = prayerTime.split('\n')[1:-1]
    lines = prayerTime.split('\n')[1:-1]
    lines = prayerTime.split('\n')[1:-1]
    del lines[0]
    lines = [line.replace(':00', ':0') for line in lines]


    fajrHour, fajrMin = map(int, lines[0].split(':'))
    sunriseHour, sunriseMin = map(int, lines[1].replace('00', '0').split(':'))
    zuhrHour, zuhrMin = map(int, lines[2].replace('00', '0').split(':'))
    asrHour, asrMin = map(int, lines[3].split(':'))
    maghribHour, maghribMin = map(int, lines[4].split(':'))
    ishaHour, ishaMin = map(int, lines[5].split(':'))


    lines = [line.lstrip('0') if line[0] == '0' else line for line in lines]
    lines = [line[:-2] + line[-1] if line[-2] == '0' else line for line in lines]


    fajrHour, fajrMin = map(int, lines[0].split(':'))
    sunriseHour, sunriseMin = map(int, lines[1].split(':'))
    zuhrHour, zuhrMin = map(int, lines[2].split(':'))
    asrHour, asrMin = map(int, lines[3].split(':'))
    maghribHour, maghribMin = map(int, lines[4].split(':'))
    ishaHour, ishaMin = map(int, lines[5].split(':'))


    current_time = datetime.now().time()


    fajr_time = time(fajrHour, fajrMin)
    sunrise_time = time(sunriseHour, sunriseMin)
    zuhr_time = time(zuhrHour, zuhrMin)
    asr_time = time(asrHour, asrMin)
    maghrib_time = time(maghribHour, maghribMin)
    isha_time = time(ishaHour, ishaMin)


    if current_time < fajr_time:
        next_prayer = "Fajr"
        next_prayer_hour = fajrHour
        next_prayer_min = fajrMin
    elif current_time < zuhr_time:
        next_prayer = "Zuhr"
        next_prayer_hour = zuhrHour
        next_prayer_min = zuhrMin
    elif current_time < asr_time:
        next_prayer = "Asr"
        next_prayer_hour = asrHour
        next_prayer_min = asrMin
    elif current_time < maghrib_time:
        next_prayer = "Maghrib"
        next_prayer_hour = maghribHour
        next_prayer_min = maghribMin
    elif current_time < isha_time:
        next_prayer = "Isha"
        next_prayer_hour = ishaHour
        next_prayer_min = ishaMin
    else:
        next_prayer = "Fajr"
        next_prayer_hour = fajrHour
        next_prayer_min = fajrMin


    diff = datetime.combine(datetime.today(), time(next_prayer_hour, next_prayer_min)) - datetime.combine(datetime.today(), current_time)
    diff_seconds = diff.total_seconds()
    diff_hour = int(diff_seconds // 3600)
    diff_minute = int((diff_seconds % 3600) // 60)


    if diff_hour < 0:
        diff_hour += 24
        diff_minute *= 1


    with open('name.txt', 'w') as file:
        file.write(f'{next_prayer}\n')
        
    with open('hours.txt', 'w') as file:
        file.write(f'{diff_hour}\n')
        
    with open('minutes.txt', 'w') as file:
        file.write(f'{diff_minute}\n')


    if current_time < sunrise_time:
        sun_state = "Sunrise"
        sun_state_hour = sunriseHour
        sun_state_min = sunriseMin
    elif current_time >= sunrise_time and current_time < maghrib_time:
        sun_state = "Sunset"
        sun_state_hour = maghribHour
        sun_state_min = maghribMin
    else:
        sun_state = "Sunrise"
        sun_state_hour = sunriseHour
        sun_state_min = sunriseMin


    diff2 = datetime.combine(datetime.today(), time(sun_state_hour, sun_state_min)) - datetime.combine(datetime.today(), current_time)
    diff_seconds2 = diff2.total_seconds()
    diff_hour2 = int(diff_seconds2 // 3600)
    diff_minute2 = int((diff_seconds2 % 3600) // 60)


    if diff_hour2 < 0:
        diff_hour2 += 24
        diff_minute2 *= 1


    with open('sunstate.txt', 'w') as file:
        file.write(f'{sun_state}\n')
        
    with open('sunhours.txt', 'w') as file:
        file.write(f'{diff_hour2}\n')
        
    with open('sunminutes.txt', 'w') as file:
        file.write(f'{diff_minute2}\n')