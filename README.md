# scrabster

If you are working on a linux machine, to start the app, first start MongoDB:

- sudo service mongod start

When shutting down, stop MongoDB:

- sudo service mongod stop

Run Mongo with a specified address:

mongo --host 127.0.0.1:27017

Now your server can connect to Mongo at that address.

Google requires the authentication redirect to end in a top-level domain,
so you'll need to do some IP address mapping. 

- https://stackoverflow.com/questions/26183980/possible-to-test-google-social-login-locally/36109854
