const { MongoClient } = require("mongodb");

const mongodb_username = process.env.MONGO_USR;
const mongodb_password = process.env.MONGO_PWD;

const showName = (req, res) => {
  console.log("Home Route Launched");
  res.send("<html><h1>Spencer Powell says 'Hello World'</h1></html>");
};

const listContacts = (req, res) => {
  res.send("<html><h1>Contacts Page</h1></html>");

  async function mongoDb_Connect() {
    const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@cluster0.ku9wvjq.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);

    try {
      await client.connect();
      await listDatabases(client);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  mongoDb_Connect().catch(console.error);

  async function listDatabases(client) {
    databaseList = await client.db.admin().listDatabases();

    console.log("Databases:");
    databaseList.databases.forEach((db) => console.log(` - ${db.name}`));
  }
};

module.exports = { showName, listContacts };
