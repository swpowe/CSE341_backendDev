require('dotenv').config();

const express = require('express');
const app = express();

const routes = require('./routes/index');

const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//     res.send('<html><h1>Spencer Powell</h1></html>')
// })
app.use(routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
