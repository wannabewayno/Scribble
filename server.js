
const fs = require('fs');
const open = require('open');
const express = require('express');
const path = require('path');
const router = require('./public/assets/js/router.js');
const { v4: uuidv4 } = require('uuid');
const update = require('./public/assets/js/update.js')

// define our global variables global variables
const app = express();
const PORT = 8080; 
const localhost = `http://localhost:${PORT}` //url of deployed application
let notes; //stores retrieved data

// Sets up Express app to load static files from 'public'
app.use(express.static(path.join('public')));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//========= html routing ========

// handles homepage routing
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/html/index.html'));
});

// handles all other routing via router.js, define additional paths in router.js via the routeMap object
app.get('/:routeKey',(req,res) => {
    res.sendFile(router(req.params.routeKey));
});

// ============ API DATA ==================

// retrieves notes from data.json and saves into our global variable 'notes'
fs.readFile('./db/data.json','utf8',(err,data) =>{
    if (err) {throw new Error(`Can't retrieve saved notes`)}
    console.log(`Data extracted successfully`);
    notes = JSON.parse(data);
});

// =========== API routing =========

//Displays all saved notes as a JSON file
app.get('/api/notes',(req,res) => {
    return res.json(notes);
})

// POST request method to add notes to our master JSON file.
app.post('/api/notes',(req,res)=>{
    const newNote = req.body
    console.log(newNote);
    // give this note a unique id using the uuid package;
    newNote.id = uuidv4();
    
    // save this note into the data base
    notes[newNote.id] = newNote;

    // store all our data into the journal.json file.
    update(notes,"post");

    // end the response 
    res.end();
});

//DELETE request to delete notes.
app.delete('/api/notes/:id',(req,res) => {
    const id = req.params.id;
    delete notes[id];
    update(notes,"delete")
    res.end();
})

// =========== Starts server ===========================
app.listen(PORT, () => {
    console.log(`Server running at ${localhost}`);
    open(localhost);
});
