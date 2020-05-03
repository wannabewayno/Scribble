const path = require('path');
routeMap = {
    "":"index.html",
    "notes":"notes.html"
}

const router = (routeKey) => {
    console.log(routeMap[routeKey]);
    const HTML_DIR = path.join(__dirname,"../../html");
    if (routeMap[routeKey] === undefined){
        const notFound = path.join(HTML_DIR,'404.html');
        return notFound;
    } else {
        const htmlFile = path.join(HTML_DIR,routeMap[routeKey])
        return htmlFile;
    }
}


module.exports = router;