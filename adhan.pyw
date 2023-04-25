from bs4 import BeautifulSoup
import requests
from datetime import datetime, time


website = 'https://www.halaltrip.com/prayertimes/muslim-salat-prayer-times/?name=Slough&f=Slough%2C+UK&l=Slough&s=&c=United+Kingdom&lat=51.4989355&lng=-0.5612772&no_days=7&cal_method=3&asr_method=2&higher_lat=2&cruising_height=11800' #Change the URL to the placve you live
result = requests.get(website)
content = result.text


soup = BeautifulSoup(content, 'lxml')


prayerTime = soup.find('ul', class_='tm-horizontal-listitem clearfix highlighted').get_text()


print(prayerTime)


lines = prayerTime.split('\n')[1:-1]


lines = prayerTime.split('\n')[1:-1]

lines = prayerTime.split('\n')[1:-1]


del lines[0]
del lines[1]


lines = [line.replace(':00', ':0') for line in lines]


fajrHour, fajrMin = map(int, lines[0].split(':'))
zuhrHour, zuhrMin = map(int, lines[1].replace('00', '0').split(':'))
asrHour, asrMin = map(int, lines[2].split(':'))
maghribHour, maghribMin = map(int, lines[3].split(':'))
ishaHour, ishaMin = map(int, lines[4].split(':'))


lines = [line.lstrip('0') if line[0] == '0' else line for line in lines]


lines = [line[:-2] + line[-1] if line[-2] == '0' else line for line in lines]


fajrHour, fajrMin = map(int, lines[0].split(':'))
zuhrHour, zuhrMin = map(int, lines[1].split(':'))
asrHour, asrMin = map(int, lines[2].split(':'))
maghribHour, maghribMin = map(int, lines[3].split(':'))
ishaHour, ishaMin = map(int, lines[4].split(':'))

current_time = datetime.now().time()


fajr_time = time(fajrHour, fajrMin)
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


print(next_prayer, next_prayer_hour, next_prayer_min)


with open('name.txt', 'w') as file:
    file.write(f'{next_prayer}\n')
    
with open('hours.txt', 'w') as file:
    file.write(f'{next_prayer_hour}\n')
    
with open('minutes.txt', 'w') as file:
    file.write(f'{next_prayer_min}\n')
               

print(f"Fajr: {fajrHour}:{fajrMin}")
print(f"Zuhr: {zuhrHour}:{zuhrMin}")
print(f"Asr: {asrHour}:{asrMin}")
print(f"Maghrib: {maghribHour}:{maghribMin}")
print(f"Isha: {ishaHour}:{ishaMin}")




























# prayerTime = soup.find('span', class_='text-light prayer-margin-left').get_text()

# prayerTimeFormatted = prayerTime.replace("	", "").replace("\n", "")
# prayerTimeFormatted = prayerTimeFormatted[:-3]
# hours, minutes = prayerTimeFormatted.split(':')




# filePrayerName = open("name.txt", "w")
# filePrayerName.write(prayerName)

# filePrayerTime = open("hours.txt", "w")
# filePrayerTime.write(hours)

# filePrayerTime = open("minutes.txt", "w")
# filePrayerTime.write(minutes)