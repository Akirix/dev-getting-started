![SQL-Pro-Demo-Server](https://raw.githubusercontent.com/Akirix/dev-getting-started/master/assets/img/sqlprodemoserver.png)
# Sequel Pro On Demo Server

As a team the use of the popular GUI program "Sequel Pro" has it tends to have it's place deep within the cackles of our machines.
[Sequel Pro](https://www.sequelpro.com/)

The picture demonstrates to us that we can add an SSH based database in the Sequel Pro.

How it's done:

* Make sure the _~/.known_hosts_ file on the demoserver located at 54.213.84.11 _currently_ has your id_rsa.pub key added to it's list
* Copy over the _~/.akirix.pem_ file from the demoserver as a txt file in your ssh folder (usually _~/.ssh/akirix_demo.txt_
* Usually if you're have recently joined our awesome team we will have already hooked you into the demo server once you've given one of us your rsa.pub key

  In SQL Pro:

        * We can add a database by SSH
        * Title it whatever you'd like
        * Make sure SSH Host is located as the IP
        * That the host can be left as local
        * Username still can be used as simply root no password, since this is prod test (demo sever)
        * SSH User should be "root"
        * Connect via SSL
        * Locate your key file from our demo server that you grabbed and dubbed a txt file or what-have-you

Then simply, hit connect and you're off to the races!

This may be useful to you if you feel less comfortable modifying data via command line on the demo server.
This gives you the pleasure of having a GUI connected.
This potentially allows you to have a sped up adjustments of data on our demo server.

Holler at anyone of us if you have problems getting this set up and ready to roll.
