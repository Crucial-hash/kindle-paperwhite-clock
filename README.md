<!-- markdownlint-disable-next-line -->
<h1 align="center">Kindle Paperwhite Clock</h1>


- The main part of this project is the [Clock Design](/images/pixel-lockscreen-clock.png) which is inspired by Google's [Material You](https://material.io/blog/announcing-material-you) Design. The lock screen is where this clock's design is from, being called the "double line" clock.




## Prerequisites

- Kindle Paperwhite 2 (PW2) (You may be able to use other Kindle's but the website will not be optimised).
- [Jailbroken Kindle](https://kindlemodding.org/) with [Alpine Linux](https://github.com/thomaspreece/alpine_kindle/) installed. (This is a modified version with Midori browser instead of Chromium which works better on the PW2 but for other Kindle's it should work.).
- (Recommended) Always-on Computer (Server), (Make sure to download [Python](https://www.python.org/) and download the libraries [BeautifulSoup](https://pypi.org/project/beautifulsoup4/), [lxml](https://pypi.org/project/lxml/), and [requests](https://pypi.org/project/requests/) if you want to use the prayer function. You will also need [Node.js](https://nodejs.org/en) with the [http-server](https://www.npmjs.com/package/http-server) library to host the server.




## Instructions

- This will be brief but should somewhat guide you to replicating this on your own.


### Server (Recommended)

- Clone the repository and place the folder where you need it.
- Open command prompt in the folder and type this command: ``` http-server -c-1 ```.
- Run the python file in the background.

### Hosted Version (Not Recommended)
If you don’t want to set up your own server, you can use my hosted version: ``` https://crucial.ink/kindle-paperwhite-clock/ ```


### Kindle Paperwhite

- Before booting into Alpine Linux, in the search bar type ∼ds, this will disable the screensaver, therefore, stopping the screen from turning off.
- This is optional but I prefer the backlight off, you can do this by placing a magnet on the back off the kindle to trick it into thinking the cover is closed.
- Boot into Alpine Linux through KUAL and open Midori.
- Use the IP address from before, you should then see the website.
- Click the fullscreen icon in the top right.




## Preview
<img src="/images/kindle.jpg">
