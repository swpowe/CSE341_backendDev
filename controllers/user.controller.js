const createUser = async () => {
  console.log('create user controller');
};

const createUserForm = async () => {
  console.log('create user form controller');
};

const testUser = async (req, res) => {
  console.log('TEST Function Called.');
  res.sendFile(__dirname, '../views', 'main.html');
};

module.exports = {createUser, createUserForm, testUser};
