const {MongoClient, ObjectId} = require("mongodb");

const mongodb_username = process.env.MONGO_USR;
const mongodb_password = process.env.MONGO_PWD;

const showName = (req, res) => {
  console.log("Home Route Launched");
  res.send("<html><h1>Spencer Powell says 'Hello World'</h1></html>");
};

const showContacts = async (req, res) => {
  await mongoDb_Connect(listContacts)
  .then((contacts) => {
    for (let i = 0; i < contacts.length; i++) {
      const element = contacts[i];
      res.write(JSON.stringify(element, null, 2));
      
    }
    res.end()
  })
  .catch(console.error);
};

const showContact = async (req, res) => {
  let id = req.query.id;

  await mongoDb_Connect(listContact, id)
  .then((d) => {
    console.log(typeof(JSON.stringify(d)));
    // for (const prop in d) {
    //   if (Object.hasOwnProperty.call(d, prop)) {
    //     const element = d[prop];
    //     res.write(`<h1>${prop} : ${element}</h1>`)
    //   }
    // }
    // res.end()
    res.header("Content-Type",'application/json');
    // res.send(JSON.stringify(d, null, '\r\n'));
    res.send(JSON.stringify(d, null, 2));
    // res.json(d);
  })
  .catch(console.error)
};

async function mongoDb_Connect(callback, id) {
  const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@cluster0.ku9wvjq.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const contact = await callback(client, id);
    return contact;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listContacts(client) {
  const contacts = await client.db("assignments").collection("contacts").find();
  const contactsArray = await contacts.toArray();
  await contacts.forEach((contact) => console.log(` - ${JSON.stringify(contact)}`));
  return contactsArray;
}

async function listContact(client, id) {
  const contact = await client.db("assignments").collection("contacts").findOne({ _id: new ObjectId(id)});
  
  console.log("Contact:");
  console.log(contact);
  return contact;
}

async function listDatabases(client) {
  databaseList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databaseList.databases.forEach((db) => console.log(` - ${db.name}`));
}

module.exports = {showName, showContacts, showContact};
