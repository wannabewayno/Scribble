
const fs = require('fs');
const open = require('open');
const express = require('express');
const path = require('path');
const router = require('./public/assets/js/router.js');
const { v4: uuidv4 } = require('uuid');
const update = require('./public/assets/js/update.js');
const notFound = require('./public/assets/js/notFound.js');

// define our global variables global variables
const app = express();
const PORT = process.env.PORT || 8080; 
const localhost = `http://localhost:${PORT}` //url of deployed application
let notes; //stores retrieved data

// Sets up Express app to load static files from 'public'
app.use(express.static(path.join('public')));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//============================================== html routing =====================================

//handles homepage routing
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/index.html'));
});

// handles all other routing via router.js, define additional paths in router.js via the routeMap object
app.get('/:routeKey',(req,res) => {
        router(req,res);
});


// =============================================== API DATA =======================================

// retrieves notes from data.json and saves into our global variable 'notes'
fs.readFile('./db/data.json','utf8',(err,data) =>{
    if (err) {throw new Error(`Can't retrieve saved notes`)}
    console.log(`Data extracted successfully`);
    notes = JSON.parse(data);
});

// ================================================ API routing ===================================

//Displays our master JSON file (all saved notes)
app.get('/api/notes',(req,res) => {
    return res.json(notes);
})

// POST method to add notes to our master JSON file
app.post('/api/notes',(req,res)=>{
    const newNote = req.body

    newNote.id = uuidv4(); // give this note a unique id using the uuid package;

    notes[newNote.id] = newNote; // save this note into the data base

    update(notes,"post"); // store all our data into the journal.json file

    res.end();  // end the response 
});

//DELETE method to delete notes from our master JSON file
app.delete('/api/notes/:id',(req,res) => {

    const id = req.params.id; // get the notes unique id

    delete notes[id]; // the id is the key this note is stored under in our notes object, so delete anything associated with this key/id.

    update(notes,"delete") //save over previous database with current database (with deleted key)

    res.end(); // end the response
})


//handles 404 errors on the event nothing catches in the stack (end of the line)
app.use(notFound);


// ============================================== Starts server ===========================
app.listen(PORT, () => {
    console.log(`Server running at ${localhost}`);
    // open(localhost);
});

