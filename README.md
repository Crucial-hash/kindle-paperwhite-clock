<!-- markdownlint-disable-next-line -->
<p align="center">
  <img width="150" src="kindle.png" alt="Kindle Paperwhite Logo"></a>
<h1 align="center">Kindle Paperwhite Clock</h1>

<h1 align="center">🕔 Kindle Paperwhite Clock is a small website optimised for kindle Paperwhite 2's for displaying the time, next Formula 1 Grand Prix, and next Islamic Prayer time.</h1>

- The main part of this project is the [Clock Design](/images/pixel-lockscreen-clock.png) which is inspired by Google's [Material You](https://material.io/blog/announcing-material-you) Design. The lockscreen is where this clock's design is from, being called the "double line" clock.

- I wanted to use up the display, and so I added the next Formula 1 Grand Prix to the side, this is a nice feature for knowing the dates,track,country and sessions that will occur in that specific race weekend. The information is all pulled from the [Formula 1](https://www.formula1.com/en/racing/2023.html) website as well as the track images. A future project will be trying to use their API to pull race information rather than manually inputting the data myself.

- The next prayer feature is useful for knowing when the next prayer is, at least for me, I could not connect the kindle to the internet but only to a local network. This was undesireable, as I would not be able to use any sort of online API to pull the next prayer from. I have made a workaround but it is specific to myself and you may need to change some thing to get it to work on your side. I have made it so I am hosting the website on my server. This server runs a python script that scrapes the website (API in future) and grabs the prayer time and name. This is then stored in the root and pulled using javascript. The website his hosted with a no cache setting, and is not very ideal, however should be improved in the near future. I have also made a transparent button infront of the text that toggles the text colour so it makes it visible or not.




## 🔑 Prerequisites

- Kindle Paperwhite 2 (PW2) (You may be able to use other kindles but the website WILL NOT be optimised).
- [Jailbroken Kindle](https://www.mobileread.com/forums/showthread.php?t=346037) with [Alpine Linux](https://github.com/thomaspreece/alpine_kindle/) installed. (This is a modified version with midori browser instead o chromium which works better on the PW2 but for other Kindle's it should work.).
- Always on Computer (Server) There may be ways to work around this but this is what I did to access the website. (Make sure to download [Python](https://www.python.org/) if you need to use the prayer function and [Node.js](https://nodejs.org/en) with the http-server library to host the server.




## 📄 Instructions

- This will be very breif but should somewhat guide you to replicating this on your own.


### 🖥️ Server

- Download the zip for this repository and place the files in a folder for them to be hosted in.
- Open a command prompt window and type this in, http-server -c-1 make sure this is in the folder BEFORE "clock" eg: Documents when clock is at Documents/Clock note the IP address.
- Now you need to make [task scheduler run the vbs file](https://github.com/Crucial-hash/kindle-paperwhite-clock/blob/main/images/vbs-task-scheduler.png) in the background [every 10 seconds](https://superuser.com/questions/293445/windows-task-scheduler-schedule-task-to-run-once-every-10-seconds) that executes the python file, this will request the new timing for the prayer update and store it in 3 files.


### 📖 Kindle Paperwhite

- Before booting into Alpine Linux, in the search bar type ∼ds, this will disable the screensaver therefore stopping the screen from turning off.
- This is optional but I prefer the backlight off, you can do this by changing the brightness to the minimum
- Boot into Alpine Linux through KUAL and open Midori.
- Use the IP address from before, you will see a directory window and click on the "clock" folder.
- Click the fullscreen icon in the top right.




## 🖼️ Images
<img src="/images/with-prayer.jpg" width="50%"><img src="/images/without-prayer.jpg" width="50%">




## 💡 Other Information

- This project may not be maintained and if so, not regulary.
- If you feel like there is an issue or an improvement to be made please do so on the issues tab.
- contributing to this project will be greatly appreciated.
- Thank you for reading about this project!
