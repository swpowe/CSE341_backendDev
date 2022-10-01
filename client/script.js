function displayContacts() {
    fetch("http://localhost:8080/contacts").then(res => {
        console.log("log");
        return res.text()
    }).then(text => {
        alert(text)
    })
};