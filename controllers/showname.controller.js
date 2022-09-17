const showName = (req, res) => {
    console.log("Home Route Launched");
    res.send("<html><h1>Spencer Powell</h1></html>");
  }

  module.exports = { showName };