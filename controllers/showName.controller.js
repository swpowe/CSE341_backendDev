const showName = (req, res) => {
    console.log("Home Route Launched");
    res.send("<html><h1>Spencer Powell says 'Hello World'</h1></html>");
  }

  module.exports = { showName };
