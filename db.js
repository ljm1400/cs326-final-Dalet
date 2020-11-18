'use strict'
let secrets;
let password;
if (!process.env.PASSWORD) {
secrets = require('secrets.json');
username = secrets.USERNAME;
password = secrets.PASSWORD;
} else {
    username = process.env.USERNAME
	password = process.env.PASSWORD;
}
const uri = `mongodb+srv://${username}:${password}@cluster0.oig9w.mongodb.net/Cluster0?retryWrites=true&w=majority`;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

const cleanup = (event) => { // SIGINT is sent for example when you Ctrl+C a running process from the command line.
    client.close(); // Close MongodDB Connection when Process ends
    process.exit(); // Exit with default success-code '0'.
  }
  
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);