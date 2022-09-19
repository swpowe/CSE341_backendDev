require('dotenv').config();


const {MongoClient} = require('mongodb');
const express = require('express');
const app = express();

const routes = require('./routes/index');

const port = process.env.PORT || 3000;
const mongodb_username = process.env.MONGO_USR;
const mongodb_password = process.env.MONGO_PWD;


app.use(routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

async function main() {
    const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@cluster0.ku9wvjq.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        //?? await  listDatabases(client);
        await addContact(client,
            {
                name: "Spencers Lovely Loft",
                summary: "A charming loft in Paris",
                bedrooms: 1,
                bathrooms: 1
            }
        );

 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function addContact(client, contact) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(contact);
    console.log(`New contact created at: ${result.insertedId}`);
}


// Mongo Code
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://swpowe:<password>@cluster0.ku9wvjq.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });