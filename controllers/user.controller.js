const path = require('path');

const {addUser} = require('../models/index');

const createUser = async (req, res) => {
  const name = req.body.nameField;
  const email = req.body.emailField;
  const pwd = req.body.passwordField;
  console.log(`${name}, ${email}, ${pwd}`);
  const id = await addUser(name, email, pwd);
  
  res.send(`User Created ${id._id}`);
};

const createUserForm = async (req, res) => {
  console.log(res);
  res.sendFile(path.join(__dirname, '../views/create-user.html'));
};



module.exports = {createUser, createUserForm};
