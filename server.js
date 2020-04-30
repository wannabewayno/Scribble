const open = require('open');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;
const localhost = `http://localhost${PORT}`

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routing


//Starts server 
app.listen(PORT, () => {
    console.log(`Server running at ${localhost}`);
    open(localhost);
});

