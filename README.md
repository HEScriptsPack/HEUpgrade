# HEUpgrade (Now v3.1 available! xHD upgrade added!)
This script will help you upgrade all your servers' CPU and HDD to maximum configuration (i.e 4GHz and 10GB SSD) in Hacker Experience. The script finds the first server such that either of the CPU upgrade or the HDD upgrade is missing.
A script for upgrading xHDs to max has been added as well. ~~which was written alongside writing HEUpgrade v2. If the former is broke for you, use the latter on your own risk~~ An xHD variant based on v3 may be written soon.

### Intro
This is the first script I've ever written, so please bear with it as it doesn't have any interface, let alone a fancy one.
This took me a couple of days of googling and understanding how to handle redirections with the page, and send postdata.
I hope you guys find it useful!

### Prerequisites~
All you need is a Userscript manager like **Greasemonkey** (for Firefox) or __Tampermonkey__ (for Chrome).

### Installing
To install, click [here!](https://github.com/Epsilon-Alpha/heupgrade/raw/master/HEUpgrade31.user.js)
Once installed, edit it to change ENTERACCOUNTNUMBER to your bank account number **(without the #)** which will be used to buy the servers. Don't worry, this is safe as pie because no data is being sent anywhere.

### Usage
Go to the Hardware tab, turn on the script, and refresh!
__v2__ will now show progress on servers left to be upgraded in the blue box section where it reads 'Help' by default. If it misses some, just refresh script.
To stop, just turn off the script, and refresh again!

__Added:__ Upgrade script for xHD. Read the note before proceeding.

### Notes
If running into problems with the script, change the setInterval time from 1250 to higher like 1500 or 2000.

## v3.1  29th December, 2017
- Added support for upgrading your own clan servers

## v3.0 - 22nd December, 2017
- User prompt to ask number of servers to upgrade
- Fixed irregular POST requests from v2
- The blue box on the top right shows current progress
- Real time money deduction shown **(Might be buggy for the very last iteration, just for the display part)**
- More stable and less annoying than the previous versions
