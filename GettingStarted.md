## Installing node.js ##
Please refer to [here](http://nodejs.org/). I don't remember any problem when installing. Please make sure to run node in command line after install.

## Installing mongodb ##
Actually, I did not install it but download and run from its folder instead.
  1. Go to [here](http://www.mongodb.org/downloads) to download a package for your platform. The one I was using is 2.2.3 .
  1. Unzip it to your home folder, say ~/mongodb-osx-x86\_64-2.2.3/
  1. Open a terminal window, go to ~/mongodb-osx-x86\_64-2.2.3/
  1. create a folder named mongodb\_data
  1. go to ~/mongodb-osx-x86\_64-2.2.3/bin, excute
```
./mongod run --bind_ip 127.0.0.1 --dbpath ../mongodb_data
```

If on Windows, you will need to accept permission request for network communication.

If you see a line like the following, then it runs ok.
```
Mon Mar  4 22:37:44 [initandlisten] waiting for connections on port 27017
```

For those who has used mongodb, please delete the users and blogs table. I use MongoHub to do so on Mac.

## Deploying microblog-nodejs ##
The 'deploying' sounds complicated but all you need to do is clone it to a folder, for example, ~/microblog-nodejs. Make sure node is executable before going to the next step.
  1. Go to ~/microblog-nodejs
  1. Execute
```
sudo npm install
```
You should not see any error.

3. Execute
```
sudo node app.js
```
You should see
```
Express server listening on port 3000
```

Open a browser and navigate to http://localhost:3000.

If you see any error, please comment.