//Enviroment variables config
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.DBurl;
//Database Variables
const {MongoClient} = require('mongodb');
const client = new MongoClient(url);

let _contacts;

async function connectDatabase(){
    await client.connect((err, database) =>{
        if(err) throw err;
        _contacts = database.db('contacts');
        console.log("Database Connected Sucsesfully");
    });
}

function getContacts(){
    return _contacts.collection('contacts');
}

module.exports = {connectDatabase, getContacts};