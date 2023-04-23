from bs4 import BeautifulSoup
import requests


website = 'https://www.islamicfinder.org/'
result = requests.get(website)
content = result.text


soup = BeautifulSoup(content, 'lxml')


prayerName = soup.find('span', class_='xxl uppercase prayer-margin-right').get_text()
prayerTime = soup.find('span', class_='text-light prayer-margin-left').get_text()


prayerTimeFormatted = prayerTime.replace("	", "").replace("\n", "")
prayerTimeFormatted = prayerTimeFormatted[:-3]
hours, minutes = prayerTimeFormatted.split(':')


print(prayerName, prayerTimeFormatted)


filePrayerName = open("name.txt", "w")
filePrayerName.write(prayerName)

filePrayerTime = open("hours.txt", "w")
filePrayerTime.write(hours)

filePrayerTime = open("minutes.txt", "w")
filePrayerTime.write(minutes)