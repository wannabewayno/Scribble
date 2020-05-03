
const fs = require('fs');
const open = require('open');
const express = require('express');
const path = require('path');
const router = require('./public/assets/js/routeMap.js');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 8080;
const localhost = `http://localhost:${PORT}`

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

//handles all other routing.
app.get('/:routeKey',(req,res) => {
    res.sendFile(router(req.params.routeKey));
});

//============ API DATA ==================
// creates a global variable to store out retrieved data base in
let notes;
// retrieves notes from journal.json and saves into our global variable 'notes'
fs.readFile('./db/journal.json','utf8',(err,data) =>{
    if (err) {throw new Error(`Can't retrieve saved notes`)}
    console.log(`Data extracted successfully`);
    notes = JSON.parse(data);
});

//=========== API routing =========

//Displays all saved notes as a JSON file
app.get('/api/notes',(req,res) => {
    return res.json(notes);
})

//GET request method to search for notes by id
app.get('/api/notes/:id',(req,res) => {
    console.log(req.params);
    return res.json(notes[1].journal);
})

//POST request method to add notes to our master JSON file.
app.post('/api/notes',(req,res)=>{
    const newNote = req.body
    console.log(newNote);
    // give this note a unique id using the uuid package;
    newNote.id = uuidv4();
    
    //save this note into the data base
    notes.push(newNote);

    //store all our data into the journal.json file.
    fs.writeFile('./db/journal.json',JSON.stringify(notes),(err) =>{
        if (err) {throw new Error("Error saving data")};
        console.log("Data succesfully saved");
    });

    //end the response 
    res.end();
});

// app.delete('api/notes/:id')

//=========== Starts server ===========================
app.listen(PORT, () => {
    console.log(`Server running at ${localhost}`);
    open(localhost);
});
