const express = require('express');
const path = require('path');

const notFound = (req,res,next) => {
   return res.status(404).sendFile(path.join(__dirname,'../../html/404.html'))
}

module.exports = notFound;