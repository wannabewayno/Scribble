const path = require('path');
const notFound = require('./notFound.js');

routeMap = {
    "notes":"notes.html"
}

const router = (req,res) => {
    const route = routeMap[req.params.routeKey];
    if(route===undefined){
        return notFound(req,res);
    } else {
        const HTML_DIR = path.join(__dirname,"../../html");
        const htmlFile = path.join(HTML_DIR,route)
        return res.sendFile(htmlFile);
    }
    
}

module.exports = router;