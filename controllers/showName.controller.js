const {MongoClient, ObjectId} = require("mongodb");

const mongodb_username = process.env.MONGO_USR;
const mongodb_password = process.env.MONGO_PWD;

const showName = (req, res) => {
  console.log("Home Route Launched");
  res.send("<html><h1>Spencer Powell says 'Hello World'</h1></html>");
};

const showContacts = (req, res) => {
  mongoDb_Connect(listContacts).catch(console.error);
  res.send("<html><h1>Contacts Page</h1></html>");
};

const showContact = (req, res) => {
  const id = req.query.id;
  console.log(`id: ${id}`);

  mongoDb_Connect(listContact, id).catch(console.error);
  res.send("<html><h1>Contact Page</h1></html>");
};

async function mongoDb_Connect(callback) {
  const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@cluster0.ku9wvjq.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await callback(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listContacts(client) {
  const contacts = await client.db("assignments").collection("contacts").find();
  
  console.log("Contacts:");
  await contacts.forEach((contact) => console.log(` - ${contact.firstName}`));
}

async function listContact(client, findId) {
  const contact = await client.db("assignments").collection("contacts").find(ObjectId(findId));
  
  console.log("Contact:");
  console.log(contact.lastName);
}

async function listDatabases(client) {
  databaseList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databaseList.databases.forEach((db) => console.log(` - ${db.name}`));
}

module.exports = {showName, showContacts, showContact};
